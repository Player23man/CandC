# C&C Home Editorial Service Index

## Goal

Replace the Home service chapter's horizontal tab bar with a premium editorial index that makes four real detailing services easy to compare without looking like a generic web application component.

## Reference Strategy

- Use Leica's restrained service taxonomy: decisive labels, limited interface chrome, and strong negative space.
- Use Polestar's specification clarity: visible starting prices, concise feature groupings, and precise active state changes.
- Use Numbered Studio's editorial service-list rhythm: large stacked rows with typography and rules rather than cards.
- Preserve C&C's existing warm-white print surface and red signal color.

## Desktop Composition

- Keep the existing chapter heading and supporting sentence.
- Build a two-column service stage beneath the heading.
- The left column contains four stacked service controls numbered `01` through `04` in source order:
  - Exterior Detail
  - Interior Restoration
  - Paint Correction
  - Ceramic Coating
- Each control shows its number, service name, and real starting price.
- The selected control uses black type and one red rule. Inactive controls use restrained warm-gray type.
- Do not use filled tabs, outline boxes, rounded containers, shadows, or card backgrounds.
- The right column contains one selected-service stage with the existing image, description, inclusions, pricing, and options.
- The image remains the dominant element in the detail stage.
- Inclusions and pricing render as thin specification rows, not decorative bullet lists.
- Changing the selected service updates the right stage in place without moving or reloading the page.

## Mobile Composition

- Render the four services as one vertical accordion in the same `01–04` order.
- Each trigger shows its number, service name, and starting price.
- Exactly one service is expanded at a time.
- The selected image, description, inclusions, and pricing appear immediately beneath its trigger.
- Use the same warm-white surface, thin rules, black type, and restrained red signal treatment.
- Preserve comfortable touch targets and keep the quote link after the final service.

## Content and Interaction

- Preserve every current service name, description, inclusion, price, and price note exactly.
- Preserve the default selection of Exterior Detail.
- Preserve pointer selection, Arrow Left/Right or Arrow Up/Down navigation, Home, End, focus management, ARIA tab semantics on desktop, and accordion semantics on mobile.
- Preserve one rendered responsive branch and one active service image.
- Preserve the `/contact` destination and `Ask about your vehicle` label.

## Component Boundary

- Keep service data in `src/app/site-data.ts` unchanged.
- Keep the public `ServiceBoard(): JSX.Element` interface unchanged.
- Update internal `ServiceBoard` markup only where necessary to add visible service numbers and editorial specification rows.
- Scope all visual changes to the Home service chapter and its existing print modifier.

## Responsive and QA Requirements

- Verify 390x844, 768x900, 1024x900, and 1440x1000.
- Verify one selected service, one active detail stage, one service image, and no horizontal overflow at every breakpoint.
- Verify pointer selection and desktop keyboard navigation.
- Verify the mobile accordion exposes the correct description, image, inclusions, and price notes.
- Preserve visible focus and sufficient contrast on the warm-white surface.
- Run focused ServiceBoard/Home tests, the full test suite, production build, and rendered browser checks before completion.

## Scope

This revision changes only the Home service chapter. The hero, portfolio preview, customer review, quote close, Portfolio page, Contact page, business facts, and service wording remain unchanged.
