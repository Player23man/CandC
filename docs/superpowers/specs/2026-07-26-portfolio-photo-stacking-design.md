# C&C Portfolio Photo Stacking Design

## Goal

Give the homepage proof section and portfolio galleries an intentional stacking
rhythm without changing the approved photos, their order, the comparison
interaction, or the site’s black, warm off-white, and red visual system.

## Problem

The current desktop layouts use unrelated widths and vertical offsets. Photos
that belong to the same visual row begin at arbitrary heights, so the pages
feel accidental even though the image order is acceptable. The offsets also
make the page longer than necessary and weaken the relationship between paired
images.

## Homepage

Keep the paint-correction comparison as the dominant image on the left. Stack
the two supporting finished-work images in a right column with a consistent
gap. The first supporting image aligns with the comparison’s top edge and the
second aligns with its bottom edge. Remove the second image’s horizontal offset.

The desktop grid uses an 8/4 column split. The right column uses
two equal-height rows so its total height, including the gap, matches the
comparison. Supporting images use crops appropriate to their source while
filling those rows.

## Portfolio Transformations

Preserve the existing six-pair order. Arrange the comparisons into three
explicit desktop rows:

1. Paint correction at seven columns and driver footwell at five columns.
2. Cargo area at five columns and center console at seven columns.
3. Exterior panel at seven columns and engine bay at five columns.

Both items in each row share the same vertical start. No item receives an
independent top margin. Each comparison keeps its existing aspect ratio, so
row bottoms may differ naturally without creating an artificial stagger.
Vertical space is applied between rows, not individual items.

## Finished Work

Preserve the current finished-work order and form three explicit rows:

1. Blue Corvette at seven columns and Porsche hand wash at five columns.
2. Supra boat at five columns and orange coupe at seven columns.
3. White pickup at seven columns and red performance vehicle at five columns.

Both items in each row share the same vertical start. Remove all item-specific
top margins. The alternating 7/5 and 5/7 widths provide rhythm without masonry
or random staggering.

## Responsive Behavior

Below the desktop breakpoint, all three areas become a single column. Keep the
source order, use one consistent vertical gap, and remove every desktop offset.
No image may create horizontal overflow. Comparison controls retain their
existing accessible touch and keyboard behavior.

## Scope

This change is CSS-led. It may add row-specific class names or wrapper elements
only if needed to make the three-row structure explicit. It does not change
photo data, captions, copy, lightbox behavior, routes, image assets, or the
before/after component.

## Verification

- Homepage comparison and supporting column align at their top and bottom edges
  on desktop.
- Every portfolio row has a shared top edge.
- Desktop layouts use the intended 7/5, 5/7, and 7/5 rhythm.
- Mobile layouts are single-column with consistent gaps.
- No visible captions, horizontal overflow, console errors, or interaction
  regressions appear.
- Existing automated tests and the production build pass.
