# C&C Portfolio Photo Stacking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace arbitrary photo offsets with explicit paired rows on the portfolio page and a top-and-bottom-aligned supporting column on the homepage.

**Architecture:** Preserve the current photo arrays and their order. Add explicit two-item row wrappers in `PortfolioPage.tsx` so CSS can apply a predictable 7/5, 5/7, 7/5 rhythm; keep the existing homepage markup and make its right column match the comparison height through CSS grid rows.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Testing Library, CSS, Playwright CLI

## Global Constraints

- Preserve the current photos and their order.
- Preserve the before/after slider, finished-work lightbox, copy, routes, and image assets.
- Use 7/5, 5/7, and 7/5 desktop row proportions.
- Both items in every desktop portfolio row share the same top edge.
- The homepage uses an 8/4 desktop split, with supporting images aligned to the comparison’s top and bottom edges.
- Mobile uses one column with consistent gaps and no staggered offsets.
- Add no dependencies, captions, masonry behavior, or independent item margins.

---

## File Map

- `src/pages/PortfolioPage.tsx`: group the existing transformation and finished-work arrays into explicit two-item rows
- `src/styles/portfolio.css`: style the three portfolio rows and remove item-specific positioning
- `src/styles/home.css`: align the two supporting images to the comparison’s top and bottom
- `src/test/portfolio.test.tsx`: protect the three-row, two-items-per-row structure
- `src/test/home.test.tsx`: protect the homepage comparison-plus-two-supporting-images structure

---

### Task 1: Make the Portfolio Rows Explicit

**Files:**
- Modify: `src/pages/PortfolioPage.tsx`
- Modify: `src/test/portfolio.test.tsx`
- Modify: `src/styles/portfolio.css`

**Interfaces:**
- Consumes: `transformationPairs: TransformationPair[]` and `finishedWorkItems: GalleryItem[]`
- Produces: three `.transformation-row` elements and three `.finished-work__row` elements, each containing two existing items

- [ ] **Step 1: Write the failing row-structure test**

Add this assertion to the existing portfolio render test in
`src/test/portfolio.test.tsx`:

```tsx
const transformationRows = document.querySelectorAll(".transformation-row");
expect(transformationRows).toHaveLength(3);
for (const row of transformationRows) {
  expect(row.querySelectorAll(".transformation-list__item")).toHaveLength(2);
}

const finishedRows = document.querySelectorAll(".finished-work__row");
expect(finishedRows).toHaveLength(3);
for (const row of finishedRows) {
  expect(row.querySelectorAll(".finished-work__item")).toHaveLength(2);
}
```

This test catches a return to independent auto-positioned items, which is the
layout regression being fixed.

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
npm test -- src/test/portfolio.test.tsx
```

Expected: FAIL because `.transformation-row` and `.finished-work__row` do not
exist.

- [ ] **Step 3: Add a local pair helper and explicit transformation rows**

Add this helper above `PortfolioPage` in `src/pages/PortfolioPage.tsx`:

```tsx
function pairItems<T>(items: T[]) {
  return Array.from(
    { length: Math.ceil(items.length / 2) },
    (_, rowIndex) => items.slice(rowIndex * 2, rowIndex * 2 + 2),
  );
}
```

Replace the direct `transformationPairs.map` block with:

```tsx
{pairItems(transformationPairs).map((row, rowIndex) => (
  <div
    className={`transformation-row transformation-row--${
      rowIndex === 1 ? "wide-right" : "wide-left"
    }`}
    key={row[0].id}
  >
    {row.map((pair, itemIndex) => (
      <Reveal className="transformation-list__item" key={pair.id}>
        <BeforeAfterSlider
          pair={pair}
          priority={rowIndex === 0 && itemIndex === 0}
        />
      </Reveal>
    ))}
  </div>
))}
```

The helper preserves the existing array order and creates rows `[0,1]`,
`[2,3]`, and `[4,5]`.

- [ ] **Step 4: Add explicit finished-work rows**

Replace the direct `finishedWorkItems.map` block with:

```tsx
{pairItems(finishedWorkItems).map((row, rowIndex) => (
  <div
    className={`finished-work__row finished-work__row--${
      rowIndex === 1 ? "wide-right" : "wide-left"
    }`}
    key={row[0].src}
  >
    {row.map((item) => {
      const itemIndex = finishedWorkItems.indexOf(item);

      return (
        <Reveal
          className={`finished-work__item ${item.className ?? ""}`.trim()}
          delay={(itemIndex % 2) * 0.06}
          key={item.src}
        >
          <button
            type="button"
            aria-label={item.openLabel}
            onClick={() => setActiveIndex(itemIndex)}
          >
            <img src={item.displaySrc} alt={item.alt} loading="lazy" />
          </button>
        </Reveal>
      );
    })}
  </div>
))}
```

`itemIndex` remains the index in `finishedWorkItems`, so lightbox navigation
keeps the current order.

- [ ] **Step 5: Replace independent-item CSS with row CSS**

In `src/styles/portfolio.css`, replace the transformation positioning rules
with:

```css
.transformation-list {
  display: grid;
  gap: clamp(78px, 8vw, 120px);
}

.transformation-row {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  align-items: start;
  gap: clamp(28px, 4vw, 64px);
}

.transformation-row--wide-right {
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
}

.transformation-list__item {
  width: 100%;
  max-width: none;
  margin: 0;
}
```

Remove all `.transformation-list__item:nth-child(...)` grid-column, max-width,
and margin rules.

Replace the finished-work positioning rules with:

```css
.finished-work__grid {
  display: grid;
  gap: clamp(42px, 7vw, 104px);
}

.finished-work__row {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  align-items: start;
  gap: clamp(18px, 3vw, 44px);
}

.finished-work__row--wide-right {
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
}

.finished-work__item,
.finished-work__item--wide,
.finished-work__item--tall {
  width: 100%;
  margin: 0;
}
```

Remove all `.finished-work__item:nth-child(...)` grid-column and margin rules.
Keep the existing image aspect-ratio classes.

In the existing mobile media query, replace portfolio grid overrides with:

```css
.transformation-row,
.transformation-row--wide-right,
.finished-work__row,
.finished-work__row--wide-right {
  grid-template-columns: 1fr;
}

.transformation-row {
  gap: 28px;
}

.finished-work__row {
  gap: 24px;
}
```

Keep the parent row gaps and remove obsolete child grid-column overrides.

- [ ] **Step 6: Run portfolio tests and verify GREEN**

Run:

```bash
npm test -- src/test/portfolio.test.tsx src/test/before-after-slider.test.tsx
```

Expected: PASS.

- [ ] **Step 7: Commit the portfolio row slice**

```bash
git add src/pages/PortfolioPage.tsx src/styles/portfolio.css src/test/portfolio.test.tsx
git commit -m "fix: structure portfolio photos into paired rows"
```

---

### Task 2: Align the Homepage Proof Stack

**Files:**
- Modify: `src/styles/home.css`
- Modify: `src/test/home.test.tsx`

**Interfaces:**
- Consumes: the existing `.home-proof`, `.home-proof__comparison`, `.home-proof__supporting`, and two `.home-proof__still` elements
- Produces: an 8/4 desktop grid whose supporting column matches the comparison height

- [ ] **Step 1: Strengthen the homepage structure test**

Add these assertions to the existing caption-free homepage proof test:

```tsx
const proof = container.querySelector(".home-proof");
const supporting = container.querySelector(".home-proof__supporting");

expect(proof?.querySelectorAll(".home-proof__comparison")).toHaveLength(1);
expect(supporting?.querySelectorAll(".home-proof__still")).toHaveLength(2);
```

This protects the one-dominant-plus-two-supporting composition required by the
layout.

- [ ] **Step 2: Run the focused homepage test**

Run:

```bash
npm test -- src/test/home.test.tsx
```

Expected: PASS because the required semantic structure already exists. This is
a characterization test for the markup that the CSS depends on.

- [ ] **Step 3: Implement the aligned desktop stack**

In the desktop media query in `src/styles/home.css`, replace the current
homepage proof layout rules with:

```css
.home-proof {
  grid-template-columns: minmax(0, 8fr) minmax(260px, 4fr);
  align-items: stretch;
  gap: clamp(30px, 4vw, 64px);
}

.home-proof__comparison,
.home-proof__comparison .before-after {
  height: 100%;
}

.home-proof__comparison .before-after {
  min-height: 0;
  aspect-ratio: 16 / 10;
}

.home-proof__supporting {
  grid-template-rows: repeat(2, minmax(0, 1fr));
  height: 100%;
  padding-top: 0;
}

.home-proof__still,
.home-proof__still img {
  height: 100%;
}

.home-proof__still img {
  aspect-ratio: auto;
}

.home-proof__still--2 {
  margin-left: 0;
}
```

Keep the existing one-column base rules for mobile.

- [ ] **Step 4: Run homepage and portfolio tests**

Run:

```bash
npm test -- src/test/home.test.tsx src/test/portfolio.test.tsx src/test/before-after-slider.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit the homepage stack**

```bash
git add src/styles/home.css src/test/home.test.tsx
git commit -m "fix: align homepage portfolio photo stack"
```

---

### Task 3: Verify Rendered Alignment

**Files:**
- Modify only if verification identifies an in-scope defect

**Interfaces:**
- Consumes: the completed homepage and portfolio row layouts
- Produces: verified desktop and mobile alignment

- [ ] **Step 1: Run the complete automated suite**

```bash
npm test
npm run build
```

Expected: all Vitest tests pass and the Vite production build exits zero.

- [ ] **Step 2: Start and confirm the local site**

```bash
npm run dev -- --host 127.0.0.1
```

Use the actual URL printed by Vite and confirm both `/` and `/portfolio`
respond before browser QA.

- [ ] **Step 3: Verify desktop geometry at 1440 pixels**

Use Playwright CLI to inspect the homepage and portfolio. Confirm:

- The homepage comparison top equals the first supporting image top within one
  pixel.
- The homepage comparison bottom equals the second supporting image bottom
  within one pixel.
- Every `.transformation-row` has two children whose top coordinates differ by
  no more than one pixel.
- Every `.finished-work__row` has two children whose top coordinates differ by
  no more than one pixel.
- No element creates horizontal overflow.

- [ ] **Step 4: Verify mobile geometry at 390 pixels**

Confirm:

- Every row becomes one column.
- All photo gaps are consistent within their section.
- Slider labels and handles remain visible.
- There is no horizontal overflow.

- [ ] **Step 5: Verify interactions and captions**

Confirm:

- A comparison responds to mouse input plus Arrow, Home, and End keys.
- The finished-work lightbox opens, advances, reverses, and closes.
- No visible captions render beneath homepage or portfolio images.
- The browser console contains no errors.

- [ ] **Step 6: Inspect the final repository state**

```bash
git diff --check
git status --short --branch
git log -6 --oneline
```

Expected: no whitespace errors and only intentional work remains.

- [ ] **Step 7: Commit verification corrections only if needed**

If rendered QA requires corrections, stage only the affected files listed by
`git status --short` and commit them with:

```bash
git commit -m "fix: polish portfolio photo row alignment"
```

Do not create an empty commit.
