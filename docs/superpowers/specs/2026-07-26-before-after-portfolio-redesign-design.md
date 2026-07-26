# C&C Before/After Portfolio Redesign

**Date:** July 26, 2026  
**Status:** Approved design direction; awaiting written-spec approval  
**Routes:** `/`, `/portfolio`

## Summary

Redesign the C&C Detailing homepage portfolio preview and full portfolio around
real transformation proof. Use Collin Fleming's newly supplied photographs to
build six interactive before/after comparisons, then retain a small selection
of strong finished-vehicle photography as supporting work.

The result must stay within the site's approved Leica/Polestar-inspired
editorial system: black, warm off-white, restrained red, large imagery, thin
rules, and clear typography. It must not look like a generic gallery widget,
card grid, or social feed.

## Asset Source and Selection

Use the 15 photographs Collin supplied through the Frontstage Meta Business
Suite conversation. Download and store the selected files locally; do not
hotlink Facebook CDN URLs.

Organize the supplied photos into six transformation pairs:

1. Blue paint correction
2. Driver footwell
3. Cargo area
4. Center console
5. Dark exterior panel
6. Engine bay

Use the remaining supplied finished-work photos as standalone portfolio
imagery:

- Blue Corvette
- Supra boat
- White pickup

Retain only two or three of the strongest existing C&C exterior photographs.
Remove weaker, redundant, or visually conflicting gallery images so the page
feels curated rather than accumulated.

### Asset preparation

- Store full-resolution files in `public/images/`.
- Create appropriately sized display versions in `public/images/display/`.
- Use descriptive stable filenames.
- Keep the existing full-resolution/display-source split.
- Preserve image quality while avoiding unnecessarily large page assets.
- Write factual alternative text based only on visible content.

## Before/After Slider

Create one reusable `BeforeAfterSlider` component.

### Visual treatment

- Display the after image as the base layer.
- Clip the before image above it according to the current slider position.
- Use a thin C&C red dividing rule.
- Center a compact circular handle on the dividing rule.
- Overlay small `Before` and `After` labels inside the image corners.
- Do not render a title, vehicle description, or service caption below the
  image.
- Avoid rounded card shells, shadows, gradients, and decorative controls that
  compete with the photography.

### Interaction

- Support pointer dragging with mouse, touch, and pen.
- Include a native range input or equivalent accessible control.
- Support Left Arrow, Right Arrow, Home, and End keyboard behavior.
- Expose an accessible label that identifies the comparison.
- Start at a balanced midpoint.
- Keep the images aligned and cropped identically at every position.
- Use a generous touch target without making the visible handle oversized.
- Prevent accidental page selection while dragging.

### Responsive behavior

- Use a landscape comparison on larger screens when the source pair supports
  it.
- On narrow screens, keep the slider full-width with a stable image height and
  comfortable touch target.
- Do not split before and after into separate mobile columns.
- Prevent horizontal overflow and clipped controls.

## Homepage

Replace the current three-image `finish-spread` and its captions.

Use one large before/after slider featuring the blue paint-correction pair as
the primary proof element. Follow it with two strong, uncaptained finished-work
images selected from the retained existing exterior photography and Collin's
standalone images.

Keep:

- The heading `The finish speaks for itself.`
- The `View portfolio` link
- The surrounding homepage section order

Remove:

- All image captions below the homepage portfolio imagery
- The current lead/supporting composition if it conflicts with the new
  slider-led layout

The homepage composition should feel editorial: one dominant interactive proof
image and two supporting stills with intentionally different scale or
alignment.

## Portfolio Page

Keep the existing campaign hero and quote CTA. Replace the chapter-based
captioned gallery between them.

### Transformations

Create a primary `Transformations` sequence containing all six before/after
sliders. Present them as large editorial features with breathing room, not as
small equal cards.

- Alternate image scale or alignment on desktop to maintain rhythm.
- Keep section text minimal.
- Do not place descriptive captions below the sliders.
- Use only the overlaid `Before` and `After` labels.

### Finished work

Follow the transformations with an uncaptained asymmetrical image grid using:

- The blue Corvette
- The Supra boat
- The white pickup
- Two or three retained existing exterior images

Each finished-work image remains keyboard-accessible and opens the existing
lightbox. The lightbox may use factual alternative text for accessibility, but
the portfolio page must not show visible captions beneath the images.

Remove the old `Finish`, `Process`, `Interior`, and `Protection` chapter system
if it no longer supports the transformation-led hierarchy.

## Data Model

Replace or extend `gallery-data.ts` with two explicit collections:

- `transformationPairs`: id, accessible label, before source/display source,
  after source/display source, and alt text for both images
- `finishedWorkItems`: the existing gallery item structure used by the
  lightbox

The homepage should consume the same paint-correction pair and finished-work
data as the portfolio page rather than duplicating image metadata.

## Accessibility

- The slider must work with keyboard, pointer, touch, and assistive technology.
- Every source image must have concise factual alt text.
- The visible `Before` and `After` overlays must not be the only accessible
  explanation of the control.
- Maintain visible focus states consistent with the C&C red signal color.
- Preserve Escape and previous/next keyboard behavior in the existing
  lightbox.
- Do not hide meaningful controls on mobile.

## Testing

Use test-first changes for each behavior:

- `transformationPairs` contains six complete before/after pairs.
- Homepage renders the paint-correction comparison from shared data.
- Portfolio renders six accessible comparison sliders.
- Each comparison exposes the correct accessible label.
- Changing a slider updates its comparison position.
- Keyboard interaction changes the position and respects minimum/maximum
  bounds.
- Homepage and portfolio render no visible `figcaption` elements beneath the
  photography.
- Finished-work images remain accessible buttons that open the lightbox.
- Lightbox Escape and previous/next behavior remains intact.
- All image paths use local full-resolution and display sources.

## Verification

Run:

- Focused slider, homepage, and portfolio tests
- Full Vitest suite
- Production build

Then verify `/` and `/portfolio` at mobile and desktop widths:

- Slider drag behavior with mouse and touch-style pointer input
- Slider keyboard behavior
- Correct before/after alignment and cropping
- No visible captions below images
- Finished-work lightbox behavior
- No broken images
- No console errors
- No clipped text or controls
- No horizontal overflow
- Existing header, hero, CTA, and navigation behavior remains intact

## Non-goals

- No new service, pricing, contact-form, or navigation changes
- No Facebook feed or hotlinked Facebook assets
- No invented vehicle names, service claims, or transformation outcomes
- No caption text beneath homepage or portfolio images
- No carousel, filter system, tabbed gallery, or dense grid of small sliders
- No broad rebrand of the C&C site
