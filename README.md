# 1200km Article Archive

Docusaurus source for the complete local security-research archive published at
`https://1200km.com/articles/`.

The generator combines the maintained Medium export, the current Medium RSS
window, and already-preserved local articles. Original publication URLs are kept
as provenance links, while article reading links remain on 1200km.com.

Canonical ownership is explicit in `src/data/article-catalog.json`. Each record
distinguishes the local canonical URL from its original publication and records
whether the external rendered canonical has actually been verified. The default
state is `migration-pending`; it must not be changed to `local-confirmed` until
the Medium or InfoSec Write-ups page has been checked. The generated manual-work
queue is `reports/article-canonical-migration.csv`.

Article count, canonical status totals, routes, and image dimensions are derived
from the validated catalogue. `src/data/image-dimensions.json` reserves layout
space without downloading or recompressing the original publication images at
build time.

Local development:

```bash
python3 -m pip install -r requirements.txt
npm ci
npm run start
```

Build:

```bash
npm run generate:articles
npm run validate:archive
npm run validate:media:local
npm run build:embedded
```

`build:embedded` validates the rendered archive, including canonical URLs,
title suffixes, same-origin navigation, landmark structure, and article-image
dimensions.

Production target:

https://1200km.com/articles/

The default build continues to support the historical
`/medium-blog-navigation/` project. `npm run build:legacy` adds a migration notice
and points archive canonical metadata to `/articles/`.
