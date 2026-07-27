# C&C Detailing Favicon Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the rectangular wordmark favicon with a compact `C&C` mark that stays legible at browser-tab sizes.

**Architecture:** Create one scalable SVG source using an embedded Archivo font and the approved black, white, and red palette. Generate a PNG fallback from the same source, then reference both assets from the static HTML head.

**Tech Stack:** SVG, embedded WOFF2 font data, PNG fallback, Vite static assets, HTML metadata

## Global Constraints

- Use a square black background.
- Set `C&C` in bold italic white Archivo.
- Use one restrained red underline.
- Include no vehicle illustration, flag texture, phone number, border, gradient, or extra wording.
- Verify readability at 16, 32, and 48 pixels.

---

### Task 1: Create and wire the favicon assets

**Files:**
- Create: `public/favicon.svg`
- Create: `public/favicon-32.png`
- Modify: `index.html`

**Interfaces:**
- Consumes: `@fontsource-variable/archivo/files/archivo-latin-wght-italic.woff2`
- Produces: `/favicon.svg` as the primary icon and `/favicon-32.png` as the PNG fallback

- [ ] **Step 1: Verify the current favicon does not meet the approved asset contract**

Run:

```bash
rg -n 'favicon\\.svg|favicon-32\\.png' index.html
```

Expected: no matches.

- [ ] **Step 2: Create the SVG source**

Create a 64 × 64 SVG with a black rounded-square background, embedded Archivo italic font, centered white `C&C` lettering at a heavy weight, and a short red underline beneath the letters.

- [ ] **Step 3: Generate the PNG fallback**

Render `public/favicon.svg` to `public/favicon-32.png` at 32 × 32 pixels. Confirm the PNG reports exactly 32 × 32 pixels.

- [ ] **Step 4: Wire both assets into the document head**

Replace the current JPEG icon link with:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
```

- [ ] **Step 5: Verify the implementation**

Run:

```bash
npm test
npm run build
rg -n 'favicon\\.svg|favicon-32\\.png' dist/index.html
test -f dist/favicon.svg
test -f dist/favicon-32.png
```

Expected: 32 tests pass, the Vite build succeeds, both links appear in built HTML, and both files exist in `dist/`.

- [ ] **Step 6: Commit and deploy**

```bash
git add public/favicon.svg public/favicon-32.png index.html docs/superpowers/plans/2026-07-27-cc-favicon-implementation.md
git commit -m "Add branded C&C favicon"
git push origin main
```

Confirm the resulting Vercel production deployment is `READY`, then request both favicon URLs and verify HTTP 200 responses.
