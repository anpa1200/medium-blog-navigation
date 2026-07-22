---
title: "Kubernetes Logging and Monitoring: Complete Guide"
description: "A comprehensive reference for every major log type in Kubernetes: what it is, what you can monitor with it, how to include or exclude it\u2026"
image: "https://cdn-images-1.medium.com/max/800/1*E59E7CkPeHIgNMTZEzPDoQ.png"
---

# Kubernetes Logging and Monitoring: Complete Guide


<img src="https://cdn-images-1.medium.com/max/800/1*E59E7CkPeHIgNMTZEzPDoQ.png" alt="Cover image" width="1024" height="1024" loading="eager" fetchpriority="high" decoding="async" />

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/kubernetes-logging-and-monitoring-complete-guide-2ce9d4bdba80](https://medium.com/@1200km/kubernetes-logging-and-monitoring-complete-guide-2ce9d4bdba80)
- **Published:** 2026-02-11
- **Preserved media:** 9 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 28 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium article into the 1200km.com Docusaurus ecosystem. The original article flow, images, screenshots, infographics, and technical blocks are preserved from the export.

### A comprehensive reference for every major log type in Kubernetes: what it is, what you can monitor with it, how to include or exclude it, and why it matters.

<img src="https://cdn-images-1.medium.com/max/800/1*E59E7CkPeHIgNMTZEzPDoQ.png" alt="Article image" width="1024" height="1024" loading="lazy" decoding="async" />

## Introduction

Kubernetes does not produce “logs” as a single stream. It produces**signals across layers**— applications, control plane, nodes, infrastructure add-ons, Events, and audit trails — each answering a different operational or security question.

Most teams fail at Kubernetes logging not because they lack tools, but because they**collect everything without understanding why**. This leads to noisy dashboards, high ingestion costs, and — ironically — missing the one log that actually mattered during an incident.

This guide is designed as a**decision framework**, not just a how-to:

- **What log types exist in Kubernetes**

- **What each log can tell you**

- **How to include or exclude it correctly**

- **When it matters for security, reliability, compliance, or cost**

Using Fluent Bit as a concrete reference implementation, the guide walks from first deployment to advanced filtering, persistent buffering, and real-world use cases. By the end, you should be able to**justify every log you collect — and every log you intentionally drop**.

## Table of Contents

- **Introduction: The Kubernetes Log Landscape**

- **First Steps: Deploy Fluent Bit as a DaemonSet**

- **Fluent Bit DB and Chunk Storage**

- **Application & Workload Logs**

- **Control Plane Logs**

- **Node & Runtime Logs**

- **Infrastructure & Add-on Logs**

- **Kubernetes Events**

- **Audit Logs**

- **Inclusion and Exclusion Patterns**

- **Use Cases: Security, Infrastructure, Application, and More**

- **Summary Matrix and Checklist**

- **Example Training Cluster**

- **Showing Cluster Configuration with kubectl**

- **References**

## 1. Introduction: The Kubernetes Log Landscape

In a Kubernetes cluster, logs are produced in several layers. Each layer answers different questions:*What did my app do?**Why did the scheduler place this pod here?**Who changed that resource?**Why was the pod killed?*

**Central idea:**You don’t have to collect everything. Choose log types based on what you need to**monitor**,**debug**, and**prove**(compliance). This guide explains each type so you can decide what to include or exclude.

## 2. First Steps: Deploy Fluent Bit as a DaemonSet

To get logs from every node into a central place, run**Fluent Bit as a DaemonSet**: one pod per node that tails container logs, enriches them with Kubernetes metadata, and forwards to your outputs. Use the following order.

### Prerequisites

- A cluster (e.g. Minikube) with`kubectl`configured.

- A**logging**namespace (create with`kubectl create namespace logging`if needed).

- Optional: a log receiver (e.g. the[training-cluster log-listener](https://markdown2medium.vercel.app/training-cluster/README.md)or an external system like XPLG).

### 1. Fluent Bit configuration (ConfigMap)

The configuration defines**inputs**(tail container logs),**filters**(Kubernetes metadata), and**outputs**(HTTP to your backend). The current simple config includes**all**container logs and sends to two HTTP endpoints: an in-cluster log-listener and (for Minikube) an XPLG endpoint at`host.minikube.internal:30304`.

Apply the ConfigMap in the`logging`namespace:

```text
kubectl apply -f training-cluster/
03
-fluent-bit-
config
.yaml
```

This creates`fluent-bit-config`with`fluent-bit.conf`and`parsers.conf`.

```text
# Fluent Bit: SIMPLE config — include ALL logs, 2 outputs (listener + XPLG)
# Use this as the first config for the training cluster (no exclusions).
apiVersion: v1
kind: ConfigMap
metadata:
  name: fluent-bit-config
  namespace: logging
  labels:
    app: fluent-bit
data:
  fluent-bit.conf: |
    [SERVICE]
        Flush         
2
        Grace         
30
        Log_Level     info
        Parsers_File  /fluent-bit/etc/parsers.conf
    [INPUT]
        Name              tail
        Tag               kube.*
        Path              /var/
log
/containers/*.log
        Parser            docker
        DB                /fluent-bit/data/flb_kube.db
        Mem_Buf_Limit     
5
MB
        Skip_Long_Lines   On
        Refresh_Interval  
10
        Ignore_Older      
5
m
    [FILTER]
        Name                kubernetes
        Match               kube.*
        Kube_URL            https:
//
kubernetes.default.svc:
443
        Kube_CA_File        /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
        Kube_Token_File     /var/run/secrets/kubernetes.io/serviceaccount/token
        Kube_Tag_Prefix     kube.var.log.containers.
        Merge_Log           On
        Keep_Log            On
    [FILTER]
        Name    modify
        Match   kube.*
        Rename  
log
 message
    [OUTPUT]
        Name            http
        Match           kube.*
        Host            
log
-listener.logging.svc
        Port            
8080
        URI             /ingest
        Format          json_stream
        Json_date_key   timestamp
        Json_date_format iso8601
    [OUTPUT]
        Name                http
        Match               kube.*
        Host                host.minikube.internal
        Port                
30304
        URI                 /logeye/api/logger.jsp?token=
4
ca8e61e-abbb-
4663
-
9
c24-
636
e4d5fad8d
        Format              json
        Json_date_key       
time
        Json_date_format    iso8601
  parsers.conf: |
    [PARSER]
        Name        cri
        Format      regex
        Regex       ^(?<
time
>[^ ]+) (?<stream>stdout|stderr) (?<logtag>[^ ]*) (?<
log
>.*)$
        Time_Key    
time
        Time_Format %Y-%m-%dT%H:%M:%S.%L%z
    [PARSER]
        Name        docker
        Format      json
        Time_Key    
time
        Time_Format %Y-%m-%dT%H:%M:%S.%L%z
        Time_Keep   On
```

Main pieces:

- **INPUT:**`tail`on`/var/log/containers/*.log`with`Parser docker`, DB for resume, 5m`Ignore_Older`.

- **FILTER:**`kubernetes`filter for namespace/pod/labels;`modify`to rename`log`→`message`.

- **OUTPUT:**HTTP to`log-listener.logging.svc:8080/ingest`(JSON stream) and, in the same config, HTTP to XPLG (adjust host/port/token for your environment).

### 2. RBAC (ServiceAccount, ClusterRole, ClusterRoleBinding)

Fluent Bit needs read access to namespaces and pods for metadata. Apply:

```text
kubectl apply -f training-cluster/
03
-fluent-bit-rbac.
yaml
```

```text
piVersion:
 
v1
kind:
 
ServiceAccount
metadata:
  
name:
 
fluent-bit
  
namespace:
 
logging
---
apiVersion:
 
rbac.authorization.k8s.io/v1
kind:
 
ClusterRole
metadata:
  
name:
 
fluent-bit
rules:
  
-
 
apiGroups:
 [
""
]
    
resources:
 [
"namespaces"
, 
"pods"
]
    
verbs:
 [
"get"
, 
"list"
]
---
apiVersion:
 
rbac.authorization.k8s.io/v1
kind:
 
ClusterRoleBinding
metadata:
  
name:
 
fluent-bit
roleRef:
  
apiGroup:
 
rbac.authorization.k8s.io
  
kind:
 
ClusterRole
  
name:
 
fluent-bit
subjects:
  
-
 
kind:
 
ServiceAccount
    
name:
 
fluent-bit
    
namespace:
 
logging
```

This creates the`fluent-bit`ServiceAccount in`logging`and a ClusterRole that can`get`,`list``namespaces`and`pods`, bound to that ServiceAccount.

### 3. DaemonSet

The DaemonSet runs one Fluent Bit pod per node, with the ConfigMap mounted and host paths for`/var/log`and (for Docker runtime)`/var/lib/docker/containers`. Apply:

```text
kubectl apply -f training-cluster/
03
-fluent-bit-daemonset.
yaml
```

```text
apiVersion:
 
apps/v1
kind:
 
DaemonSet
metadata:
  
name:
 
fluent-bit
  
namespace:
 
logging
  
labels:
    
app:
 
fluent-bit
spec:
  
selector:
    
matchLabels:
      
app:
 
fluent-bit
  
template:
    
metadata:
      
labels:
        
app:
 
fluent-bit
    
spec:
      
serviceAccountName:
 
fluent-bit
      
tolerations:
        
-
 
key:
 
node-role.kubernetes.io/control-plane
          
operator:
 
Exists
          
effect:
 
NoSchedule
      
containers:
        
-
 
name:
 
fluent-bit
          
image:
 
cr.fluentbit.io/fluent/fluent-bit:2.2.0
          
imagePullPolicy:
 
IfNotPresent
          
ports:
            
-
 
containerPort:
 
2020
              
name:
 
metrics
          
resources:
            
requests:
              
cpu:
 
50m
              
memory:
 
64Mi
            
limits:
              
cpu:
 
200m
              
memory:
 
128Mi
          
volumeMounts:
            
-
 
name:
 
varlog
              
mountPath:
 
/var/log
              
readOnly:
 
true
            
-
 
name:
 
flb-db
              
mountPath:
 
/fluent-bit/data
            
-
 
name:
 
varlibdockercontainers
              
mountPath:
 
/var/lib/docker/containers
              
readOnly:
 
true
            
-
 
name:
 
config
              
mountPath:
 
/fluent-bit/etc/
          
securityContext:
            
readOnlyRootFilesystem:
 
false
            
runAsNonRoot:
 
false
            
runAsUser:
 
0
      
terminationGracePeriodSeconds:
 
30
      
volumes:
        
-
 
name:
 
varlog
          
hostPath:
            
path:
 
/var/log
        
-
 
name:
 
flb-db
          
emptyDir:
 {}
        
-
 
name:
 
varlibdockercontainers
          
hostPath:
            
path:
 
/var/lib/docker/containers
        
-
 
name:
 
config
          
configMap:
            
name:
 
fluent-bit-config
```

The DaemonSet uses:

- **Image:**`cr.fluentbit.io/fluent/fluent-bit:2.2.0`

- **ServiceAccount:**`fluent-bit`

- **Volumes:**hostPath`/var/log`,`emptyDir`for Fluent Bit DB, hostPath for Docker containers (if applicable), and the`fluent-bit-config`ConfigMap at`/fluent-bit/etc/`.

- **Tolerations:**so it can run on control-plane nodes (e.g. single-node Minikube).

### Verify

- Check that the DaemonSet is running one pod per node:
`kubectl get daemonset -n logging`
`kubectl get pods -n logging -l app=fluent-bit`

<img src="https://cdn-images-1.medium.com/max/800/1*9YzYXfJHtoxEF-n9gzH-sA.png" alt="Article image" width="797" height="57" loading="lazy" decoding="async" />

- Check Fluent Bit logs:
`kubectl logs -n logging -l app=fluent-bit --tail=50`

<img src="https://cdn-images-1.medium.com/max/800/1*19scGnoJV0RfNPHuvfWbDw.png" alt="Article image" width="750" height="257" loading="lazy" decoding="async" />

If the config points to`log-listener.logging.svc:8080`, ensure the log-listener Deployment and Service are deployed (see[Example Training Cluster](https://markdown2medium.vercel.app/#12-example-training-cluster)); then you can port-forward and open`/events/hierarchy`or`/xplg-style`to see events.

<img src="https://cdn-images-1.medium.com/max/800/1*WQG14W84atoZT_291Hi2tQ.png" alt="Article image" width="545" height="220" loading="lazy" decoding="async" />

## 3. Fluent Bit DB and Chunk Storage

Once Fluent Bit is running as a DaemonSet, two configuration details directly affect reliability and resource use: the**tail plugin DB**(resume position) and**chunk storage**(disk buffering). Both benefit from using a**mounted filesystem**so data persists across pod restarts.

### What the tail plugin DB is

In the tail input you set:

```text
DB                /fluent-bit/data/flb_kube.db
Mem_Buf_Limit     5MB
```

- `**DB**`– Path to a**SQLite database**that the tail plugin uses to record which log files it is tracking and the**read offset**(position) in each file.

- **Why it matters:**When Fluent Bit restarts (pod restart, upgrade, node drain), it can**resume**from the last position instead of re-reading from the beginning. Without a persistent DB:

- You get**duplicate**log lines after every restart, or

- With`Ignore_Older 5m`, you**lose**the last 5 minutes of logs because the plugin skips "old" lines from its perspective.

- **Ephemeral vs persistent:**If`/fluent-bit/data`is an**emptyDir**, the DB is lost when the pod is removed. Use a**mounted volume**(hostPath or PVC) at`/fluent-bit/data`so the DB file persists on the node or on shared storage.

### What Mem_Buf_Limit does

- **Purpose:**Maximum**memory buffer per monitored file**. When a container writes logs faster than Fluent Bit can send them to outputs, the tail plugin buffers in memory up to this limit.

- **Effect:**Prevents one busy log stream from using unbounded memory (OOM). When the limit is reached, the tail plugin can**pause**reading that file (backpressure) or, if**storage**is enabled (see below), spill to disk.

### Chunk storage (disk buffering)

When the pipeline or an output is under pressure, Fluent Bit can write**chunks**(buffered records) to disk so it does not drop data. You enable this in the main config:

```text
[SERVICE]
    ...
    storage
.path
  /fluent-bit/data/chunks
    storage
.sync
  
normal
```

- **storage.path**— Directory for chunk files. Put it under the**same mounted volume**as the DB (e.g.`/fluent-bit/data/chunks`) so chunks use the same external or cluster-mounted filesystem.

- **storage.sync**—`normal`or`full`; controls how often chunk files are synced to disk.

The tail input (and outputs) can then use this path when in-memory buffering is insufficient. So**DB**and**chunks**share one mount: e.g. hostPath at`/var/lib/fluent-bit`(or a PVC) mounted in the container as`/fluent-bit/data`.

### Saving DB and chunks on a mounted filesystem

To keep the DB and chunk storage**outside**the container and**persistent**across pod restarts, use a volume that lives on the node or on cluster storage.

### Option 1: hostPath (node-mounted FS)

Data is stored on the**node’s filesystem**at a path such as`/var/lib/fluent-bit`. Each DaemonSet pod uses its node's path. You can mount NFS (or another filesystem) on each node at that path so the directory is actually on shared storage.

**In the DaemonSet:**

```text
volumes:
  
-
 
name:
 
flb-db
    
hostPath:
      
path:
 
/var/lib/fluent-bit
      
type:
 
DirectoryOrCreate
```

With`mountPath: /fluent-bit/data`, Fluent Bit writes:

- **DB**→`/fluent-bit/data/flb_kube.db`→ on the node at`/var/lib/fluent-bit/flb_kube.db`

- **Chunks**→`/fluent-bit/data/chunks`→ on the node at`/var/lib/fluent-bit/chunks`

**Pros:**Simple, no StorageClass or PVC.**Cons:**Tied to the node; if the node is replaced, that node’s DB and chunks are gone unless the path was a shared mount (e.g. NFS).

### Option 2: PersistentVolumeClaim (cluster-mounted FS)

Use a**PVC**so DB and chunks use a**cluster-backed mounted filesystem**(e.g. NFS PV, cloud ReadWriteMany volume). For a DaemonSet, use a single**ReadWriteMany**PVC and give each pod a**per-node subdirectory**via`subPathExpr: $(NODE_NAME)`so nodes do not overwrite each other's data.

- Create a PVC with`ReadWriteMany`and set`storageClassName`to a StorageClass that supports it (e.g. NFS).

- In the DaemonSet, use that PVC for the volume mounted at`/fluent-bit/data`, with`subPathExpr: $(NODE_NAME)`and inject`NODE_NAME`from the downward API (`spec.nodeName`).

**Requirement:**A StorageClass that supports**ReadWriteMany**(e.g. NFS provisioner). Many default cluster StorageClasses are ReadWriteOnce only.

### Summary

Use one volume (hostPath or PVC) mounted at`/fluent-bit/data`so that both`DB /fluent-bit/data/flb_kube.db`and`storage.path /fluent-bit/data/chunks`persist on the mounted filesystem. The training-cluster manifests use hostPath by default; optional PVC manifests are in`training-cluster/03-fluent-bit-pvc.yaml`and`03-fluent-bit-daemonset-pvc.yaml`(see the repo's`docs/FluentBit_DB_and_Storage.md`for step-by-step use).

## 4. Application & Workload Logs

### What this log is

- **Source:**Anything your containers write to**stdout**or**stderr**(e.g.`print()`,`logger.info()`, stack traces).

- **Format:**Per line, the runtime usually writes CRI-style JSON, e.g.
`&#123;"log":"...\n","stream":"stdout","time":"2024-01-15T10:30:00.123Z"&#125;`.

- **Location:**On each node, under`/var/log/containers/&lt;pod&gt;_&lt;namespace&gt;_&lt;container&gt;-&lt;id&gt;.log`(symlinks) and`/var/log/pods/&lt;namespace&gt;_&lt;pod&gt;_&lt;uid&gt;/&lt;container&gt;/&lt;n&gt;.log`.

- **Identity:**Enriched by metadata:`namespace`,`pod_name`,`container_name`,`labels`,`annotations`(e.g. via Fluent Bit Kubernetes filter).

### What you can monitor with this log

<img src="https://cdn-images-1.medium.com/max/800/1*F-4PidqwxwqflOOrhKO7mA.png" alt="Article image" width="545" height="220" loading="lazy" decoding="async" />

### How to include or exclude this log

**Include (default):**Tail all container logs on the node:

```text
[INPUT]
    Name   
tail
    Tag    kube.*
    Path   /var/log/containers/*.
log
    Parser docker
```

**Exclude by pod name**(e.g. drop coredns):

```text
[
FILTER
]
    Name    grep
    
Match
   kube.
*
    Exclude kubernetes.pod_name coredns
```

**Exclude by namespace**(e.g. ignore`kube-system`):

```text
Exclude kubernetes.namespace_name kube-
system
```

**Include only specific namespaces**(e.g. only`production`and`staging`):
Use two grep filters: first drop all, then keep only the ones you want—or use a single**Include**(if your Fluent Bit version supports it). More portable approach: exclude everything you don’t want:

```text
[
FILTER
]
    Name    grep
    
Match
   kube.
*
    Exclude kubernetes.namespace_name kube
-
system
    Exclude kubernetes.namespace_name kube
-
public
    Exclude kubernetes.namespace_name logging
```

**Exclude by container name**(e.g. sidecars you don’t care about):

```text
Exclude
 kubernetes.
container_name
 istio-proxy
```

**Exclude by label**(e.g. skip pods with`logging=no`):
Possible with a Lua or record_modifier filter that checks`kubernetes.labels.logging`and then a grep that drops when that field equals`no`. Simpler: use**pod annotation**and filter on it if your agent supports nested keys.

### Why this log matters

- **Primary record of application behavior.**When a pod is gone, these logs are often the only evidence of errors or abuse.

- **Required for debugging**and for linking with traces and metrics (same request ID in logs and spans).

- **Foundation for security monitoring**(anomalies, injection attempts) and**compliance**(evidence of access and actions).

**Recommendation:**Collect application logs from all namespaces you care about; exclude only noisy or irrelevant workloads (e.g. sidecars, system pods you already get from control-plane/infra streams) to control volume and cost.

## 5. Control Plane Logs

### What this log is

**Sources:**

- **kube-apiserver**— API requests, auth, admission, errors.

- **kube-controller-manager**— Reconcile loops, scaling, node lifecycle.

- **kube-scheduler**— Scheduling decisions, failures, preemption.

- **etcd**— Storage layer for the API (often logged separately).

<img src="https://cdn-images-1.medium.com/max/800/1*UtYkLnPHePmoM-9R1KApLg.png" alt="Article image" width="453" height="315" loading="lazy" decoding="async" />

**Format:**Plain text or structured (e.g. klog-style with level and timestamp).

**Location:**Depends on deployment:

- **Static pods**(e.g. on control-plane node): same as workload logs under`/var/log/containers/`and`/var/log/pods/`.

**Systemd:**sometimes under`journald`or a log file under`/var/log`.

- **Identity:**`namespace_name=kube-system`,`pod_name`like`kube-apiserver-minikube`,`kube-controller-manager-*`,`kube-scheduler-*`,`etcd-*`.

### What you can monitor with this log

Use these for:**cluster health**,**capacity and scheduling**,**security**(failed auth, suspicious API patterns), and**troubleshooting**(why a pod wasn’t scheduled, why a controller didn’t fix state).

### How to include or exclude this log

**Include:**If control plane runs as pods, they are already in`/var/log/containers/*.log`. No extra path needed; same tail input as application logs.

**Include only control plane**(drop application namespaces):

```text
[
FILTER
]
    Name    grep
    
Match
   kube.
*
    Exclude kubernetes.namespace_name kube
-
system
```

Then in a second grep,**keep**only`kube-system`(so only control plane + other kube-system pods). Or**exclude**all non–control-plane pod names:

```text
[
FILTER
]
    Name    grep
    
Match
   kube.
*
    Include kubernetes.namespace_name kube
-
system
```

Then exclude add-ons you don’t need (e.g. coredns, storage-provisioner) so only api/controller/scheduler/etcd remain.

**Exclude control plane**(only application logs):

```text
[
FILTER
]
    Name    grep
    
Match
   kube.
*
    Exclude kubernetes.namespace_name kube
-
system
```

**Exclude specific components**(e.g. no scheduler logs):

```text
Exclude
 kubernetes.
pod_name
 kube-scheduler
```

### Why this log matters

- **Root cause for many cluster issues:**scheduling failures, controller loops, API overload, etcd problems.

- **Security:**Failed auth, privilege escalation attempts, and admission denials show up here.

- **Stability:**Detecting API latency, admission webhook timeouts, or etcd slowness early prevents outages.

**Recommendation:**Always collect control plane logs in production; exclude only if you have a separate, dedicated pipeline (e.g. different cluster or tier) that already ingests them.

## 6. Node & Runtime Logs

### What this log is

- **Sources:**

- **kubelet**— Node status, pod lifecycle, volume mount, image pull, health checks.

- **Container runtime**(containerd, CRI-O, Docker) — Image pull, start/stop, OOM, runtime errors.

- **Format:**Usually klog or vendor-specific text.

- **Location:**Depends on install: host`/var/log`, or (when run in pods) under`/var/log/containers/`/ journald.

- **Identity:**When run as pods:`pod_name`like`kubelet`, or node name in logs/metadata.

### What you can monitor with this log

Use for:**node health**,**pod lifecycle**(why a pod didn’t start),**image and storage issues**, and**resource pressure**(OOM, eviction).

### How to include or exclude this log

- If kubelet/runtime run**on the host**(not in Kubernetes), their logs are**not**under`/var/log/containers/*.log`. You include them by tailing host paths (e.g.`/var/log/syslog`,`/var/log/kubelet.log`) or journald from the node.

- If they run**as pods**(e.g. in kube-system), they are included in the same tail as other pods; exclude with:

```text
Exclude kubernetes.pod_name kube
let
Exclude
 kubernetes.container_name containerd
```

**Exclude**when you only care about application logs and already have node monitoring elsewhere.

### Why this log matters

- **Node-level truth:**Explains why a pod never started or why it was killed (OOM, eviction).

- **Image and storage:**Pull errors and mount failures are only visible here (or in Events).

- **Security:**Runtime and kubelet logs can show abuse (e.g. privileged container start).

**Recommendation:**Collect on critical nodes; exclude only if you have another node-level log pipeline or if volume is a concern and you already get the same signal from Events/metrics.

## 7. Infrastructure & Add-on Logs

### What this log is

**Sources:**

- **CoreDNS**— DNS queries, errors, cache.

- **Ingress controllers**— Access logs, TLS, routing errors.

- **CNI**— Network attach/detach, policy.

- **Metrics-server**— Scraping errors, API.

- **Storage / CSI**— Attach, mount, errors.

**Format:**Application-dependent (often text or JSON).

- **Location:**Same as workload logs when run as pods (e.g.`coredns-*`,`ingress-nginx-*`in`kube-system`or`ingress`namespace).

**Identity:**`kubernetes.pod_name`,`kubernetes.namespace_name`,`kubernetes.container_name`(e.g.`coredns`,`controller`).

### What you can monitor with this log

Use for:**networking and DNS**issues,**ingress and TLS**health,**resource metrics**pipeline, and**storage**problems.

### How to include or exclude this log

**Include:**Same tail as all pods; no extra config.

**Exclude by pod name**(e.g. reduce noise from CoreDNS):

```text
[
FILTER
]
    Name    grep
    
Match
   kube.
*
    Exclude kubernetes.pod_name coredns
```

**Exclude by container name**(e.g. only CoreDNS app container):

```text
Exclude
 kubernetes.
container_name
 coredns
```

**Include only infrastructure**(e.g. only`kube-system`and`ingress`namespace):

```text
[
FILTER
]
    Name    grep
    
Match
   kube.
*
    Include kubernetes.namespace_name kube
-
system
```

Then optionally exclude control-plane pod names so only add-ons (coredns, metrics-server, etc.) remain.

### Why this log matters

- **DNS and networking**are the first place to look for “can’t resolve” or “can’t reach” issues.

- **Ingress logs**are the basis for access analytics, WAF, and TLS monitoring.

- **Metrics-server**logs explain wrong or missing metrics (e.g. HPA not scaling).

- **CSI**logs explain volume attach/mount failures.

**Recommendation:**Include by default; exclude only specific components (e.g. coredns) if volume is high and you don’t need per-query analysis. Prefer sampling or aggregation over dropping entirely for security-sensitive add-ons.

## 8. Kubernetes Events

### What this log is

**Source:**API server creates**Event**objects when significant things happen (pod scheduled, failed, killed, image pull back-off, etc.).

- **Format:**Structured API object (e.g.`reason`,`message`,`involvedObject`,`source`,`count`,`firstTimestamp`,`lastTimestamp`).

**Location:**Stored in**etcd**; visible via`kubectl get events`. Not in`/var/log/containers/`; you need an**event exporter**or an agent that reads the Events API and forwards them as log records.

### What you can monitor with this log

Events are**short-lived**in etcd (typically 1 hour by default); exporting them to a log backend gives you history and alerting.

### How to include or exclude this log

- **Include:**Deploy an**event exporter**(e.g. event-exporter, or a small controller that lists/watches Events and sends to your log pipeline). Fluent Bit does not read the Events API by default; you’d add a custom input (e.g. HTTP server receiving from an exporter) or use a sidecar that pushes events.

- **Exclude:**Don’t run an event exporter, or filter in the exporter (e.g. only`Warning`and`Normal`with certain reasons).

**Filtering by reason**(in the exporter or downstream):

- Include only:`OOMKilling`,`FailedScheduling`,`Failed`,`BackOff`,`FailedMount`,`FailedAttachVolume`.

- Exclude: high-volume`Pulling`,`Pulled`,`Created`,`Started`if you don’t need lifecycle noise.

### Why this log matters

- **Canonical “what happened” for pod and node lifecycle**(OOM, eviction, scheduling failure, image pull back-off).

- **No need to scrape**many different components; one stream summarizes scheduler, kubelet, and controller actions.

- **Essential for alerting**on failures and for**post-incident**analysis.

**Recommendation:**Export Events to your log/alerting backend; filter by`reason`and severity to control volume.

## 9. Audit Logs

### What this log is

**Source:****kube-apiserver**writes an**audit log**for every request (or a subset) when an audit policy is configured.

- **Format:**JSON (or legacy) with user, verb, resource, namespace, response code, request URI, etc.

**Location:**File on the control-plane node(s) or sent to a**webhook**(e.g. your SIEM or log backend).

- **Identity:**Not in container logs under`/var/log/containers/`; separate file or stream.

### How to include or exclude this log

- **Include:**Configure**audit policy**and**audit backend**(log file or webhook). Then tail the audit log file from the control-plane node (or ingest from webhook). Fluent Bit can tail that file like any other.

- **Exclude:**Don’t enable audit, or in the**audit policy**exclude certain stages (e.g. only`RequestResponse`for secrets,`Metadata`for others) or verbs/resources to reduce size.

**Policy example (conceptual):**
Log`Metadata`for all resources; log`RequestResponse`only for`secrets`,`configmaps`, and`pods/log`to balance security and volume.

### Why this log matters

- **Authority for “who did what”**at the API level (users, service accounts, IPs).

- **Required for many compliance frameworks**(e.g. PCI, SOC2) that need access and change logs.

- **Critical for security**(detect privilege escalation, suspicious access patterns).

**Recommendation:**Enable audit in production; send to a secure, immutable backend and restrict access. Tune policy (stages, resources) to control volume.

## 10. Inclusion and Exclusion Patterns

### By namespace

### By pod name (regex)

- **Exclude coredns:**`Exclude kubernetes.pod_name coredns`

- **Exclude all scheduler pods:**`Exclude kubernetes.pod_name kube-scheduler`

- **Exclude by prefix:**`Exclude kubernetes.pod_name ^my-noisy-job-`

### By container name

- **Exclude sidecar:**`Exclude kubernetes.container_name istio-proxy`

- **Exclude init containers**(if tagged): same idea with the init container name.

### By path (input level)

- **Only certain namespaces at read time:**Not directly in Fluent Bit for CRI; path is`/var/log/containers/*.log`(all). Filtering is done with grep/modify after Kubernetes metadata is added.

- **Multiple paths:**You can add a second`[INPUT] tail`with a different`Path`(e.g.`/var/log/audit/audit.log`) and a different`Tag`to collect audit logs.

### Split pipelines (e.g. infra vs app)

- Use**Lua**or**record_modifier**to set a field (e.g.`log_type=infrastructure`or`app`) from`kubernetes.namespace_name`or`pod_name`.

- Use**rewrite_tag**to re-emit with a new tag (e.g.`infrastructure.*`,`app.*`).

- Use**separate OUTPUTs**with`Match infrastructure.*`and`Match app.*`to send to different collector paths or backends.

## 11. Use Cases: Security, Infrastructure, Application, and More

Below are**numbered use cases**that map real-world goals to which logs to collect, what to monitor, and how to include or exclude them.

### 11.1 Security monitoring

**Summary:**For security,**include**audit, control plane (at least apiserver), application logs, and node/runtime.**Exclude**only for volume/cost after tuning (e.g. audit stages).

### 11.2 Infrastructure monitoring

**Summary:**For infrastructure,**include**CoreDNS, ingress, CNI, metrics-server, CSI, kubelet.**Exclude**only specific add-ons (e.g. coredns) if you accept losing that signal and volume is critical.

### 11.3 Application and workload monitoring

**Summary:**For application monitoring,**include**application logs (all or per-namespace) and Events.**Exclude**sidecars, init containers, or very noisy workloads to control volume.

### 11.4 Compliance and auditability

**Summary:**For compliance,**include**audit (tuned by policy) and any application logs that record access.**Exclude**only where policy explicitly allows (e.g. non-production).

### 11.5 Cost control and operational focus

**Summary:**For cost,**exclude**or**sample**noisy or non-critical streams;**split**infra vs app if retention/backends differ.

### 11.6 Debugging and incident response

**Summary:**For debugging,**include**Events, control plane, kubelet, and application;**exclude**only when narrowing scope for a specific test.

## 12. Summary Matrix and Checklist

### Log type → what to monitor, include/exclude, why it matters

### Minimal production checklist

- **Application logs**from all namespaces you care about (with exclusions for known noise).

- **Control plane**(api, controller, scheduler; etcd if possible).

- **Events**exported to log/alerting backend (at least Warning + critical reasons).

- **Audit**enabled and sent to secure backend (tuned for volume).

- **Infrastructure**(at least DNS, ingress) unless you explicitly exclude for cost.

- **Node/runtime**where you need to debug node-level and runtime issues.

## 13. Example Training Cluster

A**training cluster**is provided in the repo to practice logging and monitoring with the guide. It is fully functional and includes all components needed to collect and view logs.

### Cluster description

**Manifests location:**`training-cluster/`in the repo.

- `00-namespaces.yaml`— logging, production, staging, development

- `01-apps-production.yaml`— frontend, backend, worker

- `01-apps-staging.yaml`— api, cache, cron

- `01-apps-development.yaml`— dev-web, dev-db, dev-queue

- `02-log-listener.yaml`— Deployment + Service (logging ns)

- `03-fluent-bit-config.yaml`— ConfigMap (simple pipeline, 2 outputs)

- `03-fluent-bit-rbac.yaml`— ServiceAccount, ClusterRole, ClusterRoleBinding

- `03-fluent-bit-daemonset.yaml`— DaemonSet

**Apply order:**Namespaces → Apps → Log-listener → Fluent Bit (config, RBAC, DaemonSet). See`training-cluster/README.md`for exact commands and Minikube image build/load for the log-listener.

## 14. Showing Cluster Configuration with kubectl

Use these commands to inspect and document your cluster’s logging-related configuration.

## Cluster and nodes

```text
# Cluster info (name, server, version)
kubectl cluster-info
# Nodes (names, roles, status, age)
kubectl get nodes -o wide
# Node labels and capacity
kubectl describe nodes
```

<img src="https://cdn-images-1.medium.com/max/800/1*hcc7dGQfgie2ghAkn1LVQQ.png" alt="Article image" width="908" height="94" loading="lazy" decoding="async" />

<img src="https://cdn-images-1.medium.com/max/800/1*sZzzL67hg3BlpQk0W2K6bw.png" alt="Article image" width="1353" height="828" loading="lazy" decoding="async" />

### Namespaces and workloads

```text
# 
All
 namespaces
kubectl 
get
 namespaces
# 
All
 pods 
in
 
all
 namespaces (
with
 node 
and
 IP)
kubectl 
get
 pods 
-
A 
-
o wide
# Pods 
in
 a 
specific
 namespace (e.g. logging)
kubectl 
get
 pods 
-
n logging 
-
o wide
# Deployments 
and
 DaemonSets (e.g. 
in
 logging)
kubectl 
get
 deploy,daemonset 
-
n logging
```

<img src="https://cdn-images-1.medium.com/max/800/1*qRiR_A4v31NInl9G8ZISng.png" alt="Article image" width="1353" height="828" loading="lazy" decoding="async" />

### Fluent Bit configuration

```text
# ConfigMap that holds fluent-bit.conf and parsers
kubectl get configmap fluent-bit-config -n logging -o yaml
# Only the main config (fluent-bit.conf)
kubectl get configmap fluent-bit-config -n logging -o jsonpath=
'{.data.fluent-bit\.conf}'
# Fluent Bit pods (DaemonSet)
kubectl get pods -n logging -l app=fluent-bit
kubectl logs -n logging -l app=fluent-bit --
tail
=50
```

### Log-listener and services

```text
# Log-listener deployment and service
kubectl get deploy,svc -n logging -l app=
log
-listener
# Service endpoints (which pod backs the listener)
kubectl get endpoints -n logging 
log
-listener
```

### RBAC (Fluent Bit)

```text
# ServiceAccount used by Fluent Bit
kubectl 
get
 sa fluent-bit -n logging
# ClusterRole and ClusterRoleBinding
kubectl 
get
 clusterrole fluent-bit
kubectl 
get
 clusterrolebinding fluent-bit -o yaml
```

## One-liner overview (training cluster)

```text
# Namespaces and pod count per namespace
kubectl get pods -A --no-headers | awk 
'{print $1}'
 | 
sort
 | 
uniq
 -c
# List all deployments and DaemonSets
kubectl get deploy,daemonset -A
```

Use these to confirm the training cluster layout (namespaces, apps, Fluent Bit, log-listener, RBAC) and to document “as deployed” for the guide.

## 15. References

- [Kubernetes logging architecture](https://kubernetes.io/docs/concepts/cluster-administration/logging/)

- [Fluent Bit: Kubernetes filter](https://docs.fluentbit.io/manual/pipeline/filters/kubernetes)

- [Fluent Bit: grep filter](https://docs.fluentbit.io/manual/pipeline/filters/grep)

- [Kubernetes audit](https://kubernetes.io/docs/tasks/debug-application-cluster/audit/)

- [Kubernetes Events](https://kubernetes.io/docs/reference/kubernetes-api/cluster-resources/event-v1/)

## A message from our Founder

**Hey,**[**Sunil**](https://linkedin.com/in/sunilsandhu)**here.**I wanted to take a moment to thank you for reading until the end and for being a part of this community.

Did you know that our team run these publications as a volunteer effort to over 3.5m monthly readers?**We don’t receive any funding, we do this to support the community. ❤️**

If you want to show some love, please take a moment to**follow me on**[**LinkedIn**](https://linkedin.com/in/sunilsandhu)**,**[**TikTok**](https://tiktok.com/@messyfounder),[**Instagram**](https://instagram.com/sunilsandhu). You can also subscribe to our[**weekly newsletter**](https://newsletter.plainenglish.io/).

And before you go, don’t forget to**clap**and**follow**the writer️!
