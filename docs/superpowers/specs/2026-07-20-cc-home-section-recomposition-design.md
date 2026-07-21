# C&C Homepage Section Recomposition

Approved direction: Interactive Service Board.

## Objective

Replace four weak homepage blocks with three specific, connected sections that feel designed for C&C Detailing rather than assembled from generic landing-page patterns.

The revision preserves every public business fact, service price, package note, testimonial sentence, route, contact method, accessibility behavior, and the existing black, white, and signal-red brand system.

## Page sequence

The homepage sequence becomes:

1. Existing hero
2. Interactive Service Board
3. Existing portfolio preview
4. Attributed customer review
5. Dark contact dock
6. Existing footer

The current `Built around what your vehicle needs` and `What the work includes` sections are replaced by the single service board. Their information is consolidated rather than removed.

## Interactive Service Board

### Purpose

Help a vehicle owner compare C&C's four real service categories without scrolling through a long price list or reading duplicated inclusion groups.

### Desktop composition

The section uses a 12-column editorial layout inside the existing site shell.

- The left side contains four service selectors: Exterior Detail, Interior Restoration, Paint Correction, and Ceramic Coating.
- Selectors are text rows rather than cards. The active service uses signal red for its service name and a restrained indicator line.
- The right side is one functional detail surface, not a decorative card grid.
- The detail surface contains the active service's starting price, description, included work, size-based prices or add-ons, and one image.
- Price and package information comes directly from `src/app/site-data.ts`.
- The section heading becomes `Choose the work your vehicle needs.`
- Supporting copy remains factual: `Compare starting prices, included work, and package options.`
- The section ends with the existing `Ask about your vehicle` contact link.

### Interaction

- Exterior Detail is selected initially.
- Clicking or keyboard-activating another service updates the detail surface without navigating.
- Selectors use the ARIA tab pattern with a tablist, tabs, and one tabpanel.
- Arrow Left, Arrow Right, Arrow Up, and Arrow Down move between tabs.
- Home and End move to the first and last services.
- Focus remains on the active tab after keyboard changes.
- The content change uses a short opacity and vertical-transform transition only.
- Reduced-motion users receive an immediate content change.

### Mobile composition

Below 768px, the service board becomes an accordion.

- Every service remains visible as a heading with its starting price.
- One service panel is open at a time.
- Opening a service reveals its description, inclusions, price notes, and image directly below its heading.
- Buttons expose `aria-expanded` and `aria-controls`.
- The section remains one continuous page surface with no rounded cards.

### Imagery

The board maps the current isolated image set to services:

- Exterior Detail: `detail-exterior.jpg`
- Interior Restoration: `gallery-suv.jpg`
- Paint Correction: `detail-process.jpg`
- Ceramic Coating: `ceramic-display.jpg`

These remain replaceable through one typed mapping. No captions or invented project metadata are added.

## Customer review

### Composition

The review becomes a compact proof section instead of a full-width oversized quote.

- Use the exact strongest excerpt from the existing testimonial: `I felt like I drove away in a brand-new car. His work is meticulous; every crevice of car cleaned to perfection!`
- Add the source-honest attribution `Verified customer review` and `2022 Tucson owner`.
- Do not invent a customer name, star rating, review date, platform, or location.
- Pair the quote with a narrow crop of `ceramic-display.jpg` or a simple open black field, depending on the final rendered balance.
- Keep the quote to approximately three desktop lines and readable mobile line lengths.
- Use signal red only as a small structural accent, not a filled testimonial card.

## Dark contact dock

### Composition

Retain the heading `Tell us what your vehicle needs.` while removing the full-width red slab.

- Use the standard black canvas with a strong top rule and generous but controlled spacing.
- Place the heading on the left.
- Place one red `Get a quote` action on the right.
- Below or beside the action, show Collin and Caleb as separate direct-call rows with their real roles and phone numbers.
- Keep `Appointment only. Mileage fees may apply for mobile service.` visible as supporting information.
- The red accent belongs to the quote button and active contact states only.
- Do not add a background photograph, gradient, glow, rounded container, or decorative icon cluster.

### Mobile

- Stack the heading, quote action, and two specialist rows.
- Keep every action at least 44 pixels tall.
- Prevent phone numbers and button labels from wrapping awkwardly.

## Content and data boundaries

- `src/app/site-data.ts` remains the factual source of truth.
- Service content is not duplicated inside the new component.
- A typed image mapping may live beside the service-board component.
- Testimonial attribution is added as explicit source-honest data, not inferred customer identity.
- `QuoteCta` remains reusable by Portfolio, but accepts a visual variant so the Homepage can use the new dock without changing Portfolio unless required.

## Components

- Create `src/components/ServiceBoard.tsx` for selection state, keyboard behavior, and responsive markup.
- Modify `src/components/QuoteCta.tsx` to support the new dock structure while retaining factual contacts.
- Modify `src/pages/HomePage.tsx` to replace the two current service sections and add review attribution.
- Rewrite the corresponding sections in `src/styles/home.css`.
- Keep state local to `ServiceBoard`; no application-level state is required.

## Accessibility

- Preserve visible focus styles and WCAG AA contrast.
- Service tabs and accordion buttons must be operable by keyboard.
- The active tab and expanded accordion panel must be announced correctly.
- Images retain useful alt text.
- No content is available only on hover.
- Reduced-motion behavior remains static and complete.

## Verification

- Add tests for the initial active service and content switching.
- Add a keyboard test for service-tab navigation.
- Verify mobile accordion state and `aria-expanded` behavior.
- Verify the exact review excerpt and both attribution lines.
- Verify the quote dock contains the contact route and both real phone numbers.
- Run the complete Vitest suite and production build.
- Use Playwright to inspect Home at 390, 768, 1024, and 1440 pixels.
- Check the four revised sections for overlap, horizontal overflow, awkward text wrapping, hidden content, console errors, and repeated template grammar.
- Re-run Lighthouse against the production bundle and preserve accessibility, best-practices, and SEO scores.

## Explicit exclusions

- No new routes or form fields
- No invented reviewer name or rating
- No service cards or three-column feature grid
- No standalone `What the work includes` section
- No full-width red CTA background
- No gradients, glass, pills, eyebrow repetition, section numbers, or decorative copy
- No change to the hero, primary navigation, portfolio route, contact route, or footer information architecture
