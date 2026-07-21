# C&C Detailing Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify a responsive three-route C&C Detailing website using the approved Performance Editorial direction and the real business information from the existing site.

**Architecture:** Create a Vite React TypeScript single-page application with React Router routes for Home, Portfolio, and Contact. Keep business facts in one typed data module, gallery assets in one typed manifest, shared navigation and conversion components in focused files, and route-specific composition inside page components. Use native CSS tokens for the visual system and Motion client components only where animation improves hierarchy or state feedback.

**Tech Stack:** Vite, React, TypeScript, React Router, Motion, Phosphor Icons, Vitest, Testing Library, Playwright screenshots

## Global Constraints

- Routes are exactly `/`, `/portfolio`, and `/contact`.
- Public facts, service prices, phone numbers, email, testimonial wording, and appointment notes match the approved specification.
- Archivo is the only type family.
- The design uses one dark theme, one signal-red accent, sharp corners, cardless sections, and authentic or clearly isolated placeholder imagery.
- No decorative gradients, glows, glass panels, pills, eyebrow repetition, section-number labels, invented claims, fake project metadata, em dashes, or duplicated CTA labels.
- `Get a quote` is the single label for quote intent across navigation, hero, and final CTA surfaces.
- Hero copy and CTAs fit within the initial viewport at 1440px and 390px widths.
- All motion uses transform and opacity, respects `prefers-reduced-motion`, and has a static fallback.
- Forms use visible labels, inline validation, accessible status messaging, and a mail-client fallback until a production endpoint is supplied.
- Final verification covers 1440px, 1024px, 768px, and 390px widths on all three routes.

## File structure

```text
index.html                         Application document and route metadata defaults
package.json                       Dependencies and test/build scripts
vite.config.ts                     Vite and Vitest configuration
tsconfig.json                      TypeScript project configuration
src/main.tsx                       Browser entrypoint
src/app/App.tsx                    Router and route-level scroll restoration
src/app/site-data.ts               Typed source of truth for business facts
src/app/gallery-data.ts            Typed gallery and placeholder-asset manifest
src/app/App.test.tsx               Route smoke tests
src/components/SiteHeader.tsx      Desktop/mobile navigation
src/components/SiteFooter.tsx      Shared factual footer
src/components/QuoteCta.tsx        Shared quote conversion band
src/components/Reveal.tsx          Reduced-motion-aware entrance wrapper
src/components/GalleryLightbox.tsx Accessible portfolio dialog
src/components/ContactForm.tsx     Validation and email handoff
src/pages/HomePage.tsx             Home composition
src/pages/PortfolioPage.tsx        Portfolio composition and gallery state
src/pages/ContactPage.tsx          Contact composition
src/styles/global.css              Tokens, reset, global responsive rules
src/styles/layout.css              Shared shell and layout primitives
src/styles/home.css                Home-specific composition
src/styles/portfolio.css           Portfolio and lightbox composition
src/styles/contact.css             Contact form composition
src/test/setup.ts                  Testing Library setup
src/test/site-data.test.ts         Source-truth tests
src/test/header.test.tsx           Navigation behavior tests
src/test/home.test.tsx             Home content tests
src/test/portfolio.test.tsx        Gallery and lightbox tests
src/test/contact.test.tsx          Form behavior tests
public/images/cc-wordmark.jpg       Existing public C&C wordmark
public/images/cc-brand.png          Existing public C&C brand graphic
public/images/ceramic-display.jpg   Existing public ceramic-coating photo
public/images/gallery/*.jpg         Isolated temporary gallery imagery
```

---

### Task 1: Scaffold the application and lock business facts

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `src/main.tsx`
- Create: `src/app/App.tsx`
- Create: `src/app/site-data.ts`
- Create: `src/test/setup.ts`
- Create: `src/test/site-data.test.ts`

**Interfaces:**
- Produces: `BusinessProfile`, `Service`, `businessProfile`, `services`, and `testimonial` exported from `src/app/site-data.ts`.
- Produces: a three-route `App` component consumed by all later rendering tests.

- [ ] **Step 1: Create the package and TypeScript configuration**

Create scripts with these exact names:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

Install `react`, `react-dom`, `react-router-dom`, `motion`, and `@phosphor-icons/react`, plus development dependencies for Vite, TypeScript, Vitest, jsdom, and Testing Library.

- [ ] **Step 2: Write the source-truth test**

```ts
import { describe, expect, it } from "vitest";
import { businessProfile, services, testimonial } from "../app/site-data";

describe("C&C business data", () => {
  it("preserves current contact details and pricing", () => {
    expect(businessProfile.collin.phone).toBe("815-922-1593");
    expect(businessProfile.caleb.phone).toBe("815-409-5501");
    expect(businessProfile.email).toBe("candcdetailing25@gmail.com");
    expect(services.find((service) => service.id === "ceramic")?.price).toBe("From $900");
    expect(testimonial).toContain("2022 Tucson");
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test -- src/test/site-data.test.ts`

Expected: FAIL because `src/app/site-data.ts` does not exist.

- [ ] **Step 4: Implement the typed source of truth**

Define these types and exports:

```ts
export type Specialist = { name: string; role: string; phone: string; tel: string };
export type Service = {
  id: "exterior" | "interior" | "correction" | "ceramic";
  name: string;
  price: string;
  description: string;
  details: string[];
};

export const businessProfile = {
  name: "C&C Detailing",
  legalName: "Collins Custom Detailing LLC",
  location: "Channahon, Illinois",
  email: "candcdetailing25@gmail.com",
  facebook: "https://www.facebook.com/profile.php?id=61574139886965",
  collin: { name: "Collin", role: "Exterior specialist", phone: "815-922-1593", tel: "8159221593" },
  caleb: { name: "Caleb", role: "Interior specialist", phone: "815-409-5501", tel: "8154095501" }
} satisfies Record<string, unknown>;

export const testimonial = "I would highly recommend Collin for the great job he did detailing my car. I have a 2022 Tucson & I felt like I drove away in a brand-new car. His work is meticulous; every crevice of car cleaned to perfection!";
```

Add all four service objects and the detailed package pricing from the specification. Do not derive or invent values.

- [ ] **Step 5: Add the router shell**

Create `App` with `Routes` for `/`, `/portfolio`, and `/contact`, and temporary semantic page headings so routing compiles before the final page components land.

- [ ] **Step 6: Run tests and build**

Run: `npm test -- src/test/site-data.test.ts && npm run build`

Expected: PASS and a successful Vite build.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json index.html vite.config.ts tsconfig.json src
git commit -m "feat: scaffold C&C site and business data"
```

---

### Task 2: Add authentic brand assets and the shared site shell

**Files:**
- Create: `public/images/cc-wordmark.jpg`
- Create: `public/images/cc-brand.png`
- Create: `public/images/ceramic-display.jpg`
- Create: `src/components/SiteHeader.tsx`
- Create: `src/components/SiteFooter.tsx`
- Create: `src/components/Reveal.tsx`
- Create: `src/styles/global.css`
- Create: `src/styles/layout.css`
- Create: `src/test/header.test.tsx`
- Modify: `src/main.tsx`
- Modify: `src/app/App.tsx`

**Interfaces:**
- Consumes: `businessProfile` from `src/app/site-data.ts`.
- Produces: `SiteHeader`, `SiteFooter`, and `Reveal` reusable by all route components.

- [ ] **Step 1: Copy the inspected public assets into the project**

Use the original current-site files already inspected during planning:

```bash
cp /tmp/candc-assets/banner.jpg public/images/cc-wordmark.jpg
cp /tmp/candc-assets/hero.png public/images/cc-brand.png
cp /tmp/candc-assets/team.jpg public/images/ceramic-display.jpg
```

If `/tmp/candc-assets` is absent in a fresh environment, redownload the three exact Wix media IDs recorded in the design research before continuing.

- [ ] **Step 2: Write the mobile-navigation test**

```tsx
it("opens the mobile menu and exposes all routes", async () => {
  render(<MemoryRouter><SiteHeader /></MemoryRouter>);
  await userEvent.click(screen.getByRole("button", { name: /open menu/i }));
  expect(screen.getByRole("link", { name: "Portfolio" })).toBeVisible();
  expect(screen.getByRole("link", { name: "Contact" })).toBeVisible();
  expect(screen.getByRole("link", { name: "Get a quote" })).toHaveAttribute("href", "/contact");
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test -- src/test/header.test.tsx`

Expected: FAIL because `SiteHeader` does not exist.

- [ ] **Step 4: Implement the shared shell**

Build a 72px maximum-height header with the real wordmark, one-line desktop navigation, a rectangular red `Get a quote` action, and a keyboard-operable mobile disclosure. Build a factual footer with both specialists, email, Facebook, and the three routes. `Reveal` uses `motion/react` plus `useReducedMotion()` and accepts `{ children, className?, delay? }`.

- [ ] **Step 5: Implement tokens and layout primitives**

Define the approved colors as CSS custom properties, load Archivo through `@font-face` or a packaged local source, add reset/focus/skip-link styles, and establish shared `.shell`, `.section`, `.button`, and `.text-link` classes. Use sharp corners and no gradient or glass declarations.

- [ ] **Step 6: Run tests and build**

Run: `npm test -- src/test/header.test.tsx && npm run build`

Expected: PASS and successful build.

- [ ] **Step 7: Commit**

```bash
git add public src
git commit -m "feat: add C&C brand shell"
```

---

### Task 3: Build the Performance Editorial home page

**Files:**
- Create: `src/pages/HomePage.tsx`
- Create: `src/components/QuoteCta.tsx`
- Create: `src/styles/home.css`
- Create: `src/test/home.test.tsx`
- Modify: `src/app/App.tsx`

**Interfaces:**
- Consumes: `services`, `testimonial`, `businessProfile`, `Reveal`, and shared shell components.
- Produces: `HomePage` and `QuoteCta`.

- [ ] **Step 1: Write the home-content test**

```tsx
it("renders the approved hero, services, and exact testimonial", () => {
  render(<MemoryRouter><HomePage /></MemoryRouter>);
  expect(screen.getByRole("heading", { name: "Finished with intent." })).toBeVisible();
  expect(screen.getByText("Exterior Detail")).toBeVisible();
  expect(screen.getByText("From $900")).toBeVisible();
  expect(screen.getByText(/2022 Tucson/)).toHaveTextContent(testimonial);
  expect(screen.getAllByRole("link", { name: "Get a quote" }).length).toBeGreaterThan(0);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/test/home.test.tsx`

Expected: FAIL because `HomePage` does not exist.

- [ ] **Step 3: Implement the hero and service index**

Build a `min-height: 100dvh` full-bleed hero with a dark automotive placeholder image isolated through the gallery manifest, the approved headline and support sentence, and two actions. Build the four-service index with one sparse divider per group and interrupt it after the second service with `ceramic-display.jpg`. Do not attach a thumbnail or decorative number to every service.

- [ ] **Step 4: Implement the remaining home sections**

Add the factual `What the work includes` spread, an asymmetric portfolio preview, the exact testimonial with no attribution, and the shared solid-red `QuoteCta`. Ensure each section uses a different layout family.

- [ ] **Step 5: Add motivated motion and mobile fallbacks**

Use `Reveal` for hero and section entrances, crop-shift portfolio images on hover, and disable transformations when reduced motion is preferred. At widths below 768px, collapse every asymmetric grid to one column, keep the hero to two text lines, and keep both actions inside the viewport.

- [ ] **Step 6: Run tests and build**

Run: `npm test -- src/test/home.test.tsx && npm run build`

Expected: PASS and successful build.

- [ ] **Step 7: Commit**

```bash
git add src
git commit -m "feat: build Performance Editorial home page"
```

---

### Task 4: Build the portfolio route and accessible lightbox

**Files:**
- Create: `src/app/gallery-data.ts`
- Create: `src/components/GalleryLightbox.tsx`
- Create: `src/pages/PortfolioPage.tsx`
- Create: `src/styles/portfolio.css`
- Create: `src/test/portfolio.test.tsx`
- Create: `public/images/gallery/*.jpg`
- Modify: `src/app/App.tsx`

**Interfaces:**
- Produces: `GalleryItem`, `galleryItems`, and `GalleryLightbox` with props `{ item: GalleryItem | null; onClose(): void; onPrevious(): void; onNext(): void }`.
- Consumes: `QuoteCta` and shared shell components.

- [ ] **Step 1: Create the gallery manifest**

```ts
export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  placeholder: boolean;
};
```

Include `ceramic-display.jpg` as an authentic item. Keep temporary atmospheric images in `public/images/gallery/` with `placeholder: true`, no invented service or vehicle metadata, and source notes in code comments. Do not show placeholder status or fabricated captions in the public UI.

- [ ] **Step 2: Write the lightbox behavior test**

```tsx
it("opens an image dialog and closes it with Escape", async () => {
  render(<MemoryRouter><PortfolioPage /></MemoryRouter>);
  await userEvent.click(screen.getAllByRole("button", { name: /open image/i })[0]);
  expect(screen.getByRole("dialog", { name: /gallery image/i })).toBeVisible();
  await userEvent.keyboard("{Escape}");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test -- src/test/portfolio.test.tsx`

Expected: FAIL because the portfolio components do not exist.

- [ ] **Step 4: Implement the editorial gallery**

Build `The work.` opening, a large featured image, and an asymmetric image grid. Omit category filters because the currently available authentic inventory does not meet the approved threshold. Images have useful neutral alt text and no unsupported captions.

- [ ] **Step 5: Implement the lightbox**

Use a native dialog or equivalent accessible modal with focus trapping, close/previous/next controls, Escape handling, body-scroll restoration, and reduced-motion transitions. Restore focus to the triggering image button after close.

- [ ] **Step 6: Run tests and build**

Run: `npm test -- src/test/portfolio.test.tsx && npm run build`

Expected: PASS and successful build.

- [ ] **Step 7: Commit**

```bash
git add public/images/gallery src
git commit -m "feat: add portfolio gallery and lightbox"
```

---

### Task 5: Build the contact route and validated email handoff

**Files:**
- Create: `src/components/ContactForm.tsx`
- Create: `src/pages/ContactPage.tsx`
- Create: `src/styles/contact.css`
- Create: `src/test/contact.test.tsx`
- Modify: `src/app/App.tsx`

**Interfaces:**
- Produces: `ContactForm` with no external props.
- Consumes: `businessProfile`, `services`, and shared shell components.

- [ ] **Step 1: Write the form validation test**

```tsx
it("shows inline errors before preparing an email", async () => {
  render(<ContactForm />);
  await userEvent.click(screen.getByRole("button", { name: "Get a quote" }));
  expect(screen.getByText("Enter your name.")).toBeVisible();
  expect(screen.getByText("Enter a phone number or email address.")).toBeVisible();
  expect(screen.getByRole("status")).toHaveTextContent("");
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/test/contact.test.tsx`

Expected: FAIL because `ContactForm` does not exist.

- [ ] **Step 3: Implement the fields and validation**

Implement fields in the exact approved order. Require name, vehicle, service interest, condition/details, and at least one of phone or email. Render errors below fields with `aria-describedby`; use a polite live region for handoff status.

- [ ] **Step 4: Implement the mail-client handoff**

Construct a subject of `C&C quote request: <vehicle>` and a plain-text body containing each submitted field. Navigate to an encoded `mailto:candcdetailing25@gmail.com` URI after validation, then reveal the email address and a copy button so users can recover when no mail client opens. Explain that photo attachments must be added manually.

- [ ] **Step 5: Build the contact composition**

Add the approved heading, appointment and mobile-service explanation, click-to-call specialist blocks, email, Facebook, form, and source-true notes. Do not add hours, an address, a map, or availability claims.

- [ ] **Step 6: Run tests and build**

Run: `npm test -- src/test/contact.test.tsx && npm run build`

Expected: PASS and successful build.

- [ ] **Step 7: Commit**

```bash
git add src
git commit -m "feat: add contact quote flow"
```

---

### Task 6: Complete route metadata, responsive QA, and visual verification

**Files:**
- Create: `src/components/RouteMeta.tsx`
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`
- Modify: `index.html`
- Modify: `src/app/App.tsx`
- Modify: `src/styles/global.css`
- Modify: `src/styles/layout.css`
- Modify: `src/styles/home.css`
- Modify: `src/styles/portfolio.css`
- Modify: `src/styles/contact.css`
- Modify: `src/app/App.test.tsx`

**Interfaces:**
- Produces: `RouteMeta` with props `{ title: string; description: string; path: string }`.
- Consumes: every completed route and component.

- [ ] **Step 1: Write route smoke tests**

```tsx
it.each([
  ["/", "Finished with intent."],
  ["/portfolio", "The work."],
  ["/contact", "Let’s talk about your vehicle."]
])("renders %s", (path, heading) => {
  render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);
  expect(screen.getByRole("heading", { name: heading })).toBeVisible();
});
```

- [ ] **Step 2: Run the full test suite**

Run: `npm test`

Expected: PASS for data, shell, Home, Portfolio, Contact, and routing.

- [ ] **Step 3: Add route metadata and static discovery files**

Set route-specific titles and descriptions, canonical paths for the known production domain, Open Graph defaults, `robots.txt`, and a three-route `sitemap.xml`. Preserve `ccdetailingllc.com` as the canonical host.

- [ ] **Step 4: Run the production build**

Run: `npm run build`

Expected: TypeScript and Vite complete without warnings or errors.

- [ ] **Step 5: Start the preview and capture all verification views**

Run: `npm run dev -- --host 127.0.0.1 --port 4173`

Capture Home, Portfolio, and Contact at 1440x1000 and 390x844. Also inspect the shared shell at 1024px and 768px. Save screenshots under `output/playwright/` for review.

- [ ] **Step 6: Run the anti-slop and accessibility audit**

Check every page for:

- hero content and CTA visibility in the initial viewport
- one-line desktop navigation under 72px tall
- no overflow or text overlap
- readable CTA and form contrast
- visible focus states and keyboard navigation
- no repeated eyebrows, decorative numbers, unsupported captions, fake claims, em dashes, gradients, glow, glass, or floating pills
- exact phone numbers, email, prices, appointment notes, and testimonial
- graceful reduced-motion behavior
- isolated placeholder assets documented for replacement

Fix every failed item and recapture the affected screenshot.

- [ ] **Step 7: Run final verification**

Run: `npm test && npm run build && git diff --check`

Expected: all tests pass, production build succeeds, and `git diff --check` prints nothing.

- [ ] **Step 8: Commit**

```bash
git add index.html public src output/playwright
git commit -m "test: verify C&C redesign across routes"
```

## Plan self-review

- Spec coverage: Home, Portfolio, Contact, source truth, anti-slop exclusions, motion, accessibility, responsive behavior, form fallback, metadata, tests, build, and visual QA each map to a task.
- Placeholder scan: no incomplete implementation steps remain. Temporary gallery assets are an explicit, isolated constraint with a replacement flag, not an undocumented content placeholder.
- Type consistency: `businessProfile`, `services`, `testimonial`, `GalleryItem`, `GalleryLightbox`, `QuoteCta`, and `RouteMeta` use the same names across producing and consuming tasks.
