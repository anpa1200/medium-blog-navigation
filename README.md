# 1200km Article Archive

Docusaurus source for the complete local security-research archive published at
`https://1200km.com/articles/`.

The generator combines the maintained Medium export, the current Medium RSS
window, and already-preserved local articles. Original publication URLs are kept
as provenance links, while article reading links remain on 1200km.com.

Local development:

```bash
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

Production target:

https://1200km.com/articles/

The default build continues to support the historical
`/medium-blog-navigation/` project. `npm run build:legacy` adds a migration notice
and points archive canonical metadata to `/articles/`.
