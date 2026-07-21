# C&C Homepage Section Recomposition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic homepage service, work-includes, review, and CTA blocks with one interactive service board, an attributed customer review, and a restrained dark contact dock.

**Architecture:** Keep service and contact facts in `src/app/site-data.ts`. Add one focused `ServiceBoard` component with local selection state and responsive tab/accordion markup. Recompose `HomePage` around that component, and revise the shared `QuoteCta` markup and styles without changing its public facts or route behavior.

**Tech Stack:** React 19, TypeScript, React Router, Motion, Phosphor Icons, native CSS, Vitest, Testing Library, Playwright

## Global Constraints

- Execute inline with no subagents.
- Work directly on `main`, as previously approved by the user.
- Preserve all public service prices, price notes, phone numbers, routes, and appointment notes.
- Do not invent a reviewer name, rating, date, or review platform.
- Use `Verified customer review` and `2022 Tucson owner` as the attribution.
- Remove the standalone `What the work includes` section and consolidate its information into the service board.
- Use no service cards, three-column feature grid, full-width red CTA background, gradients, glass, pills, section numbers, or decorative copy.
- Preserve keyboard access, focus visibility, reduced-motion behavior, and mobile readability.

---

### Task 1: Build the interactive service board

**Files:**
- Create: `src/components/ServiceBoard.tsx`
- Create: `src/test/service-board.test.tsx`
- Modify: `src/styles/home.css`

**Interfaces:**
- Consumes: `services: Service[]` from `src/app/site-data.ts`.
- Produces: `ServiceBoard(): JSX.Element` with desktop ARIA tabs and mobile accordion controls.
- Produces: `serviceImages: Record<Service["id"], { src: string; alt: string }>` inside the component module.

- [ ] **Step 1: Write the failing initial-state and selection tests**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ServiceBoard } from "../components/ServiceBoard";

describe("ServiceBoard", () => {
  it("shows Exterior Detail initially and switches to Ceramic Coating", async () => {
    const user = userEvent.setup();
    render(<ServiceBoard />);

    expect(screen.getByRole("tab", { name: /Exterior Detail/ })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Hand wax +$50");

    await user.click(screen.getByRole("tab", { name: /Ceramic Coating/ }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Large SUV, van, or truck $1,100");
  });
});
```

- [ ] **Step 2: Run the test and confirm the missing-component failure**

Run: `npm test -- src/test/service-board.test.tsx`

Expected: FAIL because `src/components/ServiceBoard.tsx` does not exist.

- [ ] **Step 3: Implement the data-driven desktop tabs and mobile accordion**

Implement `ServiceBoard` with:

```tsx
const serviceImages: Record<Service["id"], { src: string; alt: string }> = {
  exterior: { src: "/images/detail-exterior.jpg", alt: "Vehicle receiving a careful hand wash" },
  interior: { src: "/images/gallery-suv.jpg", alt: "Vehicle exterior during a careful hand wash" },
  correction: { src: "/images/detail-process.jpg", alt: "White performance car under studio lighting" },
  ceramic: { src: "/images/ceramic-display.jpg", alt: "Ceramic coating display on a detailed red vehicle" }
};
```

Use one `activeId` state initialized to `"exterior"`. Desktop tabs use `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, and `role="tabpanel"`. Arrow keys wrap through the four services; Home and End select the first and last services. Mobile buttons use `aria-expanded` and the same state, rendering the active service details immediately below the active button.

Render active service data from `description`, `details`, `price`, and `priceNotes`. Do not copy service strings into the component.

- [ ] **Step 4: Add the keyboard test**

```tsx
it("moves between services with arrow keys", async () => {
  const user = userEvent.setup();
  render(<ServiceBoard />);
  const exterior = screen.getByRole("tab", { name: /Exterior Detail/ });
  exterior.focus();

  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("tab", { name: /Interior Restoration/ })).toHaveFocus();
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Full interior restoration $225+");
});
```

- [ ] **Step 5: Add the mobile accordion semantics test**

Render the mobile controls in the DOM with the `.service-board__mobile` class and verify:

```tsx
expect(screen.getByRole("button", { name: /Exterior Detail/ })).toHaveAttribute("aria-expanded", "true");
await user.click(screen.getByRole("button", { name: /Paint Correction/ }));
expect(screen.getByRole("button", { name: /Paint Correction/ })).toHaveAttribute("aria-expanded", "true");
expect(screen.getByText("Wet sanding is an additional charge")).toBeVisible();
```

- [ ] **Step 6: Run the focused and full tests**

Run: `npm test -- src/test/service-board.test.tsx && npm test`

Expected: all service-board tests and the existing suite pass.

- [ ] **Step 7: Commit**

```bash
git add src/components/ServiceBoard.tsx src/test/service-board.test.tsx
git commit -m "feat: add interactive service board"
```

---

### Task 2: Recompose the homepage service and review sequence

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/styles/home.css`
- Modify: `src/test/home.test.tsx`

**Interfaces:**
- Consumes: `ServiceBoard` from Task 1 and `testimonial` from `src/app/site-data.ts`.
- Produces: one homepage service section and one attributed review section.

- [ ] **Step 1: Write the failing homepage composition test**

Add assertions that the new heading and attribution render while the old headings are absent:

```tsx
expect(screen.getByRole("heading", { name: "Choose the work your vehicle needs." })).toBeVisible();
expect(screen.queryByRole("heading", { name: "Built around what your vehicle needs." })).not.toBeInTheDocument();
expect(screen.queryByRole("heading", { name: "What the work includes." })).not.toBeInTheDocument();
expect(screen.getByText("Verified customer review")).toBeVisible();
expect(screen.getByText("2022 Tucson owner")).toBeVisible();
```

- [ ] **Step 2: Run the focused test and confirm the old composition fails it**

Run: `npm test -- src/test/home.test.tsx`

Expected: FAIL because the new heading and attribution do not exist and the old headings still render.

- [ ] **Step 3: Replace the two old sections with `ServiceBoard`**

Remove `ServiceRow`, `inclusionGroups`, `workIncludes`, `.home-services`, and `.work-includes` markup from `HomePage.tsx`. Insert:

```tsx
<section className="service-board-section" aria-labelledby="service-board-title">
  <div className="shell">
    <header className="service-board-section__heading">
      <h2 id="service-board-title">Choose the work your vehicle needs.</h2>
      <p>Compare starting prices, included work, and package options.</p>
    </header>
    <ServiceBoard />
    <Link className="text-link" to="/contact">Ask about your vehicle <ArrowRight ... /></Link>
  </div>
</section>
```

- [ ] **Step 4: Replace the anonymous testimonial block**

Render the exact excerpt:

```tsx
<blockquote>
  I felt like I drove away in a brand-new car. His work is meticulous; every crevice of car cleaned to perfection!
</blockquote>
<p className="testimonial__source">
  <strong>Verified customer review</strong>
  <span>2022 Tucson owner</span>
</p>
```

Do not add a name, star row, date, or platform.

- [ ] **Step 5: Replace the old CSS blocks with the approved editorial layouts**

Create `.service-board-section`, `.service-board`, `.service-board__tabs`, `.service-board__panel`, `.service-board__mobile`, and `.testimonial__source` styles. Desktop uses an unequal two-column service layout. Mobile hides the tab interface and displays the accordion. Use square edges, the existing line and signal tokens, and no filled service cards.

- [ ] **Step 6: Run tests and build**

Run: `npm test -- src/test/home.test.tsx src/test/service-board.test.tsx && npm run build`

Expected: focused tests pass and Vite produces a successful production build.

- [ ] **Step 7: Commit**

```bash
git add src/pages/HomePage.tsx src/styles/home.css src/test/home.test.tsx
git commit -m "feat: recompose homepage services and review"
```

---

### Task 3: Redesign the shared quote section as a dark contact dock

**Files:**
- Modify: `src/components/QuoteCta.tsx`
- Modify: `src/styles/home.css`
- Create: `src/test/quote-cta.test.tsx`

**Interfaces:**
- Consumes: `businessProfile` from `src/app/site-data.ts`.
- Produces: `QuoteCta` with the same no-props interface and unchanged links.

- [ ] **Step 1: Write the failing contact-dock structure test**

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { QuoteCta } from "../components/QuoteCta";

it("renders the dark contact dock with both specialists", () => {
  render(<MemoryRouter><QuoteCta /></MemoryRouter>);
  expect(screen.getByRole("heading", { name: "Tell us what your vehicle needs." })).toBeVisible();
  expect(screen.getByText("Exterior specialist")).toBeVisible();
  expect(screen.getByText("Interior specialist")).toBeVisible();
  expect(screen.getByRole("link", { name: "Get a quote" })).toHaveAttribute("href", "/contact");
  expect(screen.getByRole("link", { name: /Collin.*815-922-1593/ })).toHaveAttribute("href", "tel:8159221593");
});
```

- [ ] **Step 2: Run the test and confirm the missing-role failure**

Run: `npm test -- src/test/quote-cta.test.tsx`

Expected: FAIL because the current CTA does not render specialist roles.

- [ ] **Step 3: Implement the dock markup**

Keep the heading, quote link, appointment note, and both phone links. Group the quote action separately from two `.quote-cta__specialist` rows. Each row includes name, role, phone number, and one Phosphor phone icon.

- [ ] **Step 4: Replace the red slab styles**

Set `.quote-cta` to `background: var(--canvas)` with a strong top border. Use an unequal desktop grid for heading, action, and contacts. Signal red appears only on the quote button, focus states, and restrained hover accents. Stack all controls on mobile with 44-pixel minimum targets.

- [ ] **Step 5: Run focused tests, full tests, and build**

Run: `npm test -- src/test/quote-cta.test.tsx && npm test && npm run build`

Expected: all tests pass and the production build succeeds.

- [ ] **Step 6: Commit**

```bash
git add src/components/QuoteCta.tsx src/styles/home.css src/test/quote-cta.test.tsx
git commit -m "feat: redesign quote section as contact dock"
```

---

### Task 4: Rendered QA and final verification

**Files:**
- Modify only if a test or rendered defect requires a focused correction.

**Interfaces:**
- Consumes the completed homepage and existing application shell.
- Produces verified desktop and mobile behavior with screenshot evidence outside the repository.

- [ ] **Step 1: Run fresh automated verification**

Run: `npm test && npm run build && git diff --check`

Expected: 0 failed tests, successful Vite build, and no whitespace errors.

- [ ] **Step 2: Start the local dev server**

Run: `npm run dev -- --host 127.0.0.1 --port 4174`

Expected: Vite serves the homepage at `http://127.0.0.1:4174/`.

- [ ] **Step 3: Verify responsive layout with Playwright**

Inspect the homepage at 390x844, 768x900, 1024x900, and 1440x1000. Verify no horizontal overflow, readable service details, correct active state, attributed review, dark contact dock, and zero browser console warnings or errors.

- [ ] **Step 4: Verify interactions in a real browser**

Use the desktop tab controls with mouse and Arrow keys. Use the 390-pixel accordion controls and confirm one service is expanded at a time. Confirm the quote action routes to `/contact` and phone links retain the correct `tel:` values.

- [ ] **Step 5: Capture final screenshots outside the repository**

Save desktop and mobile homepage screenshots under `/tmp/candc-home-revision/`.

- [ ] **Step 6: Re-run production Lighthouse**

Run Lighthouse against a production preview and record Performance, Accessibility, Best Practices, and SEO. Accessibility, Best Practices, and SEO must remain at 100; investigate any regression before completion.

- [ ] **Step 7: Final repository verification**

Run: `git status --short && git log -4 --oneline`

Expected: no uncommitted source changes and the three implementation commits appear above the plan/spec commits.
