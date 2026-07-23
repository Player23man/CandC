# C&C Client Service, Quote Selection, and Gallery Update

**Date:** July 23, 2026  
**Status:** Approved design direction; awaiting written-spec approval  
**Routes:** `/`, `/portfolio`, `/contact`

## Summary

Apply Collin's latest service and quote-request corrections while expanding the site's authentic photography from C&C Detailing's public Facebook page. Keep the existing Leica/Polestar-inspired editorial system, route structure, service board, portfolio chapters, and mail-app quote handoff.

This pass has four outcomes:

1. Keep one Interior Detailing package starting at $160 and publish the complete approved inclusion list.
2. Replace exterior references to spray wax with hydro sealer.
3. Let customers request up to two services in one quote.
4. Add a small curated set of strong Facebook photographs to the existing portfolio.

## Interior Detailing

Keep a single service named `Interior Detailing` with the compact price `From $160`.

Use this complete included-work list, normalized only for capitalization and concise website presentation:

- Full interior blow-out and debris extraction
- Comprehensive vacuum of carpets, seats, and trunk
- Deep shampoo of carpets, cloth seats, and carpet mats
- Deep leather cleaning and conditioning
- Steam cleaning and sanitization of surfaces
- Full interior surface scrub
- Headliner spot cleaning
- Floor mat cleaning
- Odor neutralization

Do not introduce a second interior tier, an upper price, or invented exclusions. Preserve the existing condition-based description and the requirement that interior quote requests include at least one vehicle photo.

## Exterior Detailing

Replace `spray wax` with `hydro sealer` anywhere the exterior package or shared protection work is described.

The primary exterior included-work line should read `Hand wash and hydro sealer`. Shared protection summaries should list `Hydro sealer` instead of `Spray wax`.

Do not change the exterior starting price or the existing paid add-ons for hand wax, engine bay cleaning, or headlight restoration.

## Quote Form

### Service selection

Replace the single-service `<select>` with an accessible checkbox group.

- Label the group `Service interest`.
- Add visible helper text: `Choose up to 2 services.`
- Render every service from the shared `services` data and retain `Not sure yet` as an option.
- Require at least one selection.
- Allow no more than two selections.
- When two options are selected, disable the remaining unchecked options until the customer unchecks one.
- Keep selected options enabled so they can always be removed.
- Associate validation and limit guidance with the group for assistive technology.

The two-selection maximum applies across all options, including `Not sure yet`.

### Form state and validation

Store service interests as an ordered string array. Preserve the order in which the customer selected them.

The existing service error should remain field-specific and read `Choose at least one service.` when nothing is selected.

Interior photos are required when `Interior Detailing` appears anywhere in the selected-services array. Selecting or deselecting a second service must not incorrectly clear the interior photo requirement. Deselecting Interior Detailing should remove the photo requirement and any stale photo error.

### Email handoff

The prepared email should use `Services:` and join selected service names with a comma and space. A request containing Exterior Detail and Interior Detailing should produce:

`Services: Exterior Detail, Interior Detailing`

Preserve the existing subject, customer/vehicle fields, shop-or-mobile preference, condition details, timing, manual photo-attachment note, email fallback, and clipboard behavior.

## Facebook Photography

Use C&C Detailing's public Facebook page as the source. Download selected photos and store them locally; do not hotlink Facebook CDN URLs or embed a Facebook feed.

### Selection rules

- Select 4–6 high-resolution photographs that strengthen the current portfolio.
- Prefer clear finished-vehicle, detailing-process, interior transformation, and protection-result photography.
- Exclude profile images, logos, flyers, promotional graphics, Facebook interface chrome, low-resolution thumbnails, weak crops, and near-duplicates.
- Do not infer a specific service, product, vehicle model, or outcome that is not visibly supported.
- Write concise, factual alternative text based on visible content.

### Asset preparation

- Store full-resolution lightbox files in `public/images/`.
- Create appropriately sized display versions in `public/images/display/`.
- Use stable descriptive filenames rather than Facebook CDN filenames.
- Keep the existing full-resolution/display-source split in `gallery-data.ts`.
- Preserve image quality while avoiding unnecessarily large page assets.

### Portfolio placement

Add the selected photographs to the existing `Finish`, `Process`, `Interior`, or `Protection` chapters according to visible subject matter. Do not add a social-feed grid, a new route, or a generic `Recent work` chapter.

Retain existing strong photographs where they remain useful. The final gallery should feel selectively expanded, not replaced wholesale.

## Responsive and Accessible Behavior

- Keep the desktop tab and mobile accordion behavior of the service board unchanged.
- Ensure the longer interior list remains readable without overflow or clipped content.
- Present quote checkboxes as a clear responsive group with visible focus states and comfortable touch targets.
- Ensure disabled checkbox options remain visually legible.
- Keep group instructions and errors available to screen readers.
- Preserve keyboard access to every portfolio image and the existing lightbox controls.
- Avoid horizontal overflow on `/`, `/portfolio`, and `/contact`.

## Testing

Use test-first changes for each behavior:

- Shared service data contains the exact nine interior inclusions.
- Exterior data contains `hydro sealer` and no longer contains `spray wax`.
- The quote form renders a checkbox for every service plus `Not sure yet`.
- The quote form requires at least one service.
- Customers can select two services.
- Remaining unchecked services disable at the two-selection limit.
- Unchecking one service re-enables the other choices.
- Interior photos are required when Interior Detailing is either selected service.
- Removing Interior Detailing clears the conditional photo requirement.
- The prepared email lists one or two selected services under `Services:`.
- New gallery items use local full-resolution and display paths.
- Portfolio buttons and lightbox navigation include the added items.

## Verification

Run the full automated test suite and production build. Then verify:

- `/` at mobile and desktop widths, including the exterior and interior service details
- `/portfolio` at mobile and desktop widths, including all added images and lightbox navigation
- `/contact` at mobile and desktop widths, including zero-, one-, two-, and attempted third-service selection states
- Interior-photo validation with Interior Detailing selected first and second
- No customer-facing `spray wax` text remains
- No broken images, console errors, clipped text, or horizontal overflow

## Non-goals

- No new service tiers or price changes beyond the approved $160 interior starting point
- No dedicated service or gallery routes
- No automatic quote submission backend
- No automatic photo upload or attachment transfer
- No Facebook embed, live social feed, or hotlinked CDN image
- No invented service claims, captions, testimonials, vehicle identities, or outcomes
- No broad visual redesign
