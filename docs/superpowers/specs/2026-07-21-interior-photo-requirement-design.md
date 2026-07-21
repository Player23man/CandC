# Interior Photo Requirement Design

## Goal

Make interior quote requests include useful vehicle photos while simplifying Collin's contact presentation.

## Contact Presentation

- Keep Collin's name and phone number wherever the shared contact rail appears.
- Remove the visible `Exterior specialist` subtitle from every contact-rail variant.
- Do not replace it with another title.

## Conditional Photo Requirement

- Vehicle photos remain optional by default and for every service except `Interior Detailing`.
- When the customer selects `Interior Detailing`, the photo label changes from `Optional vehicle photos` to `Vehicle photos` and shows the same red required star used by the other required form fields.
- The file input exposes its required state to assistive technology while Interior Detailing is selected.
- Submitting an Interior Detailing request without at least one selected image prevents the email handoff and displays `Add at least one interior photo.` beneath the file input.
- Selecting a file clears the photo error.
- Switching away from Interior Detailing returns the field to its optional presentation and clears any photo error.
- The existing note explaining that attachments must be added manually to the prepared email remains visible.

## Implementation Boundaries

- Track selected files locally in `ContactForm`; file data does not become part of `QuoteFormValues` or the mailto payload.
- Extend quote-form errors with a photo-specific error key.
- Keep the existing mailto workflow unchanged after validation succeeds.
- Remove the subtitle markup from `SpecialistRail`; the underlying business data may remain unchanged because it is not displayed.

## Verification

- Add a regression test proving `Exterior specialist` is no longer rendered.
- Add contact-form tests proving the photo label is optional initially, becomes starred for Interior Detailing, blocks submission without a file, and returns to optional when a different service is selected.
- Run the focused tests first, then the full test suite and production build.
- Verify the conditional label and validation in the rendered contact form at desktop and mobile widths.
