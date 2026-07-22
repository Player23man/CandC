# Porsche Hero Image Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage hero's Camaro photograph with the existing Porsche Taycan hand-wash photograph and add a subtle desktop-only lower-left text vignette.

**Architecture:** Keep the existing `CampaignHero` API and change only the image configuration passed by `HomePage`. Lock the image contract in the existing homepage test, then verify the rendered crop at desktop and mobile breakpoints.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Testing Library, CSS

## Global Constraints

- Preserve the hero headline, description, calls to action, scrim, typography, and overall layout.
- Use only existing local Porsche assets; add no dependency and generate no replacement image.
- Use `/images/display/gallery-suv.jpg 1280w, /images/gallery-suv.jpg 1600w` for responsive delivery.
- Use the alternative text `Black Porsche Taycan receiving a careful hand wash`.
- Apply the vignette only from `min-width: 768px`; preserve the existing mobile scrim.
- Fade the vignette to transparent before the right side of the Porsche and do not introduce a panel edge.
- Verify at 1440 by 1000 and 390 by 844.

---

### Task 1: Swap and verify the homepage hero photograph

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Test: `src/test/home.test.tsx`

**Interfaces:**
- Consumes: `CampaignHero` and its existing `image` prop.
- Produces: A homepage hero image with Porsche source URLs, accurate alternative text, and high fetch priority.

- [ ] **Step 1: Write the failing test**

Add an assertion that finds the hero image by the accessible name `Black Porsche Taycan receiving a careful hand wash` and verifies:

```ts
expect(heroImage).toHaveAttribute("src", "/images/gallery-suv.jpg");
expect(heroImage).toHaveAttribute(
  "srcset",
  "/images/display/gallery-suv.jpg 1280w, /images/gallery-suv.jpg 1600w"
);
expect(heroImage).toHaveAttribute("fetchpriority", "high");
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/test/home.test.tsx`

Expected: FAIL because the current homepage exposes the Camaro image and alternative text.

- [ ] **Step 3: Implement the minimal image swap**

Set the `HomePage` hero image configuration to:

```tsx
image={{
  src: "/images/gallery-suv.jpg",
  srcSet: "/images/display/gallery-suv.jpg 1280w, /images/gallery-suv.jpg 1600w",
  sizes: "100vw",
  alt: "Black Porsche Taycan receiving a careful hand wash",
  fetchPriority: "high"
}}
```

- [ ] **Step 4: Run automated verification**

Run: `npm test -- src/test/home.test.tsx`

Expected: PASS.

Run: `npm test`

Expected: All test files pass.

Run: `npm run build`

Expected: TypeScript and Vite production build exit successfully.

- [ ] **Step 5: Verify the rendered hero**

Start the local Vite server and inspect `/` at 1440 by 1000 and 390 by 844. Confirm the Porsche and active hand-wash scene remain visible, the hero text and calls to action remain readable, no framework overlay appears, and the console contains no relevant warning or error.

- [ ] **Step 6: Review the final diff**

Run: `git diff --check`

Expected: No whitespace errors. Confirm source changes remain limited to `src/pages/HomePage.tsx`, `src/styles/layout.css`, `src/test/home.test.tsx`, and `src/test/campaign-system.test.tsx`, apart from this approved design and plan documentation.

### Task 2: Add the desktop-only text vignette

**Files:**
- Modify: `src/styles/layout.css`
- Test: `src/test/campaign-system.test.tsx`

**Interfaces:**
- Consumes: The existing `.campaign-hero--home .campaign-hero__scrim` overlay element.
- Produces: A lower-left desktop vignette beginning at 768 pixels while leaving the mobile scrim unchanged.

- [ ] **Step 1: Write the failing CSS contract test**

Render a `CampaignHero` with `layout="home"` and assert that its scrim has the modifier class `campaign-hero__scrim--home-vignette`. This modifier is the stable contract that scopes the desktop treatment to the home hero.

```css
radial-gradient(ellipse 72% 74% at 0% 100%, rgb(4 4 4 / 0.58) 0%, rgb(4 4 4 / 0.32) 42%, rgb(4 4 4 / 0.08) 70%, transparent 100%)
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/test/campaign-system.test.tsx`

Expected: FAIL because the desktop vignette contract is absent.

- [ ] **Step 3: Add the desktop vignette**

Add the `campaign-hero__scrim--home-vignette` modifier to the scrim only when `layout === "home"`, then add this desktop rule without changing the existing mobile/base scrim:

```css
@media (min-width: 768px) {
  .campaign-hero--home .campaign-hero__scrim--home-vignette {
    background: radial-gradient(ellipse 72% 74% at 0% 100%, rgb(4 4 4 / 0.58) 0%, rgb(4 4 4 / 0.32) 42%, rgb(4 4 4 / 0.08) 70%, transparent 100%);
  }
}
```

- [ ] **Step 4: Run automated verification**

Run: `npm test -- src/test/campaign-system.test.tsx`

Expected: PASS.

Run: `npm test`

Expected: All test files pass.

Run: `npm run build`

Expected: TypeScript and Vite production build exit successfully.

- [ ] **Step 5: Verify desktop and mobile rendering**

At 1440 by 1000, confirm that the lower-left copy has stronger contrast, the vignette edge is imperceptible, and the right side of the Porsche remains bright. At 390 by 844, confirm that the existing uniform scrim and crop are unchanged. Check the browser console for relevant warnings or errors.
