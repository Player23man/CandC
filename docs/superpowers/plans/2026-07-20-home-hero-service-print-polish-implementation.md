# Home Hero and Service Print Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the Home opening into a restrained full-bleed photographic campaign and move the immediately following service selector onto the existing warm-white print surface.

**Architecture:** Keep the shared `CampaignHero` and `ServiceBoard` component interfaces intact. Add one Home-only modifier hook for the print service chapter, then implement the art direction entirely through scoped Home and campaign CSS so Portfolio and Contact remain unchanged.

**Tech Stack:** React 19, TypeScript, React Router, CSS, Vitest, Testing Library, Vite

## Global Constraints

- Preserve all existing factual copy, prices, routes, service data, and interactions.
- Do not add dependencies, gradients, rounded cards, badges, invented proof, or new business claims.
- Keep one rendered service branch and one active service image at each responsive mode.
- Preserve semantic headings, tab/tabpanel behavior, accordion state, keyboard navigation, visible focus, and all link destinations.
- Scope this revision to the Home hero and the immediately following service chapter.

---

### Task 1: Add the Home print-chapter contract

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/test/home.test.tsx`

**Interfaces:**
- Consumes: `HomePage(): JSX.Element`, `CampaignHero`, and `ServiceBoard`.
- Produces: a `.service-board-section--print` Home-only styling hook without changing component props or public behavior.

- [ ] **Step 1: Write the failing composition assertion**

Add this assertion to the Home composition test:

```tsx
expect(document.querySelector(".service-board-section--print")).toBeInTheDocument();
```

Keep the existing assertions for the Home campaign hero, service headings and prices, review attribution, and quote actions.

- [ ] **Step 2: Run the focused test and confirm failure**

Run: `npm test -- src/test/home.test.tsx`

Expected: FAIL because the service section does not yet have the print modifier.

- [ ] **Step 3: Add the scoped modifier**

Change the service section opening tag to:

```tsx
<section className="service-board-section service-board-section--print" aria-labelledby="service-board-title">
```

Do not change its copy, service board, or contact link.

- [ ] **Step 4: Run the focused test**

Run: `npm test -- src/test/home.test.tsx`

Expected: all Home tests pass.

- [ ] **Step 5: Commit the contract**

```bash
git add src/pages/HomePage.tsx src/test/home.test.tsx
git commit -m "test: define home print service chapter"
```

---

### Task 2: Implement the minimal photographic hero and print service system

**Files:**
- Modify: `src/styles/layout.css`
- Modify: `src/styles/home.css`

**Interfaces:**
- Consumes: `.campaign-hero--home`, `.service-board-section--print`, and the existing service-board class structure.
- Produces: Home-only hero art direction and a warm-white service selector across desktop and mobile.

- [ ] **Step 1: Replace the Home hero treatment**

In `layout.css`, keep the shared campaign defaults for Portfolio and Contact, then override Home with:

```css
.campaign-hero--home {
  min-height: min(940px, 96dvh);
}

.campaign-hero--home .campaign-hero__image {
  object-position: 64% center;
}

.campaign-hero--home .campaign-hero__scrim {
  background: rgb(4 4 4 / 0.18);
}

.campaign-hero--home .campaign-hero__content {
  padding-block: 0 clamp(54px, 6vw, 86px);
}

.campaign-hero--home h1 {
  max-width: 7ch;
  margin-bottom: 20px;
  font-size: clamp(3.25rem, 6.2vw, 5.9rem);
  letter-spacing: -0.065em;
  line-height: 0.9;
}

.campaign-hero--home p {
  max-width: 540px;
  color: #ddd9d2;
  font-size: clamp(1rem, 1.35vw, 1.16rem);
}

.campaign-hero--home .campaign-hero__actions {
  margin-top: 28px;
}
```

At widths below 540 pixels, use `min-height: min(760px, 90dvh)`, an image position around `68% center`, and a localized readable composition with the same actions visible in the first viewport. Do not introduce a gradient or content card.

- [ ] **Step 2: Move the service chapter onto the print surface**

In `home.css`, scope the light material to `.service-board-section--print` and restyle every inherited dark token used by the selector:

```css
.service-board-section--print {
  border-color: #bdb7ad;
  background: var(--print);
  color: var(--print-text);
}

.service-board-section--print .service-board,
.service-board-section--print .service-board__mobile-item,
.service-board-section--print .service-board__desktop,
.service-board-section--print .service-board__tabs {
  border-color: #bdb7ad;
}

.service-board-section--print .service-board-section__heading p,
.service-board-section--print .service-board__description,
.service-board-section--print .service-board__selected,
.service-board-section--print .service-board__lists ul {
  color: #625d56;
}

.service-board-section--print .service-board__mobile-trigger,
.service-board-section--print .service-board__overview h3,
.service-board-section--print .service-board__list-title,
.service-board-section--print .text-link {
  color: var(--print-text);
}

.service-board-section--print .service-board__tab {
  border-color: #bdb7ad;
  color: #625d56;
}

.service-board-section--print .service-board__tab:hover,
.service-board-section--print .service-board__tab[data-active="true"] {
  background: rgb(16 16 16 / 0.045);
  color: var(--print-text);
}

.service-board-section--print .service-board__panel {
  background: transparent;
}
```

Also restyle image placeholders and mobile icons for adequate contrast. Keep red as the active rule, price, bullet, and focus signal.

- [ ] **Step 3: Run focused tests and build**

Run: `npm test -- src/test/home.test.tsx src/test/service-board.test.tsx && npm run build && git diff --check`

Expected: all focused tests pass, Vite builds successfully, and no whitespace errors are reported.

- [ ] **Step 4: Verify the rendered Home route**

Run the local Vite server and inspect `/` at 390x844, 768x900, 1024x900, and 1440x1000. Confirm:

- The hero photograph is visibly brighter than the previous pass.
- The headline is smaller, readable, and precisely placed without a content card or gradient.
- Both hero actions remain visible and usable.
- The service chapter is warm white from edge to edge.
- Desktop tabs and the mobile accordion retain one active service, one image, real prices, and keyboard behavior.
- There is no horizontal overflow, header collision, framework overlay, or relevant console warning.

- [ ] **Step 5: Run full verification**

Run:

```bash
npm test
npm run build
git diff --check
git status --short --branch
```

Expected: 23 or more tests pass, the production build succeeds, whitespace is clean, and only the planned style implementation files are modified.

- [ ] **Step 6: Commit the implementation**

```bash
git add src/styles/layout.css src/styles/home.css
git commit -m "feat: polish home opening with print services"
```
