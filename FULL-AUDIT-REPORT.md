# C&C Detailing SEO Audit

Audit date: July 27, 2026

Scope: Full local repository audit of the public homepage, portfolio, and contact routes

Overall score: 88/100 (Good)

Score confidence: Medium — source, tests, production build, metadata, schema, sitemap, and image assets were inspected locally; live crawl and field Core Web Vitals were not measured.

## Audit summary

The site has a sound crawlable foundation: one clear H1 per route, descriptive page content, canonical URLs, a permissive `robots.txt`, and a three-route XML sitemap. This pass added the missing Google Search Console verification, complete Open Graph and Twitter metadata, a dedicated 1200 × 1200 share image, and JSON-LD `LocalBusiness` data.

The three highest-value improvements completed were:

1. Added the supplied Google site-verification token.
2. Replaced the generic preview asset with the supplied C&C image and complete social-card metadata.
3. Added structured business and service data using JSON-LD.

The main remaining opportunities are live performance measurement, server-rendered route metadata for non-home social shares, and further optimization of large lightbox/source images.

## Score card

| Area | Score | Evidence |
| --- | ---: | --- |
| Technical SEO | 92 | Canonicals, robots, sitemap, index/follow directive, verification token, and successful production build |
| On-page SEO | 90 | Unique intent-led route titles/descriptions and one H1 per route |
| Content quality | 86 | Clear local service details, prices, portfolio proof, contact information, and specific service inclusions |
| Schema | 90 | Validly parsed JSON-LD `LocalBusiness` with identity, service area, contact details, social profile, and service catalog |
| Images | 78 | Descriptive alt text and optimized display assets; three source assets remain over 500 KB |
| Performance | Insufficient live data | Build output is healthy, but PageSpeed/CrUX was not measured |
| GEO / AI readiness | 84 | Business identity, locality, services, pricing, contact information, and structured data are explicit |

Scores are directional. They reflect the confirmed positive and deficit signals above, with warnings applied for large source images and SPA-only route metadata.

## Findings

| Area | Severity | Confidence | Finding | Evidence | Impact | Fix |
| --- | --- | --- | --- | --- | --- | --- |
| Indexing | Pass | Confirmed | Search engines can crawl the public routes. | `public/robots.txt` allows all crawlers and references the XML sitemap. | Supports discovery and indexing. | No change required. |
| Search Console | Pass | Confirmed | Google ownership verification is present. | `index.html` contains the requested `google-site-verification` token. | Enables Search Console verification after deployment. | Deploy, then complete verification in Search Console. |
| On-page metadata | Pass | Confirmed | Public routes have unique, locally relevant titles and descriptions. | `RouteMeta.tsx` defines metadata for `/`, `/portfolio`, and `/contact`. | Improves relevance and search-result click-through context. | Monitor Search Console after indexing. |
| Social previews | Pass | Confirmed | Open Graph and Twitter cards use the supplied C&C image. | Static tags reference `/images/cc-detailing-social-preview.jpg`; the file is 1200 × 1200 JPEG. | Produces a recognizable branded preview when the homepage is shared. | Validate the deployed URL with platform preview tools. |
| Structured data | Pass | Confirmed | Local business and service information is machine-readable. | JSON-LD parses successfully and includes business identity, phone, email, service area, Facebook profile, and five services. | Helps search engines understand the entity and its offerings. | Add a verified street address/opening hours only if the business wants them public. |
| Route sharing | Warning | Confirmed | Portfolio and contact metadata is changed client-side. | The Vite SPA serves `index.html`; `RouteMeta.tsx` updates route tags after React loads. | Some social crawlers do not execute JavaScript and may show homepage copy for inner-route links. | Consider static prerendering or SSR if route-specific social previews become important. |
| Image weight | Warning | Confirmed | Three source images exceed 500 KB. | `cc-brand.png` is about 1.9 MB; `gallery-coupe.jpg` is about 928 KB; `gallery-sport.jpg` is about 696 KB. | Large lightbox/source downloads can affect mobile performance. | Convert unused PNG assets and large lightbox originals to WebP/AVIF or quality-controlled JPEGs. |
| Core Web Vitals | Info | Unknown | Live LCP, INP, and CLS are not known from repository inspection. | No PageSpeed/CrUX result was collected in this local pass. | Field data is required to prioritize performance work reliably. | Run mobile PageSpeed Insights after deployment and review Search Console CWV data. |

## Verification

- `npm test`: 32/32 tests passed.
- `npm run build`: production build passed.
- JSON-LD: parsed successfully with `JSON.parse`.
- Required metadata: verification token, Open Graph image, Twitter card, and canonical were found.
- `git diff --check`: passed.

## Environment limitations

The SEO skill’s BeautifulSoup-based parser/schema validator could not run because the optional `beautifulsoup4` dependency is not installed. No package was added to the project. Schema syntax and required metadata were verified directly with Node, but live crawl, PageSpeed/CrUX, deployed social-card retrieval, and Search Console ownership status remain follow-up checks after deployment.
