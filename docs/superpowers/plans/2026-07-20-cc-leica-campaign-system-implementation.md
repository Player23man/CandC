# C&C Leica Campaign System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework Home, Portfolio, and Contact into one Leica-led photographic campaign system with Polestar-style service interaction while preserving all real C&C content and behavior.

**Architecture:** Add two focused shared presentation primitives (`CampaignHero` and `SpecialistRail`), then recompose each route around them. Keep business facts in `site-data.ts`, portfolio facts in `gallery-data.ts`, local component state for the service selector/lightbox/form, and native CSS for the art direction. Render only the active responsive service presentation so hidden desktop/mobile branches do not download duplicate imagery.

**Tech Stack:** React 19, TypeScript, React Router 7, Motion, Phosphor Icons, native CSS, Vitest, Testing Library, in-app Browser QA, Lighthouse

## Global Constraints

- Execute inline with no subagents.
- Work directly on `main`, as previously approved by the user.
- Leica is the primary layout reference; Polestar is secondary and limited to interaction precision.
- Preserve all service names, prices, price notes, specialists, phone numbers, email, location, review wording, appointment notes, routes, gallery assets, form validation, and mailto behavior.
- Add no customer identity, star rating, review platform, project name, vehicle specification, award, statistic, or unsupported service claim.
- Use only Archivo Variable, the existing near-black canvas, one warm off-white print surface, and C&C red as a signal.
- Use no gradients, glass, rounded card system, numbered sections, generic feature grid, full-width red background, autoplay media, scroll hijacking, or decorative parallax.
- Preserve semantic HTML, keyboard behavior, focus visibility, meaningful alt text, reduced motion, and 44-pixel minimum touch targets.
- Verify at 390x844, 768x900, 1024x900, and 1440x1000.
- Maintain Lighthouse Accessibility, Best Practices, and SEO at 100.

---

### Task 1: Build the shared campaign primitives and shell treatment

**Files:**
- Create: `src/components/CampaignHero.tsx`
- Create: `src/components/SpecialistRail.tsx`
- Create: `src/test/campaign-system.test.tsx`
- Modify: `src/components/SiteHeader.tsx`
- Modify: `src/components/SiteFooter.tsx`
- Modify: `src/styles/global.css`
- Modify: `src/styles/layout.css`

**Interfaces:**
- Consumes: `businessProfile` and `Specialist` from `src/app/site-data.ts`.
- Produces: `CampaignHero(props: CampaignHeroProps): JSX.Element`.
- Produces: `SpecialistRail({ variant, className }: SpecialistRailProps): JSX.Element` where `variant` is `"full" | "phones"` and defaults to `"full"`.
- Preserves: `SiteHeader(): JSX.Element` and `SiteFooter(): JSX.Element` public interfaces.

- [ ] **Step 1: Write the failing shared-component tests**

Create `src/test/campaign-system.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { CampaignHero } from "../components/CampaignHero";
import { SpecialistRail } from "../components/SpecialistRail";

describe("campaign system", () => {
  it("renders an image campaign with a labelled title and action slot", () => {
    render(
      <MemoryRouter>
        <CampaignHero
          layout="home"
          title="Finished with intent."
          description="Shop and mobile detailing in Channahon."
          image={{ src: "/images/detail-process.jpg", alt: "White performance car under studio lighting" }}
          actions={<a href="/contact">Get a quote</a>}
        />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Finished with intent." })).toBeVisible();
    expect(screen.getByAltText("White performance car under studio lighting")).toBeVisible();
    expect(screen.getByRole("link", { name: "Get a quote" })).toHaveAttribute("href", "/contact");
  });

  it("renders every real contact destination in the full specialist rail", () => {
    render(<SpecialistRail />);

    expect(screen.getByRole("link", { name: /Collin.*815-922-1593/ })).toHaveAttribute("href", "tel:8159221593");
    expect(screen.getByRole("link", { name: /Caleb.*815-409-5501/ })).toHaveAttribute("href", "tel:8154095501");
    expect(screen.getByRole("link", { name: "candcdetailing25@gmail.com" })).toHaveAttribute("href", "mailto:candcdetailing25@gmail.com");
    expect(screen.getByRole("link", { name: "Facebook" })).toHaveAttribute("target", "_blank");
  });
});
```

- [ ] **Step 2: Run the focused test and confirm missing-component failures**

Run: `npm test -- src/test/campaign-system.test.tsx`

Expected: FAIL because `CampaignHero.tsx` and `SpecialistRail.tsx` do not exist.

- [ ] **Step 3: Implement `CampaignHero`**

Create the following typed interface and structure in `src/components/CampaignHero.tsx`:

```tsx
import type { ReactNode } from "react";

type CampaignImage = {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  fetchPriority?: "high" | "low" | "auto";
};

export type CampaignHeroProps = {
  layout: "home" | "portfolio" | "contact";
  title: string;
  description: string;
  image?: CampaignImage;
  imageAction?: { label: string; onClick: () => void };
  actions?: ReactNode;
};

export function CampaignHero({ layout, title, description, image, imageAction, actions }: CampaignHeroProps) {
  const titleId = `campaign-${layout}-title`;
  const imageElement = image ? (
    <img
      className="campaign-hero__image"
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.sizes}
      alt={image.alt}
      fetchPriority={image.fetchPriority}
    />
  ) : null;

  return (
    <header className={`campaign-hero campaign-hero--${layout}`} aria-labelledby={titleId}>
      {imageAction && imageElement ? (
        <button className="campaign-hero__image-action" type="button" aria-label={imageAction.label} onClick={imageAction.onClick}>
          {imageElement}
        </button>
      ) : (
        imageElement
      )}
      {image && <div className="campaign-hero__scrim" aria-hidden="true" />}
      <div className="shell campaign-hero__content">
        <h1 id={titleId}>{title}</h1>
        <p>{description}</p>
        {actions && <div className="campaign-hero__actions">{actions}</div>}
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Implement `SpecialistRail`**

Create `src/components/SpecialistRail.tsx` using `businessProfile.collin`, `businessProfile.caleb`, `businessProfile.email`, and `businessProfile.facebook`. Each specialist link must render name, role, phone number, and one Phosphor `Phone` icon. Render email and Facebook only when `variant === "full"`. Use `EnvelopeSimple` and `FacebookLogo` from the same icon family.

- [ ] **Step 5: Recompose the header and footer shell**

Keep header routes, mobile menu state, skip link, and quote route unchanged. Refine markup only where needed for the new class structure. Update `layout.css` so the header feels like minimal campaign chrome: near-black solid surface, thin line, smaller wordmark, precise active red rule, and no blur/glass. Refine the footer into one strong brand/contact index with square edges and no card wrappers.

- [ ] **Step 6: Add campaign tokens and base styles**

In `global.css`, add:

```css
:root {
  --print: #ede9e1;
  --print-text: #101010;
  --signal-text: #e13b4d;
}
```

Add the shared `.campaign-hero` family to `layout.css`. Home is full viewport with image; Portfolio is an asymmetric image/text composition; Contact is a large black text field with no image. All variants use square edges, no gradients, and responsive type with `clamp()`.

- [ ] **Step 7: Run shared and existing header tests**

Run: `npm test -- src/test/campaign-system.test.tsx src/test/header.test.tsx`

Expected: all focused tests pass.

- [ ] **Step 8: Commit**

```bash
git add src/components/CampaignHero.tsx src/components/SpecialistRail.tsx src/components/SiteHeader.tsx src/components/SiteFooter.tsx src/styles/global.css src/styles/layout.css src/test/campaign-system.test.tsx
git commit -m "feat: add Leica campaign primitives"
```

---

### Task 2: Rebuild the service selector as a responsive product chapter

**Files:**
- Modify: `src/components/ServiceBoard.tsx`
- Modify: `src/styles/home.css`
- Modify: `src/test/service-board.test.tsx`
- Modify: `src/test/setup.ts`

**Interfaces:**
- Consumes: `services: Service[]` from `src/app/site-data.ts` and the existing four image mappings.
- Produces: the unchanged `ServiceBoard(): JSX.Element` public interface.
- Behavior: desktop ARIA tabs at 768 pixels and wider; mobile accordion below 768 pixels; one active service in both modes.

- [ ] **Step 1: Replace the test matchMedia stub with a configurable viewport stub**

In `src/test/setup.ts`, make `window.matchMedia` return `matches: false` for `(min-width: 768px)` by default and continue returning `true` for `prefers-reduced-motion`. Export no helper from setup. Individual tests may override `window.matchMedia` before render with the same complete `MediaQueryList` shape.

- [ ] **Step 2: Rewrite the desktop tests to fail against conditional rendering**

Add this helper to `service-board.test.tsx`:

```tsx
function setDesktopViewport(desktop: boolean) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: (query: string): MediaQueryList => ({
      matches: query === "(min-width: 768px)" ? desktop : query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false
    })
  });
}
```

Call `setDesktopViewport(true)` before desktop tab tests and `setDesktopViewport(false)` before the accordion test. Add:

```tsx
it("supports Home and End in the desktop service index", async () => {
  setDesktopViewport(true);
  const user = userEvent.setup();
  render(<ServiceBoard />);
  const exterior = screen.getByRole("tab", { name: /Exterior Detail/ });
  exterior.focus();

  await user.keyboard("{End}");
  expect(screen.getByRole("tab", { name: /Ceramic Coating/ })).toHaveFocus();
  await user.keyboard("{Home}");
  expect(exterior).toHaveFocus();
});
```

Add an assertion that desktop renders exactly one service image and mobile renders exactly one service image so hidden responsive branches cannot duplicate downloads.

- [ ] **Step 3: Run the focused test and confirm failure**

Run: `npm test -- src/test/service-board.test.tsx`

Expected: FAIL because both current responsive branches remain in the DOM and the test setup is not mode-specific.

- [ ] **Step 4: Add the responsive-rendering hook inside `ServiceBoard.tsx`**

Implement:

```tsx
function useDesktopServiceBoard() {
  const query = "(min-width: 768px)";
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    setIsDesktop(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isDesktop;
}
```

Import `useEffect`. Render only the desktop product selector or the mobile accordion based on this value. Keep `activeId` shared across viewport changes.

- [ ] **Step 5: Recompose the desktop product selector**

Use a horizontal tab list followed by one active product stage. The active stage contains one dominant image, service title/description, starting price, included-work list, and pricing/options list. Preserve all ARIA tab attributes, arrow wrapping, Home/End behavior, and panel labelling.

- [ ] **Step 6: Preserve the mobile accordion**

Keep real buttons with `aria-expanded` and unique panel IDs. Render one active service panel immediately after its trigger and ensure exactly one service image is present.

- [ ] **Step 7: Replace the service-board CSS**

In `home.css`, remove the current unequal sidebar/panel desktop composition. Build:

- A thin horizontal index at desktop with equal structural columns but text aligned left.
- A single image-dominant product stage below it.
- A two-column information band below or beside the image at large desktop widths.
- Red limited to active rule, price, bullets, and focus.
- Mobile accordion with square edges and no filled service cards.
- Crossfades/short reveals between 240 and 400 ms, disabled by the existing reduced-motion rule.

- [ ] **Step 8: Run focused and full tests**

Run: `npm test -- src/test/service-board.test.tsx && npm test`

Expected: all tests pass with one responsive branch and one service image rendered.

- [ ] **Step 9: Commit**

```bash
git add src/components/ServiceBoard.tsx src/styles/home.css src/test/service-board.test.tsx src/test/setup.ts
git commit -m "feat: rebuild services as product selector"
```

---

### Task 3: Recompose Home into Leica campaign chapters

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/components/QuoteCta.tsx`
- Modify: `src/styles/home.css`
- Modify: `src/test/home.test.tsx`
- Modify: `src/test/quote-cta.test.tsx`

**Interfaces:**
- Consumes: `CampaignHero`, `ServiceBoard`, `SpecialistRail`, existing routes, and existing images.
- Produces: the unchanged `HomePage(): JSX.Element` and `QuoteCta(): JSX.Element` public interfaces.

- [ ] **Step 1: Write failing Home composition assertions**

In `home.test.tsx`, assert:

```tsx
expect(document.querySelector(".campaign-hero--home")).toBeInTheDocument();
expect(screen.getByRole("heading", { name: "Finished with intent." })).toBeVisible();
expect(screen.getByRole("heading", { name: "Choose the work your vehicle needs." })).toBeVisible();
expect(screen.getByRole("heading", { name: "The finish speaks for itself." })).toBeVisible();
expect(document.querySelector(".testimonial--print")).toBeInTheDocument();
expect(screen.getByText("Verified customer review")).toBeVisible();
expect(screen.getByText("2022 Tucson owner")).toBeVisible();
```

In `quote-cta.test.tsx`, add an assertion that the component contains a `.specialist-rail--phones` instance and retains both specialist phone links.

- [ ] **Step 2: Run focused tests and confirm composition failures**

Run: `npm test -- src/test/home.test.tsx src/test/quote-cta.test.tsx`

Expected: FAIL because Home does not use `CampaignHero`, the review lacks the print modifier, and QuoteCta does not use `SpecialistRail`.

- [ ] **Step 3: Replace the Home hero with `CampaignHero`**

Use:

```tsx
<CampaignHero
  layout="home"
  title="Finished with intent."
  description="Shop and mobile detailing, paint correction, and ceramic coating in Channahon."
  image={{
    src: "/images/detail-process.jpg",
    srcSet: "/images/detail-process-960.jpg 960w, /images/detail-process.jpg 1600w",
    sizes: "100vw",
    alt: "White performance car under studio lighting",
    fetchPriority: "high"
  }}
  actions={
    <>
      <Link className="button button--primary" to="/contact">Get a quote</Link>
      <Link className="hero-link" to="/portfolio">
        View our work
        <ArrowRight size={19} weight="bold" aria-hidden="true" />
      </Link>
    </>
  }
/>
```

Preserve exact link text and routes.

- [ ] **Step 4: Recompose the featured-finish chapter**

Keep `The finish speaks for itself.` and the route to `/portfolio`. Use one dominant `gallery-suv` image and two supporting `gallery-sport` and `ceramic-display` crops in an asymmetric campaign spread. Add factual visible captions derived from the current alt text; do not add project or model names.

- [ ] **Step 5: Move the review onto the print surface**

Add `testimonial--print`. Keep the approved excerpt and attribution exactly. Use black type and one red rule with no rating, name, platform, or date.

- [ ] **Step 6: Simplify QuoteCta**

Keep the heading, appointment/mileage note, `/contact` quote link, and both phone destinations. Replace duplicate specialist markup with `<SpecialistRail variant="phones" />`.

- [ ] **Step 7: Replace Home chapter CSS**

Remove superseded hero and portfolio-preview rules. Style the shared campaign hero through `layout.css` and add only Home-specific chapter composition to `home.css`. Ensure the service section, feature spread, print review, and contact close use visibly different rhythms without rounded cards or gradients.

- [ ] **Step 8: Generate the responsive hero derivative**

Run:

```bash
sips -Z 960 -s format jpeg -s formatOptions 82 public/images/detail-process.jpg --out public/images/detail-process-960.jpg
```

Verify with `sips -g pixelWidth -g pixelHeight public/images/detail-process-960.jpg`; expected width is at most 960 pixels and aspect ratio matches the source.

- [ ] **Step 9: Run focused tests and build**

Run: `npm test -- src/test/home.test.tsx src/test/quote-cta.test.tsx src/test/service-board.test.tsx && npm run build`

Expected: all focused tests pass and Vite builds successfully.

- [ ] **Step 10: Commit**

```bash
git add src/pages/HomePage.tsx src/components/QuoteCta.tsx src/styles/home.css src/test/home.test.tsx src/test/quote-cta.test.tsx public/images/detail-process-960.jpg
git commit -m "feat: recompose home as campaign chapters"
```

---

### Task 4: Turn Portfolio into a curated visual essay

**Files:**
- Create: `src/components/GalleryChapter.tsx`
- Create: `public/images/display/gallery-coupe.jpg`
- Create: `public/images/display/gallery-suv.jpg`
- Create: `public/images/display/ceramic-display.jpg`
- Create: `public/images/display/gallery-sport.jpg`
- Create: `public/images/display/detail-exterior.jpg`
- Create: `public/images/display/detail-process.jpg`
- Modify: `src/app/gallery-data.ts`
- Modify: `src/pages/PortfolioPage.tsx`
- Modify: `src/styles/portfolio.css`
- Modify: `src/test/portfolio.test.tsx`

**Interfaces:**
- Extends: `GalleryItem` with `displaySrc: string` while preserving `src` as the full-resolution lightbox asset.
- Produces: `GalleryChapter({ id, title, items, layout, onOpen }: GalleryChapterProps): JSX.Element`.
- Preserves: `GalleryLightbox` props and keyboard behavior.

- [ ] **Step 1: Write failing data and composition tests**

In `portfolio.test.tsx`, add:

```tsx
expect(document.querySelector(".campaign-hero--portfolio")).toBeInTheDocument();
expect(screen.getByRole("heading", { name: "Finish" })).toBeVisible();
expect(screen.getByRole("heading", { name: "Process" })).toBeVisible();
expect(screen.getByRole("heading", { name: "Protection" })).toBeVisible();
expect(screen.getAllByRole("button", { name: /Open .* detail/ })).toHaveLength(6);
```

Keep the lightbox open, focus, Arrow Right, and Escape assertions. Add a data assertion that each `galleryItems` record has a `/images/display/` `displaySrc` while retaining its original `src`.

- [ ] **Step 2: Run the focused test and confirm failure**

Run: `npm test -- src/test/portfolio.test.tsx`

Expected: FAIL because campaign/chapter headings and `displaySrc` do not exist.

- [ ] **Step 3: Generate display-sized gallery derivatives**

Run the following mechanical image commands:

```bash
mkdir -p public/images/display
sips -Z 1280 -s format jpeg -s formatOptions 82 public/images/gallery-coupe.jpg --out public/images/display/gallery-coupe.jpg
sips -Z 1280 -s format jpeg -s formatOptions 82 public/images/gallery-suv.jpg --out public/images/display/gallery-suv.jpg
sips -Z 1080 -s format jpeg -s formatOptions 82 public/images/ceramic-display.jpg --out public/images/display/ceramic-display.jpg
sips -Z 1280 -s format jpeg -s formatOptions 82 public/images/gallery-sport.jpg --out public/images/display/gallery-sport.jpg
sips -Z 1280 -s format jpeg -s formatOptions 82 public/images/detail-exterior.jpg --out public/images/display/detail-exterior.jpg
sips -Z 1280 -s format jpeg -s formatOptions 82 public/images/detail-process.jpg --out public/images/display/detail-process.jpg
```

Inspect dimensions with `find public/images/display -type f -print0 | xargs -0 sips -g pixelWidth -g pixelHeight` and confirm no derivative exceeds 1280 pixels on its longest edge.

- [ ] **Step 4: Extend gallery data and define chapter membership**

Add `displaySrc` to every `GalleryItem`. Export:

```ts
export const portfolioChapters = [
  { id: "finish", title: "Finish", itemIndexes: [3, 5], layout: "pair" },
  { id: "process", title: "Process", itemIndexes: [1, 4], layout: "documentary" },
  { id: "protection", title: "Protection", itemIndexes: [2], layout: "feature" }
] as const;
```

The orange coupe at index 0 belongs exclusively to the opening campaign so all six records appear exactly once on the page.

- [ ] **Step 5: Implement `GalleryChapter`**

Define:

```tsx
type GalleryChapterProps = {
  id: string;
  title: string;
  items: Array<{ item: GalleryItem; index: number }>;
  layout: "pair" | "documentary" | "feature";
  onOpen: (index: number) => void;
};
```

Render a semantic `<section aria-labelledby={`${id}-title`}>`, a real `<h2>`, and `<figure>` elements containing buttons, display-sized images, and factual `<figcaption>` text from `item.alt`.

- [ ] **Step 6: Recompose PortfolioPage**

Use `CampaignHero layout="portfolio"` with the orange coupe `displaySrc`, `The work.`, and the existing introductory sentence. Pass `imageAction={{ label: galleryItems[0].openLabel, onClick: () => setActiveIndex(0) }}` so the opening image remains a gallery button. Map `portfolioChapters` through `GalleryChapter`. Preserve one `activeIndex` and pass the original full-resolution `galleryItems` array to `GalleryLightbox`.

- [ ] **Step 7: Replace grid CSS with chapter CSS**

Build separate `.gallery-chapter--pair`, `--documentary`, and `--feature` layouts. Desktop uses a dominant campaign image, a controlled two-image finish spread, a quieter process pair, and one full-width protection close. Mobile is a single ordered sequence with natural aspect ratios. Hover darkens and reveals captions without zoom.

- [ ] **Step 8: Run focused tests and build**

Run: `npm test -- src/test/portfolio.test.tsx && npm run build`

Expected: portfolio tests pass, all six images appear once, lightbox behavior remains green, and the build succeeds.

- [ ] **Step 9: Commit**

```bash
git add src/components/GalleryChapter.tsx src/app/gallery-data.ts src/pages/PortfolioPage.tsx src/styles/portfolio.css src/test/portfolio.test.tsx public/images/display
git commit -m "feat: curate portfolio as visual essay"
```

---

### Task 5: Recompose Contact as a concierge request experience

**Files:**
- Modify: `src/pages/ContactPage.tsx`
- Modify: `src/components/ContactForm.tsx`
- Modify: `src/styles/contact.css`
- Modify: `src/test/contact.test.tsx`

**Interfaces:**
- Consumes: `CampaignHero`, `SpecialistRail`, `serviceNotes`, and the existing `ContactForm`.
- Preserves: `buildQuoteMailto(values: QuoteFormValues): string`, all `ContactForm` fields, validation, status, fallback, and native destinations.

- [ ] **Step 1: Write failing concierge composition tests**

Add to `contact.test.tsx`:

```tsx
import { MemoryRouter } from "react-router-dom";
import { ContactPage } from "../pages/ContactPage";

it("renders the concierge campaign, contact rail, and request guidance", () => {
  render(<MemoryRouter><ContactPage /></MemoryRouter>);

  expect(document.querySelector(".campaign-hero--contact")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Let’s talk about your vehicle." })).toBeVisible();
  expect(screen.getByRole("link", { name: /Collin.*815-922-1593/ })).toHaveAttribute("href", "tel:8159221593");
  expect(screen.getByRole("link", { name: /Caleb.*815-409-5501/ })).toHaveAttribute("href", "tel:8154095501");
  expect(screen.getByRole("heading", { name: "Before you request a quote" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Request a quote" })).toBeVisible();
});
```

Keep the existing empty-submit and `buildQuoteMailto` tests unchanged.

- [ ] **Step 2: Run the focused test and confirm failure**

Run: `npm test -- src/test/contact.test.tsx`

Expected: FAIL because Contact does not use the campaign or shared specialist rail.

- [ ] **Step 3: Recompose ContactPage**

Use `CampaignHero layout="contact"` without an image. Render `<SpecialistRail />` as a full-width band after the hero. Create one warm-white `.quote-chapter` containing the appointment/service notes in an editorial margin and the existing `<ContactForm />` in the main column.

- [ ] **Step 4: Preserve and refine ContactForm markup**

Do not change field names, validation, values, mailto construction, status text, or fallback. Add structural class names only where needed to support thin-rule print styling. Keep real labels and native inputs/selects/textarea/file input.

- [ ] **Step 5: Replace Contact CSS**

Remove the existing dark sidebar/form split. Style:

- Black campaign opening.
- Full-width contact rail with real link rows.
- Warm-white quote chapter with black type.
- Thin, square form rules and transparent fields.
- High-contrast red errors and red submit action.
- Desktop editorial note column plus form; notes appear first on mobile.
- Visible focus styles and 44-pixel minimum controls.

- [ ] **Step 6: Run Contact tests, full tests, and build**

Run: `npm test -- src/test/contact.test.tsx && npm test && npm run build`

Expected: all tests pass and production build succeeds.

- [ ] **Step 7: Commit**

```bash
git add src/pages/ContactPage.tsx src/components/ContactForm.tsx src/styles/contact.css src/test/contact.test.tsx
git commit -m "feat: redesign contact as concierge request"
```

---

### Task 6: Production, responsive, interaction, and accessibility verification

**Files:**
- Modify only if a verified defect requires a focused correction.
- Store screenshots and Lighthouse JSON outside the repository under `/tmp/candc-leica-qa/`.

**Interfaces:**
- Consumes: all three completed routes.
- Produces: evidence that the approved campaign system works across responsive, keyboard, form, lightbox, console, build, and Lighthouse checks.

- [ ] **Step 1: Run fresh automated verification**

Run:

```bash
npm test
npm run build
git diff --check
```

Expected: 0 failed tests, successful Vite build, and no whitespace errors.

- [ ] **Step 2: Start the local development server**

Run: `npm run dev -- --host 127.0.0.1 --port 4174`

Expected: Vite serves `http://127.0.0.1:4174/`.

- [ ] **Step 3: Verify all routes in the in-app Browser**

Inspect `/`, `/portfolio`, and `/contact` at 390x844, 768x900, 1024x900, and 1440x1000. At each relevant route/width, verify page identity, meaningful content, no framework overlay, no horizontal document overflow, readable text, non-overlapping fixed header, and zero relevant console warnings/errors.

- [ ] **Step 4: Verify service interactions**

At desktop, select Ceramic Coating by pointer, then use Arrow Left and Home/End to change focus and state. Confirm the active image, title, included work, and real price notes update. At 390 pixels, open Paint Correction and confirm exactly one accordion panel is expanded with the wet-sanding note visible.

- [ ] **Step 5: Verify Portfolio interactions**

Confirm all six images appear once in the page sequence. Open the orange coupe, use Arrow Right to show the SUV, close with Escape, and verify focus returns to the opening control.

- [ ] **Step 6: Verify Contact interactions without transmitting data**

Submit the empty form and confirm inline errors. Fill a valid set of values but do not trigger final submission because it navigates to a mail client. Verify the two phone `tel:` links, email `mailto:` link, Facebook target, optional-photo guidance, and “does not send automatically” notice.

- [ ] **Step 7: Capture screenshot evidence outside the repository**

Save:

- `/tmp/candc-leica-qa/home-desktop.png`
- `/tmp/candc-leica-qa/home-mobile.png`
- `/tmp/candc-leica-qa/portfolio-desktop.png`
- `/tmp/candc-leica-qa/contact-desktop.png`
- `/tmp/candc-leica-qa/contact-mobile.png`

- [ ] **Step 8: Run Lighthouse against a production preview**

Start `npm run preview -- --host 127.0.0.1 --port 4175`, then run:

```bash
npx --yes lighthouse@latest http://127.0.0.1:4175/ --output=json --output-path=/tmp/candc-leica-qa/lighthouse.json --chrome-flags="--headless --no-sandbox --disable-gpu" --quiet
```

Read category scores with `jq`. Accessibility, Best Practices, and SEO must each equal 100. Record Performance, LCP, CLS, and TBT and fix any campaign implementation regression that is attributable to this pass.

- [ ] **Step 9: Run final repository verification**

Run:

```bash
npm test
npm run build
git diff --check
git status --short --branch
git log -8 --oneline
```

Expected: green test/build output, no whitespace errors, clean `main`, and the five implementation commits above the spec/plan commits.
