# C&C Detailing SEO Action Plan

Audit date: July 27, 2026

## Completed quick wins

1. Added the exact Google Search Console verification meta tag.
2. Added `index, follow, max-image-preview:large`.
3. Added complete Open Graph metadata, including image dimensions, type, and alt text.
4. Added a `summary_large_image` Twitter card.
5. Prepared the supplied C&C image as a 1200 × 1200, 235 KB social-preview JPEG.
6. Improved route titles and descriptions around auto detailing, paint correction, ceramic coating, marine detailing, and Channahon.
7. Added JSON-LD `LocalBusiness` data with services, service area, contact details, and Facebook identity.
8. Added regression coverage for portfolio metadata and the social preview.

## Next actions

### High priority — after deployment

1. Open Google Search Console and click **Verify** for the domain/URL-prefix property.
2. Request indexing for the homepage and submit `https://www.ccdetailingllc.com/sitemap.xml`.
3. Share the deployed homepage through Facebook’s Sharing Debugger or another preview validator to force a fresh scrape of the new image.
4. Run mobile PageSpeed Insights for `/`, `/portfolio`, and `/contact`; prioritize measured LCP, INP, or CLS failures.

### Medium priority

1. Optimize `gallery-coupe.jpg` and `gallery-sport.jpg` while preserving enough resolution for the lightbox.
2. Remove or convert the unused 1.9 MB `cc-brand.png` after confirming no external workflow depends on it.
3. Consider prerendering the three routes if portfolio/contact links need unique previews in Facebook, Messages, Slack, or other crawlers that do not execute React.

### Maintenance

1. Review Search Console indexing, queries, and page experience monthly.
2. Keep titles, descriptions, sitemap routes, and structured services aligned whenever offerings change.
3. Add only verified public business facts to schema; do not invent an address, hours, ratings, or service areas.

## Success checks

- Search Console reports ownership verified.
- Sitemap fetch succeeds and all three routes are discovered.
- The homepage share preview shows the supplied circular C&C graphic.
- No route is marked `noindex`.
- Mobile Core Web Vitals pass or have a measured remediation plan.
