# C&C Contact, Interior, Marine, and Content Photo Update

**Date:** July 21, 2026  
**Status:** Approved design direction; awaiting written-spec approval  
**Routes:** `/`, `/portfolio`, `/contact`

## Summary

Update the existing C&C Detailing site to reflect the current business offering and contact workflow. Remove Caleb from every customer-facing surface, require both phone and email in the quote form, consolidate interior detailing into one package starting at $160, introduce marine detailing with the published per-foot pricing, and expand the site's authentic photography using C&C's public Facebook images.

This is a focused content and functionality update within the existing editorial design system. It does not introduce a new route, booking system, CMS, or invented photography.

## Contact Information

- Remove Caleb, his role, and `815-409-5501` from the shared business data, specialist rail, footer, homepage quote close, contact page, tests, and any other rendered output.
- Keep Collin as the only named contact:
  - Name: Collin
  - Phone: 815-922-1593
  - Email: candcdetailing25@gmail.com
- Retain native `tel:` and `mailto:` behavior.
- Adjust the remaining contact layouts so they do not leave an empty second-specialist column.

## Quote Form Requirements

- Phone and email are both required fields.
- Display the same visible red required marker used by the other required fields beside both labels.
- Validate phone and email independently rather than accepting either one as sufficient.
- Show a field-specific error under the corresponding input when it is empty.
- Preserve the existing mail-app handoff, email fallback, optional photo input, vehicle/service/detail requirements, and accessible error associations.

## Interior Detailing

- Use one `Interior Detailing` service package.
- Display `From $160` as its price.
- Remove the current basic-cleaning and full-restoration price split.
- Keep all approved interior service information together under the single package description and included-work list.
- Do not invent additional tiers, conditional prices, or guarantees.

## Marine Detailing

Add Marine Detailing as a fifth service in the existing service board. Do not create a separate marine page.

The service should communicate mobile boat care, oxidation removal, interior cleaning, and ceramic protection without making unsupported claims. Preserve the published prices exactly:

- Wash: $10/ft
- Wash and wax: $30/ft
- Wash, light oxidation removal, and wax: $60/ft
- Wash, heavy oxidation removal, and wax: $80-$100/ft
- Ceramic coating: add $20/ft
- Basic interior cleaning: $10/ft
- Deep interior cleaning: $30-$40/ft

The compact service-board price should read `From $10/ft`. The full set of prices belongs in the expanded pricing-and-options area.

Add `Marine Detailing` to the quote form's service selection automatically through the shared service data.

## Photography

Use C&C's public Facebook page as the source for authentic content photography. Download and store selected assets locally in the site's `public/images` inventory; do not hotlink Facebook CDN URLs.

### Selection rules

- Use the high-resolution C&C cover image as the source for a clean boat crop in the marine service content.
- Use the strongest authentic interior before/after images for the interior service and portfolio.
- Retain existing strong vehicle photography where it remains more suitable than the Facebook source.
- Exclude Facebook interface chrome, screenshots, promotional flyers, logo-only graphics, low-resolution thumbnails, and near-duplicate frames.
- Do not label an image as a specific service result unless the Facebook context supports that description.
- Write concise, factual alternative text based only on visible content.

### Placement

- Marine service: use the clean boat crop as the service image.
- Interior service: replace the unrelated exterior-oriented image with an authentic interior-detailing photo.
- Portfolio: add a small curated interior transformation chapter or sequence without turning the page into an unfiltered social feed.
- Homepage content: use selected Facebook photography only where it strengthens the existing editorial composition; do not add a generic grid.

## Responsive and Interaction Behavior

- Preserve the existing desktop tab and mobile accordion service-board behavior when adding the fifth service.
- Ensure the five desktop service tabs remain readable without horizontal overflow at supported widths.
- Keep all service controls keyboard-operable and maintain their tab/tabpanel relationships.
- Keep portfolio images keyboard-accessible through the existing lightbox.
- Reflow the Collin-only contact rail cleanly across desktop and mobile.

## Testing and Verification

- Update data tests to assert Caleb is absent, Collin remains correct, Interior Detailing is `From $160`, and Marine Detailing contains the published prices.
- Update contact tests to require phone and email independently and verify both red required markers are present.
- Update specialist-rail, quote-CTA, footer, service-board, and portfolio tests for the new content.
- Run the complete automated test suite and production build.
- Verify `/`, `/portfolio`, and `/contact` at desktop and mobile widths.
- Confirm no Caleb reference or old interior price remains in rendered content or source data.
- Confirm the marine image and added portfolio images load locally and have appropriate dimensions and alternative text.

## Non-goals

- No dedicated marine route.
- No marine booking calculator or automatic per-foot quote calculation.
- No new contact backend or automatic photo upload.
- No invented customer names, boat models, service outcomes, or testimonials.
- No use of the supplied Facebook screenshot or flyer as a finished content image.
