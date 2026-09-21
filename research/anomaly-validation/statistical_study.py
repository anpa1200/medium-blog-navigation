#!/usr/bin/env python3
"""Seeded synthetic sensitivity study, separate from all Kusto functional tests.

No incident reproduction or real-world detector performance is implied.
Rules and calibration grid are declared in code before generating held-out results.
"""
from __future__ import annotations
import csv
import hashlib
import io
import json
import math
from pathlib import Path
import random
import statistics

ROOT=Path(__file__).resolve().parent
SEED=20260921
TRAIN=28
VALIDATE=14
TEST=14
ENTITIES=48
GRID=[2,3,4,6,8,12]


def generate():
    rows=[]
    for entity in range(ENTITIES):
        rng=random.Random(SEED+entity)
        role=['interactive','automation','sparse'][entity%3]
        for day in range(TRAIN+VALIDATE+TEST):
            if role=='interactive':
                base=max(0,round(rng.gauss(35 if day%7<5 else 8,6)))
            elif role=='automation':
                base=max(0,round(rng.gauss(220 if day%7==0 else 55,10)))
            else:
                base=0 if rng.random()<0.88 else rng.randint(1,8)
            # Legitimate change is NOT an attack label; baseline drift is deliberate.
            if entity%11==0 and day>=TRAIN+VALIDATE:
                base+=35
            label=day>=TRAIN and rng.random()<0.035
            attack_type=''
            if label:
                attack_type='large' if rng.random()<0.6 else 'low-volume'
                base+=rng.randint(100,250) if attack_type=='large' else rng.randint(5,20)
            # A separate, imperfect corroborating signal can remove true positives.
            corroboration=rng.random()<(0.7 if label else 0.07)
            rows.append(dict(entity=f'e{entity:02}',role=role,day=day,count=base,
                             malicious=int(label),attack_type=attack_type,corroboration=int(corroboration)))
    return rows


def fit(rows,model):
    training=[r for r in rows if r['day']<TRAIN]
    grouped={}
    for row in training:
        key='global' if model=='global-z' else row['entity']
        grouped.setdefault(key,[]).append(row['count'])
    return grouped


def predict(row,model,k,groups):
    values=groups['global' if model=='global-z' else row['entity']]
    if model in ('global-z','entity-z'):
        center=statistics.mean(values)
        scale=statistics.pstdev(values)
    else:
        center=statistics.median(values)
        scale=statistics.median(abs(v-center) for v in values)
    # An explicit policy floor handles zero dispersion; it is not a learned constant.
    alert=row['count']>center+max(20,k*scale)
    return alert and (bool(row['corroboration']) if model=='entity-mad-gated' else True)


def counts(rows,predictions):
    tp=sum(bool(p) and bool(r['malicious']) for r,p in zip(rows,predictions))
    fp=sum(bool(p) and not r['malicious'] for r,p in zip(rows,predictions))
    fn=sum(not p and bool(r['malicious']) for r,p in zip(rows,predictions))
    tn=len(rows)-tp-fp-fn
    return dict(tp=tp,fp=fp,fn=fn,tn=tn,precision=tp/(tp+fp) if tp+fp else None,
                recall=tp/(tp+fn) if tp+fn else None,false_alerts_per_entity_day=fp/len(rows),
                alert_count=tp+fp,evaluation_entity_days=len(rows))


def main():
    rows=generate()
    valid=[r for r in rows if TRAIN<=r['day']<TRAIN+VALIDATE]
    test=[r for r in rows if r['day']>=TRAIN+VALIDATE]
    models=[]
    all_predictions=[]
    for model in ['global-z','entity-z','entity-mad','entity-mad-gated']:
        groups=fit(rows,model)
        # Gated vs ungated MAD uses IDENTICAL threshold calibration for an ablation.
        calibration_model='entity-mad' if model=='entity-mad-gated' else model
        candidates=[]
        for k in GRID:
            c=counts(valid,[predict(r,calibration_model,k,groups) for r in valid])
            candidates.append((k,c))
        feasible=[(k,c) for k,c in candidates if c['fp']/len(valid)<=0.02]
        if feasible:
            k,c=max(feasible,key=lambda pair:(pair[1]['recall'] or 0,-pair[1]['fp'],-pair[0]))
        else:
            k,c=min(candidates,key=lambda pair:(pair[1]['fp'],-(pair[1]['recall'] or 0),pair[0]))
        predictions=[predict(r,model,k,groups) for r in test]
        result=counts(test,predictions)
        models.append(dict(model=model,k=k,validation_budget_met=bool(feasible),
                           validation=c,test=result,calibration=candidates))
        for row,pred in zip(test,predictions):
            all_predictions.append(dict(model=model,entity=row['entity'],day=row['day'],malicious=row['malicious'],alert=int(pred)))
    buffer=io.StringIO()
    writer=csv.DictWriter(buffer,fieldnames=list(rows[0]))
    writer.writeheader();writer.writerows(rows)
    data=buffer.getvalue().encode()
    result={'schema_version':1,'kind':'synthetic-sensitivity-experiment','seed':SEED,
            'implementation_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
            'scope':'Numbers apply only to this generator; not operational accuracy or an incident benchmark.',
            'selection_and_splits':{'entities':ENTITIES,'training_days':[0,27],'validation_days':[28,41],'test_days':[42,55]},
            'calibration':'Freeze past-only training. Select multiplier on validation under a 2% false-alert/entity-day budget; tie-break by recall, false alerts, then smaller multiplier. If infeasible minimize false alerts. Gated MAD reuses ungated calibration.',
            'baseline_updates':'None during validation/test. Intentional legitimate test drift probes this limitation.',
            'confidence_intervals':'Not reported as population uncertainty: this is one deliberately constructed generator and seed, not a representative enterprise sample.',
            'dataset_sha256':hashlib.sha256(data).hexdigest(),'dataset_rows':len(rows),
            'test_positives':sum(r['malicious'] for r in test),'test_negatives':sum(not r['malicious'] for r in test),
            'models':models,'predictions':all_predictions}
    output=ROOT/'results';output.mkdir(exist_ok=True)
    (output/'synthetic-study.csv').write_bytes(data)
    (output/'synthetic-study.json').write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({k:v for k,v in result.items() if k not in ('predictions','models')},indent=2))
    for row in models:
        print(row['model'],'k=',row['k'],row['test'])


if __name__=='__main__':
    main()
