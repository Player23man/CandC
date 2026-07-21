# C&C Leica Campaign System Redesign

**Date:** July 20, 2026  
**Status:** Approved design direction; awaiting written-spec approval  
**Routes:** `/`, `/portfolio`, `/contact`

## Summary

Rework all three C&C Detailing pages around a Leica-led campaign system, using Polestar as a secondary interaction reference. The finished site should feel like a premium photographic product display: dominant real imagery, decisive typography, deliberate empty space, minimal interface chrome, and precise red signals.

This is a compositional redesign, not a factual rewrite. Preserve C&C's real services, prices, phone numbers, email address, location, appointment notes, customer-review wording, gallery assets, routes, and quote behavior. Do not invent customer identities, ratings, project names, vehicle specifications, statistics, service claims, or photography.

## Design Read

This is a three-page local-business marketing site for vehicle owners considering detailing work. Its design language is premium consumer editorial rather than traditional local-service marketing.

- **Primary reference:** Leica campaign and product pages: one dominant image, one decisive message, one action, disciplined typography, black and warm-white chapter changes, and restrained red accents.
- **Secondary reference:** Polestar product pages: technical clarity, coordinated product imagery and specifications, controlled state changes, and accessible interactive comparison.
- **Design variance:** 7/10.
- **Motion intensity:** 5/10.
- **Visual density:** 3/10.

The implementation borrows layout grammar and interaction principles only. It must not reproduce another company's brand marks, proprietary assets, exact typography, or copy.

## Goals

- Make the entire site feel like one premium display system rather than three separately styled pages.
- Give the photography substantially more visual authority.
- Make services feel like products that can be explored without obscuring real pricing or inclusions.
- Turn the portfolio into a curated visual essay rather than an image grid.
- Make contact feel exact and personal while preserving the complete quote workflow.
- Keep all interactions keyboard-accessible, mobile-readable, and compatible with reduced-motion settings.
- Maintain Lighthouse Accessibility, Best Practices, and SEO scores of 100.
- Improve hero-image delivery where possible without replacing the approved source photography.

## Non-goals

- No CMS, online payment, calendar booking, authentication, database, or new backend.
- No invented case studies, customer names, ratings, dates, awards, statistics, or vehicle details.
- No new service packages or pricing changes.
- No autoplay video, 3D configurator, scroll hijacking, heavy parallax, or decorative animation.
- No gradients, glassmorphism, rounded card system, generic feature grid, numbered sections, or full-width red promotional slab.
- No serif font introduced merely to signal luxury.

## Shared Visual System

### Color

- Retain the existing near-black canvas and C&C signal red.
- Introduce one warm off-white print surface for selected editorial chapters.
- Use red only for primary actions, active service state, focus/error treatment, and restrained rules or lines.
- Do not use red as a full section background.
- Ensure all small red text meets WCAG AA contrast against its background.

### Typography

- Retain Archivo Variable as the only type family.
- Create hierarchy through weight, width, scale, line height, and spacing rather than adding a luxury serif.
- Campaign headings use strong sans-serif forms with tight but readable tracking.
- Body copy remains comfortable and factual.
- All-caps text is limited to compact functional controls such as buttons and service prices; it is not used as decorative eyebrow copy.

### Photography

- Use only the current C&C image inventory.
- Prefer dominant editorial crops and natural aspect ratios.
- Do not cover important vehicle detail with large text when the layout can place copy beside the image.
- Captions must be derived from the factual gallery descriptions and may not imply an unsupported vehicle model, package, or result.
- Hover states may darken an image or reveal a caption but must not rely on large zoom effects.

### Lines and surfaces

- Use square edges and thin structural rules.
- Warm-white chapters should read like printed campaign pages, not cards placed on a dark website.
- Avoid boxes around content unless the boundary performs a real control or form function.

## Shared Components

### Campaign hero

A reusable page-opening pattern provides a dominant image or empty black field, a decisive page title, concise factual supporting text, and no more than two actions. It supports home, portfolio, and contact variants rather than forcing identical markup on all three pages.

### Specialist contact rail

A reusable contact rail presents:

- Collin, Exterior specialist, 815-922-1593.
- Caleb, Interior specialist, 815-409-5501.
- candcdetailing25@gmail.com.
- The existing Facebook destination.

Phone and email destinations remain native `tel:` and `mailto:` links. The rail may change orientation by breakpoint but retains the same content and accessible names.

### Reveal behavior

Existing reveal behavior may be refined, but page content must never depend on animation to become usable. Reduced-motion users receive immediate final states.

## Home Page

### Campaign hero

- Keep the exact headline `Finished with intent.`
- Keep the existing Channahon service sentence.
- Use the current white performance-car image as the dominant full-viewport photograph.
- Anchor the campaign title and actions so the car remains the focal point.
- Keep one primary `Get a quote` action and one understated `View our work` action.
- Reduce the amount of visible UI chrome and copy over the photograph.

### Service product selector

Replace the current desktop service-board composition with one coordinated product chapter.

- A dominant active-service image occupies the primary visual field.
- A thin horizontal service index exposes Exterior Detail, Interior Restoration, Paint Correction, and Ceramic Coating with real starting prices.
- Selecting a service updates the image, description, included work, starting price, and all real price notes as one coordinated state.
- Desktop supports mouse selection plus Arrow Left, Arrow Right, Home, and End keyboard behavior.
- Mobile retains one accessible accordion with one open service at a time.
- All service text continues to render directly from `src/app/site-data.ts`.
- The active state uses a red rule or marker rather than a filled card.

### Featured finish

Replace the current portfolio preview with a campaign spread using the existing portfolio images.

- One dominant photograph creates the main portfolio moment.
- Two smaller process or finish crops support it without becoming equal cards.
- Keep `The finish speaks for itself.` and a clear route to `/portfolio`.
- Use factual image descriptions only.

### Customer proof

- Place the approved review excerpt on the warm-white print surface.
- Preserve the attribution `Verified customer review` and `2022 Tucson owner`.
- Use black text with one restrained red rule.
- Do not add a name, star rating, review platform, date, or photograph.

### Contact close

- Use a stripped-back black closing chapter.
- Present the quote action first and both specialist contact rows second.
- Preserve the appointment-only and mobile-mileage note.
- Do not return to a full-width red background.

## Portfolio Page

The portfolio becomes a curated visual essay using all six existing gallery records.

### Opening campaign

- Use the glossy orange coupe as the dominant opening photograph.
- Present `The work.` beside or across the campaign composition rather than above a generic gallery.
- Keep the existing factual introductory sentence.

### Finish chapter

Sequence the orange coupe, reflective red performance vehicle, and white studio vehicle as one dominant image followed by a controlled two-image spread.

### Process chapter

Sequence the two hand-wash photographs as documentary process imagery with factual captions.

### Protection chapter

Give the ceramic-coating display image a full-width closing moment rather than treating it as another equal gallery tile.

### Interaction

- Every gallery image remains a button that opens the existing lightbox.
- Preserve keyboard close, previous, and next behavior.
- Replace pronounced image zoom with subtle darkening and caption disclosure.
- Desktop uses intentionally different image scales and alignments without masonry-like gaps.
- Mobile uses one clear vertical sequence with natural aspect ratios and readable captions.

## Contact Page

The contact page becomes a quiet concierge request experience.

### Opening chapter

- Keep `Let’s talk about your vehicle.`
- Keep the existing shop/mobile-service sentence.
- Use a large black field rather than introducing another photograph.

### Direct contact rail

- Present both specialists, email, and Facebook as one precise full-width band.
- Preserve every destination and specialty.
- Maintain at least 44-pixel interactive targets.

### Quote chapter

- Place the form on the warm-white print surface with black typography.
- Use thin field rules, square edges, and a single red submit action.
- Keep the form semantic and linear; do not turn it into a wizard or conversational interface.
- On desktop, place request guidance in an editorial margin column beside the form.
- On mobile, place the guidance before the form.

### Preserved form behavior

- Required name, vehicle, service, and detail validation.
- Requirement for at least a phone number or email address.
- Service selection generated from real service data plus `Not sure yet`.
- Shop, mobile, or no-preference selection.
- Preferred timing.
- Optional-photo guidance explaining that attachments must be added manually.
- Prepared `mailto:` handoff without automatic transmission.
- Live status text, copy-email fallback, and recoverable prepared email link.
- Errors remain inline beneath the relevant field and use sufficient contrast.

## State and Data Flow

- `src/app/site-data.ts` remains the factual authority for business information, specialists, services, prices, price notes, and service notes.
- `src/app/gallery-data.ts` remains the source for portfolio assets and factual image descriptions.
- The service selector owns one local `activeId` state shared by its desktop and mobile presentations.
- The portfolio page continues to own one nullable `activeIndex` for the lightbox.
- The contact form continues to own local values, errors, prepared mail destination, and status.
- No new global state or data-fetching layer is introduced.

## Responsive Behavior

- Verify at 390x844, 768x900, 1024x900, and 1440x1000.
- Mobile campaign titles must not collide with the fixed header or actions.
- Desktop service tabs become the accordion below 768 pixels.
- Portfolio chapters collapse into one ordered visual sequence on mobile.
- Contact rail and form columns collapse without changing content order or accessible labels.
- No horizontal document overflow is permitted.

## Motion

- Image and content state changes use 240–400 ms transitions.
- Allowed motion: opacity crossfade, short vertical text reveal, active-line movement, restrained image darkening.
- Disallowed motion: scroll hijacking, autoplay video, continuous marquee, pointer-follow effects, large hover zoom, or decorative parallax.
- `prefers-reduced-motion: reduce` removes nonessential animation and delivers immediate content states.

## Accessibility

- Preserve the skip link, semantic landmarks, heading order, focus visibility, and meaningful alternative text.
- Desktop service navigation follows ARIA tab semantics and keyboard behavior.
- Mobile service navigation uses real buttons, `aria-expanded`, unique controls, and one disclosed region.
- Gallery buttons and lightbox controls retain accessible names.
- Contact form errors remain associated through `aria-describedby` and `aria-invalid`.
- Maintain Lighthouse Accessibility at 100.

## Performance

- Keep above-the-fold JavaScript minimal and avoid new dependencies.
- Preserve eager loading only for genuinely above-the-fold imagery.
- Add responsive image variants or more efficient encodings for the existing hero asset when this can be done without visible degradation.
- Lazy-load below-the-fold portfolio and service imagery.
- Avoid rendering hidden duplicate high-resolution images when a CSS-only responsive switch would download both.
- Record Lighthouse Performance, but do not compromise image quality or accessibility solely to chase a score.

## Testing and Verification

### Automated tests

- Service selector initial state, click selection, Arrow key behavior, Home/End behavior, and mobile accordion semantics.
- Home page campaign headings, attributed review, preserved quote links, and removal of superseded composition.
- Portfolio presence and order of all six gallery assets plus lightbox opening behavior.
- Contact rail destinations, form validation, prepared email generation, and fallback content.
- Existing header, portfolio, contact, and site-data tests remain green.

### Build and rendered QA

- Run the full Vitest suite and production build.
- Verify all three routes at the four required responsive sizes.
- Check page identity, meaningful content, framework-overlay absence, console health, and horizontal overflow.
- Exercise service selection with pointer and keyboard.
- Exercise the portfolio lightbox.
- Exercise empty and valid contact-form states without sending external data.
- Capture desktop and mobile evidence outside the repository.
- Run Lighthouse against the production preview and maintain 100 Accessibility, 100 Best Practices, and 100 SEO.

## Acceptance Criteria

- All three pages visibly share the Leica-led campaign system and Polestar-style interaction precision.
- Home hero and service selector are meaningfully recomposed, not lightly restyled.
- The Portfolio reads as a curated visual essay rather than a grid.
- Contact reads as a concierge request experience while preserving every form behavior.
- All public facts, prices, contact details, review wording, routes, and available images remain source-honest.
- No gradients, glass panels, decorative card grids, numbered sections, fake proof, or invented content appear.
- All automated tests, production build, responsive browser checks, and accessibility targets pass before completion.
