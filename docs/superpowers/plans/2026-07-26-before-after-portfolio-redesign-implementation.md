# C&C Before/After Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the captioned C&C homepage and portfolio galleries with six accessible before/after sliders and a curated, caption-free finished-work gallery.

**Architecture:** Store transformation pairs and finished-work images as separate shared collections in `gallery-data.ts`. A reusable `BeforeAfterSlider` owns only the comparison position and accessible range control; the homepage and portfolio compose that component into their existing editorial layouts while the current lightbox remains responsible for standalone finished-work images.

**Tech Stack:** React 19, TypeScript, Vite, React Router, Vitest, Testing Library, CSS, local JPEG/WebP image assets

## Global Constraints

- Preserve the existing black, warm off-white, restrained red, large-image editorial system.
- Store full-resolution images in `public/images/` and display versions in `public/images/display/`; never hotlink Facebook CDN URLs.
- Render no visible captions beneath homepage or portfolio photography.
- Include exactly six transformations: blue paint correction, driver footwell, cargo area, center console, dark exterior panel, and engine bay.
- Keep the blue Corvette, Supra boat, white pickup, and three strong existing exterior images as finished work.
- The slider must support mouse, touch, pen, keyboard arrows, Home, and End through an accessible range input.
- Preserve the existing campaign heroes, quote CTA, navigation, and finished-work lightbox behavior.
- Do not add dependencies, filters, tabs, carousels, social feeds, service copy, pricing changes, or invented claims.

---

## File Map

- `src/app/gallery-data.ts`: shared transformation-pair and finished-work metadata
- `src/components/BeforeAfterSlider.tsx`: reusable accessible comparison control
- `src/pages/HomePage.tsx`: homepage proof composition
- `src/pages/PortfolioPage.tsx`: transformation sequence, finished-work grid, and lightbox wiring
- `src/components/GalleryChapter.tsx`: delete after the chapter system is removed
- `src/styles/home.css`: homepage proof layout
- `src/styles/portfolio.css`: slider, transformation sequence, finished-work grid, and lightbox styling
- `src/test/before-after-slider.test.tsx`: slider behavior contract
- `src/test/home.test.tsx`: homepage shared-data and caption-free contract
- `src/test/portfolio.test.tsx`: portfolio slider, finished-work, and lightbox contract
- `public/images/*.jpg`: full-resolution Collin assets
- `public/images/display/*.jpg`: display-sized Collin assets

---

### Task 1: Import and Model the Client Photography

**Files:**
- Modify: `src/app/gallery-data.ts`
- Modify: `src/test/portfolio.test.tsx`
- Create: `public/images/cc-paint-before.jpg`
- Create: `public/images/cc-paint-after.jpg`
- Create: `public/images/cc-footwell-before.jpg`
- Create: `public/images/cc-footwell-after.jpg`
- Create: `public/images/cc-cargo-before.jpg`
- Create: `public/images/cc-cargo-after.jpg`
- Create: `public/images/cc-console-before.jpg`
- Create: `public/images/cc-console-after.jpg`
- Create: `public/images/cc-panel-before.jpg`
- Create: `public/images/cc-panel-after.jpg`
- Create: `public/images/cc-engine-before.jpg`
- Create: `public/images/cc-engine-after.jpg`
- Create: `public/images/cc-corvette-finish.jpg`
- Create: `public/images/cc-supra-boat-finish.jpg`
- Create: `public/images/cc-white-pickup-finish.jpg`
- Create matching files under `public/images/display/`

**Interfaces:**
- Produces: `TransformationPair`, `transformationPairs`, `finishedWorkItems`, and `homepageProof`
- `TransformationPair` fields: `id`, `label`, `before`, and `after`
- Each `before`/`after` object fields: `src`, `displaySrc`, and `alt`
- `homepageProof` fields: `transformation` and `supportingItems`

- [ ] **Step 1: Write the failing shared-data test**

Replace the old 13-item/chapter assertions in `src/test/portfolio.test.tsx` with:

```tsx
import {
  finishedWorkItems,
  homepageProof,
  transformationPairs,
} from "../app/gallery-data";

it("models six local transformation pairs and a curated finished-work set", () => {
  expect(transformationPairs.map((pair) => pair.id)).toEqual([
    "paint-correction",
    "driver-footwell",
    "cargo-area",
    "center-console",
    "exterior-panel",
    "engine-bay",
  ]);

  for (const pair of transformationPairs) {
    expect(pair.before.src).toMatch(/^\/images\/cc-/);
    expect(pair.before.displaySrc).toMatch(/^\/images\/display\/cc-/);
    expect(pair.after.src).toMatch(/^\/images\/cc-/);
    expect(pair.after.displaySrc).toMatch(/^\/images\/display\/cc-/);
  }

  expect(finishedWorkItems).toHaveLength(6);
  expect(homepageProof.transformation.id).toBe("paint-correction");
  expect(homepageProof.supportingItems).toHaveLength(2);
});
```

- [ ] **Step 2: Run the focused data test and verify RED**

Run:

```bash
npm test -- src/test/portfolio.test.tsx
```

Expected: FAIL because `transformationPairs`, `finishedWorkItems`, and `homepageProof` are not exported.

- [ ] **Step 3: Copy and name the 15 supplied assets**

Copy the downloaded files with this exact mapping:

```text
49ddf39d7cf1542c.jpg -> cc-paint-before.jpg
8dd85d8ef97baff8.jpg -> cc-paint-after.jpg
690760473fac7a64.jpg -> cc-footwell-before.jpg
00f5f058df5ab38d.jpg -> cc-footwell-after.jpg
13f834e8f6961694.jpg -> cc-cargo-before.jpg
51b9279ac54afa07.jpg -> cc-cargo-after.jpg
dc4bf4c555f3926f.jpg -> cc-console-before.jpg
f3ecb31f026f7194.jpg -> cc-console-after.jpg
8597f718b3b3ebb2.jpg -> cc-panel-before.jpg
25ed483918138c10.jpg -> cc-panel-after.jpg
fdc1daf92eda9d65.jpg -> cc-engine-before.jpg
7732da043d803655.jpg -> cc-engine-after.jpg
1db082f4327b78c2.jpg -> cc-corvette-finish.jpg
69f3b799c762c991.jpg -> cc-supra-boat-finish.jpg
a75c2920d292277d.jpg -> cc-white-pickup-finish.jpg
```

Use the browser asset bundle at:

```text
/var/folders/n4/5wj16kmj249b1yjcpb7ntrvm0000gn/T/browser-use/assets/b7aace17-59f7-4039-afa2-76f2bb0f3619/
```

Convert every source to a true JPEG even when the downloaded file contains WebP
bytes behind a `.jpg` name. Preserve the original dimensions in `public/images/`
and create display files with a maximum 1600-pixel long edge while preserving
aspect ratio and JPEG quality.

- [ ] **Step 4: Implement the shared data collections**

Use this shape in `src/app/gallery-data.ts`:

```ts
export type GalleryImage = {
  src: string;
  displaySrc: string;
  alt: string;
};

export type TransformationPair = {
  id: string;
  label: string;
  before: GalleryImage;
  after: GalleryImage;
};

export type GalleryItem = GalleryImage & {
  openLabel: string;
  className?: string;
};

export const transformationPairs: TransformationPair[] = [
  {
    id: "paint-correction",
    label: "Blue paint correction before and after",
    before: {
      src: "/images/cc-paint-before.jpg",
      displaySrc: "/images/display/cc-paint-before.jpg",
      alt: "Blue painted panel with visible surface haze before correction",
    },
    after: {
      src: "/images/cc-paint-after.jpg",
      displaySrc: "/images/display/cc-paint-after.jpg",
      alt: "Blue painted panel with a clearer reflective finish after correction",
    },
  },
  {
    id: "driver-footwell",
    label: "Driver footwell before and after",
    before: {
      src: "/images/cc-footwell-before.jpg",
      displaySrc: "/images/display/cc-footwell-before.jpg",
      alt: "Driver footwell with visible dirt before detailing",
    },
    after: {
      src: "/images/cc-footwell-after.jpg",
      displaySrc: "/images/display/cc-footwell-after.jpg",
      alt: "Driver footwell after interior detailing",
    },
  },
  {
    id: "cargo-area",
    label: "Cargo area before and after",
    before: {
      src: "/images/cc-cargo-before.jpg",
      displaySrc: "/images/display/cc-cargo-before.jpg",
      alt: "Cargo area with visible debris before detailing",
    },
    after: {
      src: "/images/cc-cargo-after.jpg",
      displaySrc: "/images/display/cc-cargo-after.jpg",
      alt: "Cargo area after interior detailing",
    },
  },
  {
    id: "center-console",
    label: "Center console before and after",
    before: {
      src: "/images/cc-console-before.jpg",
      displaySrc: "/images/display/cc-console-before.jpg",
      alt: "Center console with visible residue before detailing",
    },
    after: {
      src: "/images/cc-console-after.jpg",
      displaySrc: "/images/display/cc-console-after.jpg",
      alt: "Center console after interior detailing",
    },
  },
  {
    id: "exterior-panel",
    label: "Dark exterior panel before and after",
    before: {
      src: "/images/cc-panel-before.jpg",
      displaySrc: "/images/display/cc-panel-before.jpg",
      alt: "Dark exterior panel with visible surface marks before correction",
    },
    after: {
      src: "/images/cc-panel-after.jpg",
      displaySrc: "/images/display/cc-panel-after.jpg",
      alt: "Dark exterior panel with a clearer finish after correction",
    },
  },
  {
    id: "engine-bay",
    label: "Engine bay before and after",
    before: {
      src: "/images/cc-engine-before.jpg",
      displaySrc: "/images/display/cc-engine-before.jpg",
      alt: "Engine bay with visible dust before detailing",
    },
    after: {
      src: "/images/cc-engine-after.jpg",
      displaySrc: "/images/display/cc-engine-after.jpg",
      alt: "Engine bay after detailing",
    },
  },
];
```

Define `finishedWorkItems` in this order:

1. Blue Corvette
2. Black Porsche Taycan hand wash (`gallery-suv.jpg`)
3. Supra boat
4. Orange coupe (`gallery-coupe.jpg`)
5. White pickup
6. Red performance vehicle (`gallery-sport.jpg`)

Define:

```ts
export const homepageProof = {
  transformation: transformationPairs[0],
  supportingItems: [finishedWorkItems[0], finishedWorkItems[1]],
} as const;
```

- [ ] **Step 5: Run the data test and verify GREEN**

Run:

```bash
npm test -- src/test/portfolio.test.tsx
```

Expected: the shared-data test passes; page-render tests may remain red until later tasks.

- [ ] **Step 6: Commit the asset and data slice**

```bash
git add src/app/gallery-data.ts src/test/portfolio.test.tsx public/images public/images/display
git commit -m "feat: add detailing transformation photo data"
```

---

### Task 2: Build the Accessible Comparison Slider

**Files:**
- Create: `src/components/BeforeAfterSlider.tsx`
- Create: `src/test/before-after-slider.test.tsx`
- Modify: `src/styles/portfolio.css`

**Interfaces:**
- Consumes: `TransformationPair`
- Produces: `BeforeAfterSlider({ pair, priority?, className? })`
- Uses CSS custom property: `--comparison-position`

- [ ] **Step 1: Write the failing component test**

Create `src/test/before-after-slider.test.tsx`:

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { transformationPairs } from "../app/gallery-data";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";

describe("BeforeAfterSlider", () => {
  it("updates the visible comparison position through an accessible range input", () => {
    const { container } = render(
      <BeforeAfterSlider pair={transformationPairs[0]} />,
    );

    const slider = screen.getByRole("slider", {
      name: "Blue paint correction before and after",
    });
    const comparison = container.querySelector(".before-after");

    expect(slider).toHaveValue("50");
    expect(comparison).toHaveStyle({ "--comparison-position": "50%" });

    fireEvent.change(slider, { target: { value: "72" } });

    expect(slider).toHaveValue("72");
    expect(comparison).toHaveStyle({ "--comparison-position": "72%" });
  });

  it("renders factual before and after images with overlay labels", () => {
    render(<BeforeAfterSlider pair={transformationPairs[0]} />);

    expect(screen.getByAltText(/surface haze before correction/i)).toBeVisible();
    expect(screen.getByAltText(/reflective finish after correction/i)).toBeVisible();
    expect(screen.getByText("Before")).toBeVisible();
    expect(screen.getByText("After")).toBeVisible();
  });
});
```

- [ ] **Step 2: Run the slider test and verify RED**

Run:

```bash
npm test -- src/test/before-after-slider.test.tsx
```

Expected: FAIL because `BeforeAfterSlider` does not exist.

- [ ] **Step 3: Implement the minimal slider component**

Create `src/components/BeforeAfterSlider.tsx`:

```tsx
import { useState, type CSSProperties } from "react";
import type { TransformationPair } from "../app/gallery-data";

type BeforeAfterSliderProps = {
  pair: TransformationPair;
  priority?: boolean;
  className?: string;
};

export function BeforeAfterSlider({
  pair,
  priority = false,
  className = "",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const style = {
    "--comparison-position": `${position}%`,
  } as CSSProperties;

  return (
    <figure
      className={`before-after ${className}`.trim()}
      style={style}
      data-comparison-id={pair.id}
    >
      <img
        className="before-after__image before-after__image--after"
        src={pair.after.displaySrc}
        alt={pair.after.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
      <div className="before-after__before-layer">
        <img
          className="before-after__image before-after__image--before"
          src={pair.before.displaySrc}
          alt={pair.before.alt}
          loading={priority ? "eager" : "lazy"}
        />
      </div>
      <span className="before-after__label before-after__label--before">Before</span>
      <span className="before-after__label before-after__label--after">After</span>
      <span className="before-after__divider" aria-hidden="true">
        <span className="before-after__handle" />
      </span>
      <input
        className="before-after__range"
        type="range"
        min="0"
        max="100"
        value={position}
        aria-label={pair.label}
        onChange={(event) => setPosition(Number(event.currentTarget.value))}
      />
    </figure>
  );
}
```

Keep both factual before and after images in the accessibility tree. The clipped
before layer must not be `aria-hidden`.

- [ ] **Step 4: Add restrained slider styling**

In `src/styles/portfolio.css`, add:

```css
.before-after {
  --comparison-position: 50%;
  position: relative;
  min-height: 360px;
  margin: 0;
  overflow: hidden;
  background: #111;
  isolation: isolate;
  user-select: none;
}

.before-after__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.before-after__image--after {
  position: absolute;
  inset: 0;
}

.before-after__before-layer {
  position: absolute;
  inset: 0;
  clip-path: inset(0 calc(100% - var(--comparison-position)) 0 0);
}

.before-after__image--before {
  position: absolute;
  inset: 0;
  max-width: none;
}

.before-after__divider {
  position: absolute;
  z-index: 3;
  top: 0;
  bottom: 0;
  left: var(--comparison-position);
  width: 2px;
  background: var(--signal);
  transform: translateX(-1px);
}

.before-after__range {
  position: absolute;
  z-index: 4;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: ew-resize;
}
```

Add the compact handle, overlaid labels, `:focus-visible` ring, responsive
aspect ratios, and 44-pixel minimum effective touch target without adding a
card shell.

- [ ] **Step 5: Run the slider test and verify GREEN**

Run:

```bash
npm test -- src/test/before-after-slider.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Commit the slider slice**

```bash
git add src/components/BeforeAfterSlider.tsx src/styles/portfolio.css src/test/before-after-slider.test.tsx
git commit -m "feat: add accessible before-after slider"
```

---

### Task 3: Replace the Portfolio Chapters

**Files:**
- Modify: `src/pages/PortfolioPage.tsx`
- Modify: `src/styles/portfolio.css`
- Modify: `src/test/portfolio.test.tsx`
- Delete: `src/components/GalleryChapter.tsx`

**Interfaces:**
- Consumes: `transformationPairs`, `finishedWorkItems`, `BeforeAfterSlider`, `GalleryLightbox`
- Produces: portfolio regions named `Detailing transformations` and `Finished work`

- [ ] **Step 1: Write the failing portfolio render tests**

Add these expectations:

```tsx
it("renders six editorial comparisons and a caption-free finished-work grid", () => {
  render(
    <MemoryRouter>
      <PortfolioPage />
    </MemoryRouter>,
  );

  const transformations = screen.getByRole("region", {
    name: "Detailing transformations",
  });
  expect(within(transformations).getAllByRole("slider")).toHaveLength(6);
  expect(screen.getByRole("heading", { name: "Transformations" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Finished work" })).toBeVisible();
  expect(document.querySelectorAll(".portfolio-page figcaption")).toHaveLength(0);
  expect(
    screen.getAllByRole("button", { name: /Open .* detail/ }),
  ).toHaveLength(finishedWorkItems.length + 1);
});
```

Update the existing lightbox test to open `Open blue Corvette detail`, then
assert ArrowRight advances to the retained Porsche hand-wash image.

- [ ] **Step 2: Run the portfolio test and verify RED**

Run:

```bash
npm test -- src/test/portfolio.test.tsx
```

Expected: FAIL because the old chapters still render and no sliders exist.

- [ ] **Step 3: Implement the transformation sequence and finished-work grid**

In `PortfolioPage.tsx`:

```tsx
import { finishedWorkItems, transformationPairs } from "../app/gallery-data";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";

<section
  className="portfolio-transformations"
  aria-labelledby="transformations-title"
  aria-label="Detailing transformations"
>
  <div className="shell">
    <h2 id="transformations-title">Transformations</h2>
    <div className="transformation-list">
      {transformationPairs.map((pair, index) => (
        <Reveal className="transformation-list__item" key={pair.id}>
          <BeforeAfterSlider pair={pair} priority={index === 0} />
        </Reveal>
      ))}
    </div>
  </div>
</section>

<section className="finished-work" aria-labelledby="finished-work-title">
  <div className="shell">
    <h2 id="finished-work-title">Finished work</h2>
    <div className="finished-work__grid">
      {finishedWorkItems.map((item, index) => (
        <Reveal className="finished-work__item" key={item.src}>
          <button
            type="button"
            aria-label={item.openLabel}
            onClick={() => setActiveIndex(index)}
          >
            <img src={item.displaySrc} alt={item.alt} loading="lazy" />
          </button>
        </Reveal>
      ))}
    </div>
  </div>
</section>
```

Wire the hero and `GalleryLightbox` to `finishedWorkItems`, not the removed
`galleryItems`.

- [ ] **Step 4: Replace chapter CSS with editorial sequence CSS**

Remove `.gallery-chapter*` rules. Add:

- A warm off-white transformation section with large black headings
- Six large slider rows with alternating `max-width`, inline alignment, and
  generous vertical spacing
- A black finished-work section with a responsive asymmetrical grid
- No `figcaption` rules
- Image buttons with visible focus treatment and restrained hover scale
- Mobile single-column layout with stable slider aspect ratios

- [ ] **Step 5: Delete the unused chapter component**

Delete `src/components/GalleryChapter.tsx` and confirm no imports remain:

```bash
rg -n "GalleryChapter|portfolioChapters|galleryItems" src
```

Expected: no production imports of the removed chapter system.

- [ ] **Step 6: Run the portfolio tests and verify GREEN**

Run:

```bash
npm test -- src/test/portfolio.test.tsx src/test/before-after-slider.test.tsx
```

Expected: PASS.

- [ ] **Step 7: Commit the portfolio slice**

```bash
git add src/pages/PortfolioPage.tsx src/styles/portfolio.css src/test/portfolio.test.tsx src/components/GalleryChapter.tsx
git commit -m "feat: redesign detailing portfolio around transformations"
```

---

### Task 4: Replace the Homepage Captioned Spread

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/styles/home.css`
- Modify: `src/test/home.test.tsx`

**Interfaces:**
- Consumes: `homepageProof`, `BeforeAfterSlider`
- Produces: one dominant paint-correction comparison and two supporting stills

- [ ] **Step 1: Write the failing homepage test**

Add:

```tsx
it("uses the shared paint comparison and renders no image captions", () => {
  const { container } = render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

  expect(
    screen.getByRole("slider", {
      name: "Blue paint correction before and after",
    }),
  ).toBeVisible();
  expect(container.querySelector(".home-proof")).toBeInTheDocument();
  expect(container.querySelectorAll(".home-portfolio figcaption")).toHaveLength(0);
  expect(
    screen.getByAltText("Blue Corvette with a reflective exterior finish"),
  ).toBeVisible();
});
```

- [ ] **Step 2: Run the homepage test and verify RED**

Run:

```bash
npm test -- src/test/home.test.tsx
```

Expected: FAIL because the captioned `finish-spread` still renders.

- [ ] **Step 3: Implement the slider-led homepage proof**

Replace `finish-spread` with:

```tsx
<div className="home-proof">
  <Reveal className="home-proof__comparison">
    <BeforeAfterSlider pair={homepageProof.transformation} />
  </Reveal>
  <div className="home-proof__supporting">
    {homepageProof.supportingItems.map((item, index) => (
      <Reveal
        className={`home-proof__still home-proof__still--${index + 1}`}
        delay={(index + 1) * 0.06}
        key={item.src}
      >
        <img src={item.displaySrc} alt={item.alt} loading="lazy" />
      </Reveal>
    ))}
  </div>
</div>
```

Import `homepageProof` and `BeforeAfterSlider`. Keep the heading and portfolio
link unchanged.

- [ ] **Step 4: Replace `finish-spread` CSS**

Create one dominant slider column and an offset supporting-image column on
desktop. Stack the slider and stills cleanly on mobile. Keep the section black,
remove all caption spacing, and use existing motion/reveal patterns without new
decorative wrappers.

- [ ] **Step 5: Run homepage and portfolio tests and verify GREEN**

Run:

```bash
npm test -- src/test/home.test.tsx src/test/portfolio.test.tsx src/test/before-after-slider.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Commit the homepage slice**

```bash
git add src/pages/HomePage.tsx src/styles/home.css src/test/home.test.tsx
git commit -m "feat: add homepage transformation proof"
```

---

### Task 5: Full Verification and Rendered QA

**Files:**
- Modify only if verification finds an in-scope defect

**Interfaces:**
- Consumes: completed homepage, portfolio, slider, data, and assets
- Produces: verified desktop/mobile implementation

- [ ] **Step 1: Run the full test suite**

```bash
npm test
```

Expected: all Vitest tests pass with no unhandled errors.

- [ ] **Step 2: Run the production build**

```bash
npm run build
```

Expected: TypeScript and Vite complete successfully.

- [ ] **Step 3: Start the local preview**

```bash
npm run dev -- --host 127.0.0.1
```

Verify the actual URL responds before browser QA.

- [ ] **Step 4: Verify desktop `/` and `/portfolio`**

At approximately 1440 pixels wide, check:

- Correct image pairing and crop alignment at 0%, 50%, and 100%
- Mouse drag/click behavior
- Focus ring and Arrow/Home/End keyboard behavior
- No visible text beneath images
- Finished-work lightbox opens, advances, reverses, and closes
- Existing hero, service board, navigation, quote CTA, and footer remain intact
- No console errors or horizontal overflow

- [ ] **Step 5: Verify mobile `/` and `/portfolio`**

At approximately 390 pixels wide, check:

- Slider touch target is comfortable and does not block page scrolling outside
  the control
- Images remain aligned with no exposed blank area
- `Before`/`After` labels remain legible
- Finished-work grid becomes a clean single column
- No clipped controls, captions, or horizontal overflow

- [ ] **Step 6: Inspect the final diff and repository state**

```bash
git diff --check
git status --short --branch
git log -5 --oneline
```

Expected: no whitespace errors and only intentional work remains.

- [ ] **Step 7: Commit any verification-only corrections**

If QA required fixes, stage only the corrected files shown by
`git status --short`, then commit them with
`git commit -m "fix: polish before-after portfolio behavior"`.

If no corrections were needed, do not create an empty commit.
