# Quote and Contact Conversion Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Paint Correction image and rebuild C&C's quote actions, closing quote chapter, and direct-contact band as one responsive editorial conversion system.

**Architecture:** Keep the existing React component boundaries and data flow. Update `ServiceBoard` for the approved image, enrich `SpecialistRail` into the shared contact-index primitive, add contact-band heading markup in `ContactPage`, and use shared CSS classes for all quote actions and responsive surfaces.

**Tech Stack:** React 19, React Router, TypeScript, CSS, Vitest, Testing Library

## Global Constraints

- Preserve all existing routes, business facts, prices, contact destinations, and quote-form behavior.
- Use no new dependencies.
- Keep the layout cardless, square-cornered, and limited to black, cream, warm gray, and the existing red signal.
- Keep all interactive targets keyboard accessible and at least 48 pixels tall.
- Verify 390, 734, 1024, and 1440-pixel layouts without horizontal overflow.

---

### Task 1: Paint Correction Photography

**Files:**
- Modify: `src/test/service-board.test.tsx`
- Modify: `src/components/ServiceBoard.tsx`
- Modify: `src/styles/home.css`

**Interfaces:**
- Consumes: existing `serviceImages` record keyed by `Service["id"]`
- Produces: Paint Correction image source `/images/cc-paint-after.jpg`

- [ ] **Step 1: Write the failing service image assertion**

After opening Paint Correction in the existing mobile service-board test, assert that the region image has the approved source and accessible name:

```tsx
const correctionImage = within(correctionRegion).getByRole("img", {
  name: "Blue corrected paint reflecting the shop lights",
});
expect(correctionImage).toHaveAttribute("src", "/images/cc-paint-after.jpg");
```

- [ ] **Step 2: Run the focused test and verify the expected failure**

Run: `npm test -- src/test/service-board.test.tsx`
Expected: FAIL because the current Paint Correction image is `/images/detail-process.jpg`.

- [ ] **Step 3: Update the image mapping and crop hook**

Change the `correction` entry to the approved source and alt text. Add `data-service-image={service.id}` to the image and use `[data-service-image="correction"]` for deliberate `object-position`.

- [ ] **Step 4: Run the focused test**

Run: `npm test -- src/test/service-board.test.tsx`
Expected: PASS.

### Task 2: Shared Contact Index

**Files:**
- Modify: `src/test/contact.test.tsx`
- Modify: `src/test/quote-cta.test.tsx`
- Modify: `src/components/SpecialistRail.tsx`
- Modify: `src/pages/ContactPage.tsx`
- Modify: `src/styles/layout.css`
- Modify: `src/styles/contact.css`

**Interfaces:**
- Consumes: `businessProfile.collin`, `businessProfile.email`, and `businessProfile.facebook`
- Produces: the existing `SpecialistRail` variants with labeled, responsive contact actions

- [ ] **Step 1: Write failing contact-index assertions**

Assert that `ContactPage` exposes the visible `Contact C&C Detailing` heading, the supporting factual line, and links for phone, email, and Facebook. In `quote-cta.test.tsx`, retain the phone-only assertion for the `phones` variant.

- [ ] **Step 2: Run the focused tests and verify the expected failure**

Run: `npm test -- src/test/contact.test.tsx src/test/quote-cta.test.tsx`
Expected: FAIL because the visible heading and labeled contact structure do not yet exist.

- [ ] **Step 3: Implement the contact-index markup**

Add the visible heading block to `ContactPage`. Restructure each `SpecialistRail` anchor with a channel label, identity/destination value, current icon, and directional affordance while preserving each `href`.

- [ ] **Step 4: Implement the responsive contact-index layout**

Use a warm full-width surface for `.contact-rail-band`. Stack ruled rows on mobile and create a three-column cardless strip on desktop. Theme the shared rail for both dark and print surfaces without rounded panels.

- [ ] **Step 5: Run the focused tests**

Run: `npm test -- src/test/contact.test.tsx src/test/quote-cta.test.tsx`
Expected: PASS.

### Task 3: Quote Actions and Closing Chapter

**Files:**
- Modify: `src/test/header.test.tsx`
- Modify: `src/test/home.test.tsx`
- Modify: `src/test/contact.test.tsx`
- Modify: `src/test/quote-cta.test.tsx`
- Modify: `src/components/SiteHeader.tsx`
- Modify: `src/components/QuoteCta.tsx`
- Modify: `src/components/ContactForm.tsx`
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/styles/global.css`
- Modify: `src/styles/home.css`
- Modify: `src/styles/layout.css`
- Modify: `src/styles/contact.css`

**Interfaces:**
- Consumes: existing `.button` and `.button--primary` foundations
- Produces: shared `.button--quote` structure for every action labeled `Get a quote`

- [ ] **Step 1: Write failing shared-action assertions**

Assert that each rendered `Get a quote` link or button includes `button--quote`. Cover the header, mobile menu, Home hero/closing section, and Contact form.

- [ ] **Step 2: Run the focused tests and verify the expected failure**

Run: `npm test -- src/test/header.test.tsx src/test/home.test.tsx src/test/contact.test.tsx src/test/quote-cta.test.tsx`
Expected: FAIL because the shared quote-action class is absent.

- [ ] **Step 3: Add the shared action hook**

Add `button--quote` alongside the existing button classes in `SiteHeader`, `HomePage`, `QuoteCta`, and `ContactForm`.

- [ ] **Step 4: Rebuild the button appearance**

Use a two-part grid/flex action with a generated directional terminal cell, contextual dark/cream colors, visible focus, and restrained hover/active transitions. Keep square corners and 48-pixel minimum height.

- [ ] **Step 5: Recompose the closing quote chapter**

Change `.quote-cta` to the warm print surface. Use a controlled responsive heading/action grid and a ruled phone row spanning below it. Remove the thick red border and reduce mobile dead space.

- [ ] **Step 6: Run the focused tests**

Run: `npm test -- src/test/header.test.tsx src/test/home.test.tsx src/test/contact.test.tsx src/test/quote-cta.test.tsx`
Expected: PASS.

### Task 4: Full Verification

**Files:**
- Verify only

**Interfaces:**
- Consumes: completed Tasks 1–3
- Produces: evidence that the redesign is safe across routes and viewports

- [ ] **Step 1: Run the complete test suite**

Run: `npm test`
Expected: all tests pass with zero failures.

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: TypeScript and Vite finish with exit code 0.

- [ ] **Step 3: Verify the live browser**

At 390, 734, 1024, and 1440 pixels, inspect:

- `/`: Paint Correction image, hero quote action, closing quote chapter
- `/portfolio`: closing quote chapter
- `/contact`: contact index, form submit action
- Header and mobile navigation quote actions
- Keyboard focus, readable destinations, image crops, console cleanliness, and horizontal overflow

- [ ] **Step 4: Review the final diff**

Run: `git diff --check && git diff --stat`
Expected: no whitespace errors and only the scoped component, style, test, and documentation files changed.
