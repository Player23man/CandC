# Frontstage Footer Credit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the footer’s `Appointment only` note with a linked `Designed by Frontstage.` credit using C&C’s body font and Frontstage’s Alike wordmark font.

**Architecture:** Add the local `@fontsource/alike` package, load it alongside Archivo, and keep the credit markup within `SiteFooter`. Style the phrase as one accessible link with separate spans for the two typography roles.

**Tech Stack:** React 19, TypeScript, CSS, `@fontsource/alike`, Vitest, Testing Library

## Global Constraints

- Remove the existing `Appointment only` footer note.
- Place `Designed by Frontstage.` in the bottom-right position of the legal row.
- Keep `Designed by` in the site’s normal Archivo body font.
- Render `Frontstage.` in the authentic Alike wordmark typeface with a heavier visual treatment.
- Make the complete phrase one link to `https://frontstagewebdesign.com`.
- Open the external link in a new tab with safe external-link attributes.
- Keep the copyright in the bottom-left position.
- Preserve the existing stacked mobile behavior and desktop left/right alignment.

---

### Task 1: Add the linked Frontstage footer credit

**Files:**
- Create: `src/test/footer.test.tsx`
- Modify: `src/components/SiteFooter.tsx`
- Modify: `src/styles/global.css`
- Modify: `src/styles/layout.css`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Consumes: `@fontsource/alike` and the existing `.site-footer__legal` layout
- Produces: one external link with accessible name `Designed by Frontstage.` and a `.site-footer__credit-wordmark` Alike span

- [ ] **Step 1: Write the failing footer test**

Create `src/test/footer.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "../components/SiteFooter";

describe("SiteFooter", () => {
  it("links the Frontstage design credit and removes the appointment note", () => {
    render(
      <MemoryRouter>
        <SiteFooter />
      </MemoryRouter>
    );

    expect(screen.queryByText("Appointment only")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Designed by Frontstage." })).toHaveAttribute(
      "href",
      "https://frontstagewebdesign.com"
    );
    expect(screen.getByText("Frontstage.")).toHaveClass("site-footer__credit-wordmark");
  });
});
```

- [ ] **Step 2: Run the focused test and verify the red state**

Run:

```bash
npm test -- src/test/footer.test.tsx
```

Expected: FAIL because no `Designed by Frontstage.` link exists and `Appointment only` is still rendered.

- [ ] **Step 3: Install and load Alike**

Run:

```bash
npm install @fontsource/alike
```

Add this import after Archivo in `src/styles/global.css`:

```css
@import "@fontsource/alike";
```

- [ ] **Step 4: Implement the credit markup**

Replace the `Appointment only` span in `SiteFooter.tsx` with:

```tsx
<a
  className="site-footer__credit"
  href="https://frontstagewebdesign.com"
  target="_blank"
  rel="noreferrer"
>
  <span>Designed by </span>
  <span className="site-footer__credit-wordmark">Frontstage.</span>
</a>
```

- [ ] **Step 5: Add the typography and interaction styling**

Add footer-credit rules that inherit Archivo for the link, use `"Alike", serif` on `.site-footer__credit-wordmark`, synthesize a visually heavier wordmark with `font-weight: 700`, preserve a compact baseline, and move the full credit from muted to normal footer text color on hover/focus.

- [ ] **Step 6: Verify behavior and the complete suite**

Run:

```bash
npm test -- src/test/footer.test.tsx
npm test
npm run build
git diff --check
```

Expected: focused footer test passes, all site tests pass, the production build succeeds, and the diff has no whitespace errors.

- [ ] **Step 7: Commit and deploy**

```bash
git add package.json package-lock.json src/components/SiteFooter.tsx src/styles/global.css src/styles/layout.css src/test/footer.test.tsx docs/superpowers/plans/2026-07-27-frontstage-footer-credit-implementation.md
git commit -m "Add Frontstage footer credit"
git push origin main
```

Confirm the resulting Vercel production deployment is `READY`, then verify the production homepage contains the linked credit and no `Appointment only` text.
