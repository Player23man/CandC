# Interior Photo Requirement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove Collin's specialist subtitle and require at least one vehicle photo only for Interior Detailing quote requests.

**Architecture:** Keep the shared contact rail responsible only for Collin's name and phone presentation. Extend `ContactForm` with local file state and a conditional photo validation branch keyed to the existing `Interior Detailing` service name; do not add files to the mailto payload.

**Tech Stack:** React 19, TypeScript, React Testing Library, user-event, Vitest, Vite

## Global Constraints

- Do not display a replacement title beneath Collin's name.
- Vehicle photos are required only when `Interior Detailing` is selected.
- The required state must include a red star, assistive-technology state, and blocking validation.
- Keep the existing mailto workflow and attachment guidance unchanged.
- Do not add dependencies.

---

### Task 1: Simplify Collin's Contact Identity

**Files:**
- Modify: `src/components/SpecialistRail.tsx`
- Test: `src/test/campaign-system.test.tsx`
- Test: `src/test/quote-cta.test.tsx`
- Test: `src/test/contact.test.tsx`

**Interfaces:**
- Consumes: `businessProfile.collin.name`, `businessProfile.collin.phone`, and `businessProfile.collin.tel`
- Produces: `SpecialistRail` links whose accessible name contains Collin and his phone number without a role subtitle

- [ ] **Step 1: Write failing subtitle-removal assertions**

Update the contact and shared-rail tests so they continue to find Collin's phone link and assert that the old title is absent:

```tsx
expect(screen.getByRole("link", { name: /Collin.*815-922-1593/ })).toHaveAttribute("href", "tel:8159221593");
expect(screen.queryByText("Exterior specialist")).not.toBeInTheDocument();
```

- [ ] **Step 2: Run the focused tests and verify RED**

Run:

```bash
npm test -- --run src/test/campaign-system.test.tsx src/test/quote-cta.test.tsx src/test/contact.test.tsx
```

Expected: FAIL because `Exterior specialist` is still rendered by `SpecialistRail`.

- [ ] **Step 3: Remove the subtitle markup**

Change the identity block in `SpecialistRail` to:

```tsx
<span className="specialist-rail__identity">
  <strong>{specialist.name}</strong>
</span>
```

- [ ] **Step 4: Run the focused tests and verify GREEN**

Run the same focused test command. Expected: all focused tests PASS.

- [ ] **Step 5: Commit the contact identity change**

```bash
git add src/components/SpecialistRail.tsx src/test/campaign-system.test.tsx src/test/quote-cta.test.tsx src/test/contact.test.tsx
git commit -m "fix: simplify Collin contact identity"
```

### Task 2: Require Photos for Interior Detailing

**Files:**
- Modify: `src/components/ContactForm.tsx`
- Test: `src/test/contact.test.tsx`

**Interfaces:**
- Consumes: the selected `QuoteFormValues.service` string and `FileList` from `quote-photos`
- Produces: conditional `photos` validation error, required label state, and unchanged mailto output for valid submissions

- [ ] **Step 1: Write failing conditional-photo tests**

Add a test that begins with the optional label, selects Interior Detailing, submits without a file, and verifies the required presentation and error:

```tsx
const user = userEvent.setup();
render(<ContactForm />);

expect(screen.getByText("Optional vehicle photos")).toBeVisible();
await user.selectOptions(screen.getByLabelText(/Service interest/), "Interior Detailing");

const photos = screen.getByLabelText(/Vehicle photos/);
expect(document.querySelector('label[for="quote-photos"] span')).toHaveTextContent("*");
expect(photos).toHaveAttribute("aria-required", "true");

await user.click(screen.getByRole("button", { name: "Get a quote" }));
expect(screen.getByText("Add at least one interior photo.")).toBeVisible();
```

Add a second test that uploads an image, verifies the photo error clears, then switches to Exterior Detail and verifies the field returns to optional:

```tsx
const file = new File(["image"], "interior.jpg", { type: "image/jpeg" });
await user.upload(photos, file);
expect(screen.queryByText("Add at least one interior photo.")).not.toBeInTheDocument();

await user.selectOptions(screen.getByLabelText(/Service interest/), "Exterior Detail");
expect(screen.getByText("Optional vehicle photos")).toBeVisible();
expect(photos).toHaveAttribute("aria-required", "false");
```

- [ ] **Step 2: Run the contact test and verify RED**

Run:

```bash
npm test -- --run src/test/contact.test.tsx
```

Expected: FAIL because the label never becomes required and photo validation does not exist.

- [ ] **Step 3: Add local file state and conditional validation**

Extend errors and state:

```tsx
type QuoteFormErrors = Partial<Record<"name" | "phone" | "email" | "vehicle" | "service" | "details" | "photos", string>>;

const [photoCount, setPhotoCount] = useState(0);
const requiresInteriorPhotos = values.service === "Interior Detailing";
```

Pass `photoCount` to validation and add:

```tsx
if (values.service === "Interior Detailing" && photoCount === 0) {
  errors.photos = "Add at least one interior photo.";
}
```

When the service changes away from Interior Detailing, clear `errors.photos`. When files change, update `photoCount` and clear `errors.photos` when at least one file is selected.

- [ ] **Step 4: Render conditional photo semantics**

Replace the photo label and input with:

```tsx
<label htmlFor="quote-photos">
  {requiresInteriorPhotos ? "Vehicle photos" : "Optional vehicle photos"}
  {requiresInteriorPhotos && <> <span aria-hidden="true">*</span></>}
</label>
<input
  id="quote-photos"
  name="photos"
  type="file"
  accept="image/*"
  multiple
  aria-required={requiresInteriorPhotos}
  aria-invalid={Boolean(errors.photos)}
  aria-describedby={errors.photos ? "quote-photos-error" : undefined}
  onChange={(event) => {
    const nextPhotoCount = event.target.files?.length ?? 0;
    setPhotoCount(nextPhotoCount);
    if (nextPhotoCount > 0) setErrors((current) => ({ ...current, photos: undefined }));
  }}
/>
{errors.photos && <p className="field-error" id="quote-photos-error">{errors.photos}</p>}
```

- [ ] **Step 5: Run the contact test and verify GREEN**

Run the focused contact test. Expected: all contact tests PASS.

- [ ] **Step 6: Run full verification**

Run:

```bash
npm test
npm run build
git diff --check
```

Expected: 0 test failures, successful production build, and no whitespace errors.

- [ ] **Step 7: Verify rendered behavior**

Start the site with `npm run dev -- --host 127.0.0.1`. At desktop and mobile widths, open `/contact`, select Interior Detailing, verify the red star and missing-photo error, upload an image, and confirm the error clears. Confirm another service restores the optional label.

- [ ] **Step 8: Commit the conditional requirement**

```bash
git add src/components/ContactForm.tsx src/test/contact.test.tsx
git commit -m "feat: require photos for interior quotes"
```
