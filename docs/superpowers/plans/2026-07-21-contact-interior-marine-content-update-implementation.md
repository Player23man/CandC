# C&C Contact, Interior, Marine, and Content Photo Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove Caleb, require both contact fields, consolidate Interior Detailing at $160, add published Marine Detailing pricing, and integrate authentic C&C Facebook photography into services and the portfolio.

**Architecture:** Keep business facts in `src/app/site-data.ts`, image records in `src/app/gallery-data.ts`, and presentation behavior in the existing reusable components. Add marine as a fifth `Service` so the service board and quote selector inherit it automatically; store curated Facebook images locally under `public/images` and never hotlink Facebook.

**Tech Stack:** React 19, TypeScript 7, React Router 7, Vitest, Testing Library, Vite, CSS.

## Global Constraints

- Keep the existing `/`, `/portfolio`, and `/contact` routes; do not add a marine route.
- Remove Caleb and `815-409-5501` from every customer-facing surface and source record.
- Keep Collin at `815-922-1593` and `candcdetailing25@gmail.com` unchanged.
- Phone and email must both be required with visible red markers and independent accessible errors.
- Interior Detailing is one package displayed as `From $160`; no basic/full split remains.
- Marine prices are exactly: wash $10/ft; wash and wax $30/ft; light oxidation removal and wax $60/ft; heavy oxidation removal and wax $80-$100/ft; ceramic coating add $20/ft; basic interior $10/ft; deep interior $30-$40/ft.
- Use only authentic C&C Facebook photos stored locally; exclude screenshots, Facebook chrome, flyers, logo-only graphics, weak thumbnails, and duplicates.
- Do not add a backend, booking calculator, automatic upload, invented vehicle identification, or invented service outcome.

---

### Task 1: Make contact data and quote validation match the business

**Files:**
- Modify: `src/app/site-data.ts`
- Modify: `src/components/SpecialistRail.tsx`
- Modify: `src/components/SiteFooter.tsx`
- Modify: `src/components/ContactForm.tsx`
- Modify: `src/test/site-data.test.ts`
- Modify: `src/test/campaign-system.test.tsx`
- Modify: `src/test/quote-cta.test.tsx`
- Modify: `src/test/contact.test.tsx`

**Interfaces:**
- Consumes: existing `businessProfile.collin`, `businessProfile.email`, and `SpecialistRailProps`.
- Produces: a `businessProfile` with no `caleb` property and a `QuoteFormErrors` map with separate `phone` and `email` keys.

- [ ] **Step 1: Write failing contact-data and single-specialist tests**

Replace Caleb assertions with absence checks and Collin-only behavior:

```tsx
expect(businessProfile).not.toHaveProperty("caleb");
expect(screen.queryByText("Caleb")).not.toBeInTheDocument();
expect(screen.queryByText("Interior specialist")).not.toBeInTheDocument();
expect(screen.getByRole("link", { name: /Collin.*815-922-1593/ }))
  .toHaveAttribute("href", "tel:8159221593");
```

- [ ] **Step 2: Write failing independent phone/email validation tests**

In `src/test/contact.test.tsx`, assert both labels are required and both empty fields show their own errors:

```tsx
expect(screen.getByText("Phone").parentElement).toHaveTextContent("*");
expect(screen.getByText("Email").parentElement).toHaveTextContent("*");
await user.click(screen.getByRole("button", { name: "Get a quote" }));
expect(screen.getByText("Enter your phone number.")).toBeVisible();
expect(screen.getByText("Enter your email address.")).toBeVisible();
```

Update the mailto test fixture so both fields are populated.

- [ ] **Step 3: Run focused tests and verify the new assertions fail**

Run:

```bash
npm test -- src/test/site-data.test.ts src/test/campaign-system.test.tsx src/test/quote-cta.test.tsx src/test/contact.test.tsx
```

Expected: FAIL because Caleb still renders and the form still uses one combined contact error.

- [ ] **Step 4: Remove Caleb from shared data and render only Collin**

Delete `businessProfile.caleb`, change `SpecialistRail` to a one-item array, and remove the second phone link from `SiteFooter`:

```ts
const specialists = [businessProfile.collin];
```

Preserve the full-rail email and Facebook links.

- [ ] **Step 5: Implement independent required-field validation**

Change the error type and validation:

```ts
type QuoteFormErrors = Partial<Record<
  "name" | "phone" | "email" | "vehicle" | "service" | "details",
  string
>>;

if (!values.phone.trim()) errors.phone = "Enter your phone number.";
if (!values.email.trim()) errors.email = "Enter your email address.";
```

Add `<span aria-hidden="true">*</span>` to both labels, use `errors.phone` and `errors.email` for each input's `aria-invalid`/`aria-describedby`, and render a dedicated error paragraph immediately after each input. Remove `quote-contact-error` and the combined row error.

- [ ] **Step 6: Run focused tests and verify they pass**

Run the Task 1 command again.

Expected: all selected tests PASS with no Caleb reference and independent phone/email errors.

- [ ] **Step 7: Commit the contact changes**

```bash
git add src/app/site-data.ts src/components/SpecialistRail.tsx src/components/SiteFooter.tsx src/components/ContactForm.tsx src/test/site-data.test.ts src/test/campaign-system.test.tsx src/test/quote-cta.test.tsx src/test/contact.test.tsx
git commit -m "feat: update contact ownership and requirements"
```

### Task 2: Consolidate interior pricing and add Marine Detailing

**Files:**
- Modify: `src/app/site-data.ts`
- Modify: `src/components/ServiceBoard.tsx`
- Modify: `src/test/site-data.test.ts`
- Modify: `src/test/service-board.test.tsx`

**Interfaces:**
- Consumes: `Service`, `services`, and the service-driven quote selector.
- Produces: `Service["id"]` including `"marine"`, an Interior Detailing record, and a Marine Detailing record.

- [ ] **Step 1: Write failing service-data tests**

```ts
const interior = services.find((service) => service.id === "interior");
const marine = services.find((service) => service.id === "marine");

expect(interior?.name).toBe("Interior Detailing");
expect(interior?.price).toBe("From $160");
expect(interior?.priceNotes).toBeUndefined();
expect(marine?.price).toBe("From $10/ft");
expect(marine?.priceNotes).toEqual(expect.arrayContaining([
  "Wash and wax $30/ft",
  "Wash, heavy oxidation removal, and wax $80-$100/ft",
  "Ceramic coating +$20/ft",
  "Deep interior cleaning $30-$40/ft"
]));
```

- [ ] **Step 2: Write failing desktop/mobile service-board tests**

Update navigation expectations to `Interior Detailing`, assert `05` exists, assert End focuses Marine Detailing, and assert the marine panel includes the heavy-oxidation price. Confirm the desktop tablist has five tabs and the mobile accordion has five triggers.

- [ ] **Step 3: Run focused service tests and verify failure**

```bash
npm test -- src/test/site-data.test.ts src/test/service-board.test.tsx
```

Expected: FAIL because the current type has four IDs, Interior is $180 with two tiers, and Marine is absent.

- [ ] **Step 4: Update the shared service records**

Expand the ID union:

```ts
id: "exterior" | "interior" | "correction" | "ceramic" | "marine";
```

Use this interior record:

```ts
{
  id: "interior",
  name: "Interior Detailing",
  price: "From $160",
  description: "One complete interior package focused on a thorough, condition-based clean.",
  details: [
    "Comprehensive vacuum",
    "Floor mat cleaning",
    "Surface cleaning",
    "Spot stain removal"
  ]
}
```

Append this marine record:

```ts
{
  id: "marine",
  name: "Marine Detailing",
  price: "From $10/ft",
  description: "Exterior and interior boat detailing with oxidation-removal and ceramic-protection options.",
  details: ["Exterior wash", "Interior cleaning", "Oxidation-removal options", "Ceramic-protection option"],
  priceNotes: [
    "Wash $10/ft",
    "Wash and wax $30/ft",
    "Wash, light oxidation removal, and wax $60/ft",
    "Wash, heavy oxidation removal, and wax $80-$100/ft",
    "Ceramic coating +$20/ft",
    "Basic interior cleaning $10/ft",
    "Deep interior cleaning $30-$40/ft"
  ]
}
```

- [ ] **Step 5: Add a marine service-image entry**

Add the image contract now; Task 3 supplies the file:

```ts
marine: {
  src: "/images/marine-detailing.jpg",
  alt: "Detailed blue and white boat on its trailer"
}
```

Change the interior service image to `/images/interior-detailing.jpg` with alt text `Clean light-colored vehicle seats and floor area`.

- [ ] **Step 6: Run focused service tests and verify they pass**

Run the Task 2 command again.

Expected: all selected tests PASS; TypeScript accepts all five service image keys.

- [ ] **Step 7: Commit the service changes**

```bash
git add src/app/site-data.ts src/components/ServiceBoard.tsx src/test/site-data.test.ts src/test/service-board.test.tsx
git commit -m "feat: add marine and consolidate interior service"
```

### Task 3: Curate Facebook photos and expand the portfolio

**Files:**
- Create: `public/images/marine-detailing.jpg`
- Create: `public/images/interior-detailing.jpg`
- Create: `public/images/interior-before.jpg`
- Create: `public/images/display/interior-detailing.jpg`
- Create: `public/images/display/interior-before.jpg`
- Modify: `src/app/gallery-data.ts`
- Modify: `src/test/portfolio.test.tsx`

**Interfaces:**
- Consumes: the C&C Facebook page photo assets and `GalleryItem`/`portfolioChapters`.
- Produces: local optimized image paths and an `interior` portfolio chapter using new gallery indexes.

- [ ] **Step 1: Extract and inspect the full-resolution Facebook assets**

Use the public C&C Facebook photo pages and the browser page-assets inventory. For each selected image, choose the largest observed C&C-owned asset, export it locally, and reject Facebook UI assets, profile logos, flyers, and 414px thumbnails when a 1254px source exists.

Select:

- the boat half of the 1942x809 C&C truck/boat cover image for `marine-detailing.jpg`;
- the clean light-seat interior after image for `interior-detailing.jpg`;
- its matching dirty floor/seat before image for `interior-before.jpg`.

- [ ] **Step 2: Create local full/display image derivatives**

Crop the cover at its natural diagonal divider so only the boat side remains. Preserve photographic aspect ratio and avoid upscaling. Create display copies with a maximum long edge near 960px and JPEG quality suitable for the existing image inventory. Confirm with `file` that all outputs are valid JPEGs and that full-resolution versions are at least as large as their display versions.

- [ ] **Step 3: Write failing portfolio data/render tests**

Extend `src/test/portfolio.test.tsx`:

```tsx
expect(screen.getByRole("heading", { name: "Interior" })).toBeVisible();
expect(screen.getAllByRole("button", { name: /Open .* detail/ })).toHaveLength(8);
expect(galleryItems.some((item) => item.src === "/images/interior-detailing.jpg")).toBe(true);
expect(galleryItems.some((item) => item.src === "/images/interior-before.jpg")).toBe(true);
```

Retain the assertion that every full source is outside `/images/display/` and every page source is within it.

- [ ] **Step 4: Run the portfolio test and verify it fails**

```bash
npm test -- src/test/portfolio.test.tsx
```

Expected: FAIL because the Interior chapter and two new records are absent.

- [ ] **Step 5: Add factual gallery records and the Interior chapter**

Append:

```ts
{
  src: "/images/interior-before.jpg",
  displaySrc: "/images/display/interior-before.jpg",
  alt: "Vehicle floor area before interior detailing",
  openLabel: "Open interior before detail"
},
{
  src: "/images/interior-detailing.jpg",
  displaySrc: "/images/display/interior-detailing.jpg",
  alt: "Clean light-colored vehicle seats and floor area after detailing",
  openLabel: "Open interior after detail"
}
```

Append this chapter after Process and before Protection:

```ts
{ id: "interior", title: "Interior", itemIndexes: [6, 7], layout: "documentary" }
```

- [ ] **Step 6: Run portfolio tests and verify they pass**

Run the Task 3 test command again.

Expected: PASS with eight accessible gallery buttons and the new Interior chapter.

- [ ] **Step 7: Commit the curated image work**

```bash
git add public/images/marine-detailing.jpg public/images/interior-detailing.jpg public/images/interior-before.jpg public/images/display/interior-detailing.jpg public/images/display/interior-before.jpg src/app/gallery-data.ts src/test/portfolio.test.tsx
git commit -m "feat: add authentic marine and interior photography"
```

### Task 4: Reflow five services and one specialist, then verify the complete site

**Files:**
- Modify: `src/styles/layout.css`
- Modify: `src/styles/contact.css`
- Modify: `src/styles/home.css`
- Modify: `src/styles/portfolio.css` only if the new Interior chapter exposes a real layout issue
- Test: all files under `src/test` and `src/app/App.test.tsx`

**Interfaces:**
- Consumes: five service tabs, one Collin contact row, and the new gallery chapter.
- Produces: responsive layouts without empty columns, overflow, clipping, or unreadable service labels.

- [ ] **Step 1: Run the full automated suite before CSS changes**

```bash
npm test
npm run build
```

Expected: all tests PASS and Vite emits a successful production build. If any test fails, fix the corresponding behavior before styling.

- [ ] **Step 2: Start the local site and inspect required routes**

```bash
npm run dev -- --host 127.0.0.1
```

Inspect `/`, `/portfolio`, and `/contact` at 1440x1000 and 390x844. Specifically inspect the 768px transition for service tabs.

- [ ] **Step 3: Apply only evidence-driven responsive CSS changes**

Keep the service-board desktop tablist at five equal readable columns; if labels crowd, reduce tab gap/padding and font size within the existing visual system rather than introducing horizontal scrolling. Change the Collin-only `.specialist-rail--phones` layout to a single full-width item and update `.contact-rail-band` grid selectors so the three full-rail destinations—Collin, email, Facebook—do not rely on odd/even rules written for four items.

- [ ] **Step 4: Verify visual and interactive behavior**

Confirm on desktop and mobile:

- no Caleb name or phone exists;
- Collin, email, and Facebook links remain usable;
- Phone and Email show red stars and field-specific errors;
- Interior Detailing shows `From $160` with one package;
- Marine Detailing exposes all seven published prices;
- the marine and interior images load without distortion;
- the portfolio Interior chapter opens in the lightbox;
- desktop arrow/Home/End behavior and mobile accordion behavior still work;
- no horizontal page overflow occurs.

- [ ] **Step 5: Search for stale facts**

```bash
rg -n "Caleb|815-409-5501|From \\$180|Basic interior cleaning \\$180|Full interior restoration \\$225" src public
```

Expected: no matches. The marine `Basic interior cleaning $10/ft` line is intentionally not part of the stale-pattern search.

- [ ] **Step 6: Run final verification**

```bash
npm test
npm run build
git diff --check
git status --short
```

Expected: all tests PASS, build succeeds, `git diff --check` is silent, and status contains only the intentional Task 4 files.

- [ ] **Step 7: Commit final responsive polish**

```bash
git add src/styles/layout.css src/styles/contact.css src/styles/home.css src/styles/portfolio.css
git commit -m "fix: reflow expanded services and contact layouts"
```

- [ ] **Step 8: Review final history and working tree**

```bash
git log -5 --oneline
git status --short
```

Expected: the feature commits are present and the working tree is clean.
