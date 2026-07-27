# C&C Quote and Contact Conversion Redesign

**Date:** July 26, 2026
**Status:** Approved through browser feedback
**Routes:** `/`, `/portfolio`, `/contact`

## Goal

Replace the generic paint-correction image, oversized red quote buttons, awkward closing quote section, and weak direct-contact band with one restrained editorial conversion system.

## Visual Thesis

Use the existing Leica-led campaign language as a practical service desk: warm print surfaces, sharp black typography, thin rules, and one red signal. The result should feel composed and direct rather than promotional, card-based, or app-like.

## Content Plan

- Keep the existing hero content and route structure.
- Use the real blue corrected-paint photograph for Paint Correction.
- Keep the approved quote heading, appointment note, contact facts, and destinations.
- Recompose the closing quote section as a full-width warm editorial chapter.
- Recompose the Contact page's direct-contact band as a titled, cardless contact index.
- Preserve the existing quote form and email handoff.

## Paint Correction Image

- Replace `/images/detail-process.jpg` with `/images/cc-paint-after.jpg` in the Paint Correction service.
- Describe the visible corrected blue paint and reflected shop lighting accurately.
- Keep lazy loading, async decoding, and the single active service image behavior.
- Use deliberate `object-position` rules so the portrait photograph retains its strongest reflective area at mobile and desktop sizes.

## Quote Action System

Every user-facing action labeled `Get a quote` must use the same sharp, two-part treatment:

- Cream action surface with dark text on black or photographic backgrounds.
- Dark action surface with cream text on warm print backgrounds.
- A compact red terminal cell containing a directional arrow.
- Square corners, one-pixel border, minimum 48-pixel target height, visible focus, and restrained hover movement.
- No large solid-red rectangles, pills, gradients, glow, or drop shadows.

Apply the treatment to:

- Desktop header
- Mobile navigation
- Home hero
- Shared closing quote section
- Contact form submit button

## Closing Quote Section

- Use the warm print surface across the full viewport width.
- Keep `Tell us what your vehicle needs.` and the appointment/mileage note unchanged.
- Use a controlled heading scale that does not crop or overpower the mobile viewport.
- Place the quote action beside the heading on wide screens and below it on narrow screens.
- Integrate the phone contact as a compact ruled row beneath the primary conversion area.
- Remove the thick red top border and avoid putting the content inside a card.

## Contact Page Direct-Contact Band

- Change the band from an undifferentiated dark stack to a warm print contact index.
- Add the visible heading `Contact C&C Detailing` and the factual line `Call, email, or message us on Facebook.`
- Present Phone, Email, and Facebook as three cardless ruled actions.
- Each action must expose a short channel label and the real destination.
- Stack the actions as compact full-width rows on mobile.
- Align the actions into a deliberate horizontal strip on desktop.
- Keep the section visually connected to the warm quote form chapter without collapsing the two into one unstructured block.

## Interaction Thesis

- Quote-action arrows shift a few pixels on hover while the red terminal cell darkens.
- Contact rows respond with a restrained color change and a slight destination-arrow movement.
- Existing section reveals remain unchanged; no new scroll effects or dependencies are needed.
- Reduced-motion preferences must continue to suppress decorative transitions.

## Accessibility and Responsive Requirements

- Preserve semantic links, button types, section headings, route destinations, and phone/email protocols.
- Preserve visible keyboard focus and at least 48-pixel action targets.
- Keep phone numbers and email addresses readable without truncation or horizontal overflow.
- Verify mobile and desktop layouts at 390, 734, 1024, and 1440 pixels.
- Verify all three routes for broken images, clipped text, console errors, and horizontal overflow.

## Testing

- Prove the Paint Correction service renders `/images/cc-paint-after.jpg`.
- Prove the contact page exposes the visible contact heading and all real contact destinations.
- Prove every shared `Get a quote` action uses the quote-action class.
- Keep the existing form, navigation, service-board, and quote-destination tests passing.
- Run the focused tests, full test suite, and production build.

## Non-Goals

- No new routes, form backend, services, prices, business claims, or contact methods.
- No redesign of the hero, portfolio grids, service-board interaction, or quote-form fields.
- No new package or visual dependency.
