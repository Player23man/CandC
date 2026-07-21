# Home Editorial Service Index Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Home service chapter's horizontal tab strip with the approved Leica-led editorial service index while preserving every service fact, interaction, route, and responsive behavior.

**Architecture:** Keep `ServiceBoard` as the single stateful boundary and keep `services` in `site-data.ts` unchanged. Add presentational number and specification-row markup inside the existing desktop tab/mobile accordion branches, then use Home-scoped CSS to create a two-column desktop index and a one-at-a-time mobile accordion. Preserve the existing `matchMedia` branch selection so only one service image and one responsive interface exist in the DOM.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Testing Library, CSS, Phosphor Icons.

**Global constraints:** Work directly in the current checkout with no subagents. Use test-first changes, preserve all approved wording and pricing, keep the public `ServiceBoard()` interface unchanged, and scope the visual revision to `.service-board-section--print` and its descendants.

---

## Task 1: Define the editorial service-index contract in tests

**Files:**
- Modify: `src/test/service-board.test.tsx`

- [ ] **Step 1: Add a failing desktop numbering and specification-row test**

Add assertions to the initial desktop test so the service index exposes the complete `01–04` sequence and the active detail stage uses grouped specification rows rather than list items:

```tsx
expect(within(screen.getByRole("tablist", { name: "Detailing services" })).getByText("01")).toBeVisible();
expect(within(screen.getByRole("tablist", { name: "Detailing services" })).getByText("04")).toBeVisible();
expect(screen.getByRole("tabpanel").querySelectorAll(".service-board__spec-row").length).toBeGreaterThan(0);
expect(screen.getByRole("tabpanel").querySelector("ul")).toBeNull();
```

- [ ] **Step 2: Add a failing mobile row-anatomy assertion**

Extend the mobile accordion test to confirm the visible numbering and the selected service's specification rows remain inside the expanded region:

```tsx
const exteriorTrigger = mobile.getByRole("button", { name: /Exterior Detail/ });
const ceramicTrigger = mobile.getByRole("button", { name: /Ceramic Coating/ });
expect(exteriorTrigger).toHaveAttribute("aria-expanded", "true");
expect(within(exteriorTrigger).getByText("01")).toBeVisible();
expect(within(ceramicTrigger).getByText("04")).toBeVisible();
expect(within(mobile.getByRole("region", { name: "Paint Correction details" })).getByText("Wet sanding is an additional charge")).toBeVisible();
```

- [ ] **Step 3: Run the focused test and confirm the new contract fails**

Run:

```bash
npm test -- --run src/test/service-board.test.tsx
```

Expected: FAIL because the number labels and `.service-board__spec-row` markup do not exist yet.

- [ ] **Step 4: Commit the red contract**

```bash
git add src/test/service-board.test.tsx
git commit -m "test: define editorial service index"
```

## Task 2: Implement the numbered index and specification markup

**Files:**
- Modify: `src/components/ServiceBoard.tsx`
- Test: `src/test/service-board.test.tsx`

- [ ] **Step 1: Add a stable visible number formatter**

Keep the sequence derived from the existing `services` order:

```tsx
const serviceNumber = (index: number) => String(index + 1).padStart(2, "0");
```

- [ ] **Step 2: Convert list content into editorial specification groups**

Replace the two `ul` blocks in `ServiceDetails` with labeled groups and one thin row per preserved string:

```tsx
<div className="service-board__specs">
  <div className="service-board__spec-group">
    <p className="service-board__spec-title">Included in service</p>
    <div className="service-board__spec-list">
      {service.details.map((detail) => (
        <p className="service-board__spec-row" key={detail}>{detail}</p>
      ))}
    </div>
  </div>
  {service.priceNotes && (
    <div className="service-board__spec-group">
      <p className="service-board__spec-title">Pricing &amp; options</p>
      <div className="service-board__spec-list">
        {service.priceNotes.map((note) => (
          <p className="service-board__spec-row" key={note}>{note}</p>
        ))}
      </div>
    </div>
  )}
</div>
```

- [ ] **Step 3: Add numbered desktop controls**

Inside each existing desktop tab, keep the service name and price but make the row anatomy explicit:

```tsx
<span className="service-board__tab-number" aria-hidden="true">{serviceNumber(index)}</span>
<span className="service-board__tab-name">{service.name}</span>
<small>{service.price}</small>
```

The number is decorative for screen readers because the service name remains the control's accessible name.

- [ ] **Step 4: Add numbered mobile accordion triggers**

Accept the existing `index` from `services.map` and render the number before the service-name/price stack:

```tsx
<span className="service-board__mobile-number" aria-hidden="true">{serviceNumber(index)}</span>
<span className="service-board__mobile-label">
  <strong>{service.name}</strong>
  <small>{service.price}</small>
</span>
```

Keep the existing `aria-expanded`, `aria-controls`, active selection state, and one-panel rendering unchanged.

- [ ] **Step 5: Run the focused tests to green**

Run:

```bash
npm test -- --run src/test/service-board.test.tsx
```

Expected: PASS with four desktop tabs, one tabpanel, four mobile triggers, one mobile region, one active image, and preserved keyboard behavior.

- [ ] **Step 6: Commit the semantic structure**

```bash
git add src/components/ServiceBoard.tsx
git commit -m "feat: add editorial service index structure"
```

## Task 3: Recompose the Home service chapter as an editorial index

**Files:**
- Modify: `src/styles/home.css`
- Test: `src/test/service-board.test.tsx`

- [ ] **Step 1: Replace legacy list styles with specification rows**

Remove `.service-board__lists`, `.service-board__list-title`, and bullet pseudo-element rules. Add warm-white editorial rows:

```css
.service-board__specs {
  display: grid;
  gap: 34px;
}

.service-board__spec-title {
  margin: 0 0 10px;
  font-size: 0.72rem;
  font-weight: 720;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.service-board__spec-list {
  border-top: 1px solid #bdb7ad;
}

.service-board__spec-row {
  margin: 0;
  border-bottom: 1px solid #d2ccc2;
  padding: 11px 0;
  color: #625d56;
  font-size: 0.9rem;
  line-height: 1.4;
}
```

- [ ] **Step 2: Build the desktop two-column stage at 768px and above**

Change `.service-board__desktop` into an asymmetrical grid and turn `.service-board__tabs` into a vertical index:

```css
.service-board__desktop {
  display: grid;
  grid-template-columns: minmax(270px, 0.72fr) minmax(0, 1.55fr);
  border-bottom: 1px solid var(--line);
}

.service-board__tabs {
  display: block;
  border-right: 1px solid var(--line);
}
```

Each tab becomes a three-part editorial row. Use only rules and typography: no filled state, rounded shape, shadow, outline box, or background change. The active state uses one red left rule and black type; hover/focus remain obvious without changing layout.

- [ ] **Step 3: Make the selected-service stage image-led**

Keep the overview above the image, make the image the dominant middle element, and place the specification groups beneath it at tablet widths. At wide desktop, retain a large image/spec split only if the detail copy remains comfortably readable and the total stage aligns with the left index. Remove the generic `Selected service` label from visual prominence or render it as restrained metadata without adding chrome.

- [ ] **Step 4: Refine the mobile accordion anatomy**

Use a three-column trigger grid for number, label, and caret. Add a single red rule or number treatment for the active row, keep thin warm-gray separators, maintain a minimum 82px touch target, and ensure the expanded image/specifications sit directly beneath the selected trigger with no card wrapper.

- [ ] **Step 5: Preserve the warm-white print palette**

Update `.service-board-section--print` selectors for the new spec classes. Keep `var(--print)` as the uninterrupted chapter background, `var(--print-text)` for primary type, `#625d56` for supporting text, `#bdb7ad`/`#d2ccc2` for rules, and `var(--signal)` as the sole active accent.

- [ ] **Step 6: Run focused and full automated verification**

Run:

```bash
npm test -- --run src/test/service-board.test.tsx
npm test -- --run
npm run build
```

Expected: all ServiceBoard tests pass, the full suite passes, and Vite produces a successful production build.

- [ ] **Step 7: Commit the visual rework**

```bash
git add src/styles/home.css
git commit -m "feat: redesign services as editorial index"
```

## Task 4: Rendered browser QA and final verification

**Files:**
- Verify: `src/components/ServiceBoard.tsx`
- Verify: `src/styles/home.css`
- Verify: `src/test/service-board.test.tsx`

- [ ] **Step 1: Start the local preview**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

- [ ] **Step 2: Inspect the required viewport matrix**

Verify Home at `390x844`, `768x900`, `1024x900`, and `1440x1000`:

- no horizontal overflow;
- the complete `01–04` index is visible;
- exactly one active service image and one active detail stage render;
- the desktop composition reads as an index plus image-led stage, not a row of tabs;
- mobile reads as a clean one-at-a-time accordion;
- the warm-white surface remains continuous through the chapter;
- the quote link after the board is visible and unchanged.

- [ ] **Step 3: Exercise interaction and accessibility in the browser**

Verify pointer selection for all four services. On desktop, verify Arrow Right/Down, Arrow Left/Up, Home, End, focus placement, visible focus, `aria-selected`, and the matching tabpanel label. On mobile, verify `aria-expanded`, matching controlled region, and that Paint Correction exposes `Wet sanding is an additional charge`.

- [ ] **Step 4: Capture QA evidence outside the repository**

Save representative desktop and mobile screenshots under `/tmp/candc-editorial-services-qa/` so no generated artifacts enter version control.

- [ ] **Step 5: Run final clean-room checks**

Run:

```bash
npm test -- --run
npm run build
git diff --check
git status --short
```

Expected: all tests and build pass, no whitespace errors exist, and only intentional files are changed or committed.

- [ ] **Step 6: Review the implementation against the approved spec**

Confirm that all service names, descriptions, inclusions, prices, price notes, `/contact` destination, and `Ask about your vehicle` label are unchanged. Search the touched files for `TODO`, `TBD`, and placeholder copy. Confirm the hero, portfolio preview, review, quote close, Portfolio page, and Contact page were not modified.
