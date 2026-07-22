# Porsche Hero Image Design

## Goal

Replace the homepage's static white Camaro hero with the authentic black Porsche Taycan hand-wash photograph already used in the portfolio.

## Design

The homepage keeps its current hero structure, headline, supporting copy, calls to action, dark scrim, and typography. Only the image source, responsive source set, and alternative text change. The Porsche photograph is preferred because its landscape framing suits a full-width hero, its detailing action makes the service immediately legible, and the vehicle maintains the site's premium tone.

The hero uses `/images/gallery-suv.jpg` as the 1600-pixel source and `/images/display/gallery-suv.jpg` as the 1280-pixel source. The existing `object-position` remains the baseline and may receive a narrowly scoped adjustment only if rendered desktop or 390-pixel mobile QA shows an important subject being cropped.

## Desktop Text Vignette

At desktop widths of 768 pixels and above, the home hero scrim becomes a subtle lower-left radial vignette. It starts with moderate black opacity directly behind the copy and fades smoothly to transparent before covering the right side of the Porsche. The treatment must have no panel edge and must not darken the entire photograph. Mobile keeps the existing uniform 18-percent scrim because its narrower crop already supports the text.

## Accessibility and Performance

The alternative text becomes `Black Porsche Taycan receiving a careful hand wash`. The image remains the high-priority hero asset and keeps the existing responsive `sizes="100vw"` behavior.

## Verification

Automated tests must assert the Porsche source, responsive source set, alternative text, high fetch priority, desktop media-query boundary, and vignette gradient contract. Rendered QA must confirm that the car and hand-wash action remain visible at 1440 by 1000 and 390 by 844, the headline and calls to action remain readable, the desktop vignette has no visible panel edge, mobile remains unchanged, and the browser console has no relevant warnings or errors.
