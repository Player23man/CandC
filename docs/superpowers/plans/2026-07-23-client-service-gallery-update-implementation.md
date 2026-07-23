# C&C Client Service, Quote Selection, and Gallery Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish Collin's corrected service offering, support up to two services per quote, and expand the existing editorial portfolio with a curated set of authentic Facebook photographs.

**Architecture:** Keep service copy in `site-data.ts`, convert the contact form's service value from one string to an ordered string array, and render the choices as an accessible checkbox group capped at two selections. Curated Facebook assets remain local and continue through the existing `gallery-data.ts` full/display source model and portfolio chapters.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Testing Library, CSS, local JPEG/PNG assets

## Global Constraints

- Keep one `Interior Detailing` package with compact price `From $160`.
- Use the approved nine-item interior inclusion list exactly, with only capitalization and punctuation normalization.
- Replace customer-facing `spray wax` references with `hydro sealer`; preserve exterior price and existing paid add-ons.
- Allow one or two quote service selections, including `Not sure yet`; never allow a third.
- Require interior photos whenever `Interior Detailing` is selected.
- Select 4–6 high-resolution Facebook photographs, store them locally, and exclude graphics, weak crops, and near-duplicates.
- Preserve the existing editorial design, routes, service-board behavior, portfolio chapters, and email handoff.
- Do not hotlink Facebook, embed a social feed, add a backend, or invent claims/captions.

---

### Task 1: Correct Interior and Exterior Service Data

**Files:**
- Modify: `src/test/site-data.test.ts`
- Modify: `src/app/site-data.ts`

**Interfaces:**
- Consumes: existing `services: Service[]` and `workIncludes`
- Produces: corrected `services` data and `workIncludes.protection` for `ServiceBoard`, quote options, and homepage summaries

- [ ] **Step 1: Write the failing service-data assertions**

Update the interior expectation to the complete list and add exterior/protection assertions:

```ts
expect(interior?.details).toEqual([
  "Full interior blow-out and debris extraction",
  "Comprehensive vacuum of carpets, seats, and trunk",
  "Deep shampoo of carpets, cloth seats, and carpet mats",
  "Deep leather cleaning and conditioning",
  "Steam cleaning and sanitization of surfaces",
  "Full interior surface scrub",
  "Headliner spot cleaning",
  "Floor mat cleaning",
  "Odor neutralization"
]);

const exterior = services.find((service) => service.id === "exterior");
expect(exterior?.details).toContain("Hand wash and hydro sealer");
expect(JSON.stringify({ services, workIncludes }).toLowerCase()).not.toContain("spray wax");
expect(workIncludes.protection).toContain("Hydro sealer");
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- src/test/site-data.test.ts`

Expected: FAIL because the current interior list has five entries and exterior/protection still reference spray wax.

- [ ] **Step 3: Implement the corrected shared data**

Set the exterior first detail to `Hand wash and hydro sealer`, replace the interior details with the nine approved strings, and replace `Spray wax` with `Hydro sealer` in `workIncludes.protection`. Do not alter prices or add-ons.

- [ ] **Step 4: Run the focused data and service-board tests**

Run: `npm test -- src/test/site-data.test.ts src/test/service-board.test.tsx`

Expected: PASS with both files green.

- [ ] **Step 5: Commit the service correction**

```bash
git add src/app/site-data.ts src/test/site-data.test.ts
git commit -m "Update detailing service descriptions"
```

### Task 2: Support Up to Two Quote Services

**Files:**
- Modify: `src/test/contact.test.tsx`
- Modify: `src/components/ContactForm.tsx`
- Modify: `src/styles/contact.css`

**Interfaces:**
- Consumes: `services` from `src/app/site-data.ts`
- Produces: `QuoteFormValues.service: string[]`, checkbox-selection behavior, and `buildQuoteMailto(values)` output using `Services:`

- [ ] **Step 1: Write failing checkbox-group tests**

Add tests that:

```ts
const exterior = screen.getByRole("checkbox", { name: "Exterior Detail" });
const interior = screen.getByRole("checkbox", { name: "Interior Detailing" });
const ceramic = screen.getByRole("checkbox", { name: "Ceramic Coating" });

await user.click(exterior);
await user.click(interior);
expect(exterior).toBeChecked();
expect(interior).toBeChecked();
expect(ceramic).toBeDisabled();

await user.click(exterior);
expect(ceramic).toBeEnabled();
```

Add an empty-submit assertion for `Choose at least one service.` and update the interior-photo tests to click the Interior Detailing checkbox instead of selecting a dropdown option.

- [ ] **Step 2: Write failing email serialization tests**

Update `buildQuoteMailto` fixtures to pass arrays and assert:

```ts
service: ["Exterior Detail", "Interior Detailing"]
```

```ts
expect(decodeURIComponent(href)).toContain(
  "Services: Exterior Detail, Interior Detailing"
);
```

- [ ] **Step 3: Run the contact tests and verify RED**

Run: `npm test -- src/test/contact.test.tsx`

Expected: FAIL because service state is still a string and the form still renders one `<select>`.

- [ ] **Step 4: Convert service state and validation**

Change:

```ts
service: string[];
```

Initialize it with `[]`. Validate with `values.service.length === 0`. Compute:

```ts
const requiresInteriorPhotos = values.service.includes("Interior Detailing");
const serviceLimitReached = values.service.length >= 2;
```

Add a toggle that appends a newly checked option, removes an unchecked option, preserves selection order, and clears the photo error only when Interior Detailing is no longer selected.

- [ ] **Step 5: Render the accessible checkbox group**

Replace the service `<select>` with a `fieldset` containing:

```tsx
<fieldset
  className="service-choice-group"
  aria-describedby={[
    "quote-service-help",
    errors.service ? "quote-service-error" : ""
  ].filter(Boolean).join(" ")}
>
  <legend>Service interest <span aria-hidden="true">*</span></legend>
  <p id="quote-service-help">Choose up to 2 services.</p>
  <div className="service-choice-grid">
    {[...services.map((service) => service.name), "Not sure yet"].map((serviceName) => {
      const checked = values.service.includes(serviceName);
      return (
        <label className="service-choice" key={serviceName}>
          <input
            type="checkbox"
            name="service"
            value={serviceName}
            checked={checked}
            disabled={!checked && serviceLimitReached}
            onChange={() => toggleService(serviceName)}
          />
          <span>{serviceName}</span>
        </label>
      );
    })}
  </div>
  {errors.service && <p className="field-error" id="quote-service-error">{errors.service}</p>}
</fieldset>
```

- [ ] **Step 6: Update mail output and photo behavior**

Change the body line to:

```ts
`Services: ${values.service.join(", ")}`
```

Keep photo validation based on `includes("Interior Detailing")`.

- [ ] **Step 7: Style the checkbox group**

Add responsive `service-choice-group`, `service-choice-grid`, and `service-choice` styles with the existing line colors, print background, signal focus/checked state, visible disabled state, and a two-column grid from `680px` upward. Keep at least 44px touch height and avoid custom-hidden checkboxes.

- [ ] **Step 8: Run focused tests and verify GREEN**

Run: `npm test -- src/test/contact.test.tsx`

Expected: PASS.

- [ ] **Step 9: Commit the quote-form behavior**

```bash
git add src/components/ContactForm.tsx src/styles/contact.css src/test/contact.test.tsx
git commit -m "Allow two services per quote request"
```

### Task 3: Curate and Integrate Facebook Portfolio Assets

**Files:**
- Create: `public/images/cc-*.jpg` or `public/images/cc-*.png` for 4–6 selected full-resolution assets
- Create: `public/images/display/cc-*.jpg` for matching display assets
- Modify: `src/test/portfolio.test.tsx`
- Modify: `src/app/gallery-data.ts`

**Interfaces:**
- Consumes: public Facebook page assets and existing `GalleryItem`
- Produces: 4–6 new local `GalleryItem` records included in existing `portfolioChapters`

- [ ] **Step 1: Inspect and select authentic source assets**

Open C&C Detailing's public Facebook Photos surface. Inspect high-resolution candidates visually and select 4–6 unique photographs that clearly depict finished vehicles, detailing work, interiors, or protection results. Reject promotional art, logo graphics, thumbnails, and near-duplicates.

- [ ] **Step 2: Bundle selected files locally**

Use the browser page-asset capability to bundle the exact selected image IDs. Copy the files into `public/images/` using descriptive `cc-*` names. Preserve the source format when practical.

- [ ] **Step 3: Create display-sized variants**

Create matching files in `public/images/display/` with a maximum long edge near 1600px while preserving aspect ratio and visual quality. Verify dimensions and file sizes before referencing them.

- [ ] **Step 4: Write failing gallery-data assertions**

Add a test requiring the final gallery length to equal the old eight items plus the selected count. Assert every new item has:

```ts
expect(item.src).toMatch(/^\/images\/cc-/);
expect(item.displaySrc).toMatch(/^\/images\/display\/cc-/);
expect(item.alt).not.toMatch(/Facebook|unknown|professional/i);
```

Update the expected portfolio image-button count to the final gallery length.

- [ ] **Step 5: Run the portfolio test and verify RED**

Run: `npm test -- src/test/portfolio.test.tsx`

Expected: FAIL because `gallery-data.ts` does not yet expose the selected assets.

- [ ] **Step 6: Add gallery records and chapter indexes**

Add one `GalleryItem` per selected photograph with factual alt text and clear `openLabel`. Place each index in an existing `Finish`, `Process`, `Interior`, or `Protection` chapter based only on visible content.

- [ ] **Step 7: Run the portfolio tests and verify GREEN**

Run: `npm test -- src/test/portfolio.test.tsx`

Expected: PASS and the lightbox button count matches `galleryItems.length`.

- [ ] **Step 8: Commit the curated portfolio**

```bash
git add public/images public/images/display src/app/gallery-data.ts src/test/portfolio.test.tsx
git commit -m "Expand portfolio with authentic detailing work"
```

### Task 4: Full Verification and Responsive QA

**Files:**
- Modify only if verification exposes a scoped defect

**Interfaces:**
- Consumes: Tasks 1–3
- Produces: verified production build and rendered route evidence

- [ ] **Step 1: Search for stale service copy**

Run: `rg -ni "spray wax|basic interior|full restoration" src public`

Expected: no customer-facing matches.

- [ ] **Step 2: Run the full automated suite**

Run: `npm test`

Expected: all tests pass with zero failures.

- [ ] **Step 3: Run the production build**

Run: `npm run build`

Expected: TypeScript and Vite complete with exit code 0.

- [ ] **Step 4: Start the production preview**

Run: `npm run preview -- --host 127.0.0.1`

Expected: Vite reports a local preview URL.

- [ ] **Step 5: Verify desktop routes**

At 1440px, inspect `/`, `/portfolio`, and `/contact`. Confirm the complete interior list, hydro sealer copy, all gallery images/lightbox controls, one- and two-service states, disabled third choices, and no console errors or horizontal overflow.

- [ ] **Step 6: Verify mobile routes**

At 390px, inspect `/`, `/portfolio`, and `/contact`. Confirm readable service accordions, gallery crops, checkbox touch targets, re-enabled choices after deselection, interior-photo conditional behavior, and no clipped content or horizontal overflow.

- [ ] **Step 7: Review the final diff**

Run: `git diff HEAD~3 --check`

Expected: no whitespace errors. Inspect `git status --short` and ensure only intentional changes remain.
