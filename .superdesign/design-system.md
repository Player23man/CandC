# C&C Detailing - Premium Performance Design System

## Product context

C&C Detailing (Collins Custom Detailing LLC) is an appointment-only auto detailing business in Channahon, Illinois. The site must turn local visitors into phone, email, or form inquiries while clearly showing the quality of the work. The public-facing site has three routes: Home, Portfolio, and Contact.

Core services and facts come from the current website and must not be invented or materially changed:

- Shop and mobile detailing
- Exterior detailing from $150
- Exterior decontamination and one-step polish from $250
- Two-step paint correction from $600
- Basic interior cleaning at $180
- Full interior restoration from $225, condition based
- Ceramic coating from $900
- Minor scratch work from $30-$150
- Appointment only; mileage fees may apply for mobile service
- Collin, exterior specialist: 815-922-1593
- Caleb, interior specialist: 815-409-5501
- candcdetailing25@gmail.com
- Channahon, Illinois

## Jobs to be done

1. Immediately establish that C&C offers serious paint correction, ceramic coating, interior restoration, and mobile service.
2. Let visitors quickly compare the main service categories and starting prices without reading a wall of text.
3. Use real vehicle photography as the primary trust signal and make the Portfolio page a persuasive proof surface.
4. Make it effortless to call, email, or send an inquiry on mobile.

## Visual thesis

A precision detailing studio after hours: deep black surfaces, warm-white typography, one hot red signal color, and full-bleed vehicle photography with crisp reflections. Premium and confident, but still approachable to everyday drivers. The atmosphere should feel automotive and crafted, not like a generic luxury template or SaaS landing page.

## Color system

- Canvas: `#070707`
- Raised black: `#101010`
- Divider: `#2A2A2A`
- Primary text: `#F4F1EA`
- Secondary text: `#AAA7A1`
- Muted text: `#74716D`
- Signal red: `#DC2B3E`
- Signal red hover: `#BB2334`

Use flat colors and photographic tonal transitions. Do not use decorative gradients, neon glows, star fields, glassmorphism, floating dashboard cards, or ornamental grain that competes with the cars.

## Typography

- Use Archivo as the single type family, weights 400-800. The display voice comes from weight, scale, crop, and spacing rather than a second decorative font.
- Headlines use tight tracking and compact line-height. Prefer sentence case over all caps.
- Uppercase is limited to short functional navigation and service-price labels. Do not place tracked eyebrow copy above every heading.
- Desktop hero: 68-92px depending on composition; mobile hero: 42-54px. Never let the headline overwhelm the vehicle image or push the CTA below the first viewport.
- Section headings: 42-64px desktop and 32-42px mobile.
- Body: 16-19px with comfortable line-height.

## Layout and spacing

- Use a 12-column desktop grid with a maximum content width of 1440px.
- Hero imagery runs edge to edge. Text sits in a calm portion of the photograph rather than inside a card.
- Standard horizontal gutters: 32-48px desktop, 20px mobile.
- Section spacing: 112-160px desktop, 72-96px mobile.
- Cardless by default. Use editorial columns, full-width media, sparse hairline dividers, and closely related dark surfaces.
- Corners are square throughout, with up to 4px radius reserved for form controls when it improves usability. Buttons remain rectangular.
- Mobile must feel purpose-built: stacked content, full-width media, large tap targets, and a sticky call or quote action when helpful.

## Shared navigation

- Slim overlay header on the hero and solid black header elsewhere.
- Left: C&C wordmark or faithful extracted logo if available.
- Center/right: Home, Portfolio, Contact.
- Primary action: `Get a quote` in signal red.
- Mobile: wordmark, menu trigger, and a compact red phone/quote action.

## Home page

### Hero

- Full-bleed, low-angle photograph of a freshly detailed dark vehicle with controlled reflections.
- Brand is unmistakable in the first screen.
- Headline: `Finished with intent.`
- Support: `Shop and mobile detailing, paint correction, and ceramic coating in Channahon, Illinois.`
- Primary CTA: `Get a quote`; secondary text link: `View our work`.
- Keep appointment and service-mode information out of the hero microcopy stack. Place it in the first informational section or contact area.

### Services

- Introduce the four key service families through a compact automotive-spec index, not a card grid or a repetitive table: Exterior Detail, Interior Restoration, Paint Correction, Ceramic Coating.
- Show real starting prices and one sentence per service.
- On desktop, let one large related photograph interrupt the service index rather than attaching a thumbnail to every row. On mobile, place that photograph after the first two services.

### What the work includes

- Replace the generic Inspect / Correct / Protect sequence with a factual, photography-led spread using only current service inclusions: hand wash, wheels and wheel wells, paint decontamination, machine polish, steam cleaning, shampooing, wax sealant, and ceramic coating.
- Explain that packages may be adjusted for vehicle size and condition. Do not invent diagnostic procedures, inspection technology, clear-coat measurement, or technical claims.

### Proof

- Use the exact existing customer testimonial about the 2022 Tucson. Do not paraphrase it, add a name, claim verification, infer the purchased package, or invent an outcome.
- Pair it with a finished-vehicle image and a link to Portfolio.

### Final CTA

- Solid red band with phone and inquiry actions.
- Copy: `Tell us what your vehicle needs.`

## Portfolio page

- Opening statement and a large featured transformation.
- Photography-first masonry or editorial gallery with filters for Exterior, Interior, Correction, and Coating.
- Avoid generic gallery cards. Images should crop confidently and open into a lightbox/detail view.
- Where authentic before/after pairs exist, present a simple drag comparison. Do not fabricate before/after pairs.
- Each project can carry only factual minimal metadata: vehicle, service type, and short outcome.
- End with a direct quote CTA.

## Contact page

- Clear, practical intro: appointment-only shop and mobile detailing in Channahon.
- Two direct specialist contacts with click-to-call actions.
- Inquiry form fields: Name, Phone, Email, Vehicle year/make/model, Service interest, Shop or mobile, Vehicle condition/details, preferred timing, and optional photo upload UI.
- Include the reminder that interior photos are especially helpful and mileage fees may apply.
- Do not invent business hours or a street address.
- Preserve Facebook as the social destination.

## Components and interaction

- Primary button: signal red background, warm-white text, 48-54px height, crisp hover darkening, small arrow movement.
- Secondary action: text link with underline/reveal or thin bordered button.
- Service index: large service name, real price, short description, sparse dividers, and one interrupting photograph. Do not prefix each service with decorative `01 / 02 / 03 / 04` labels.
- Gallery images: subtle scale to 1.02 and caption reveal on hover; no heavy shadows.
- Form controls: dark fields with strong focus rings in signal red and visible labels.
- Navigation and CTAs remain readable over every hero crop.

## Motion thesis

1. Hero copy enters in a short stagger while the vehicle image eases from 1.03 to 1.00 scale.
2. Service photography changes with a restrained crossfade/vertical reveal as visitors move through the service list.
3. Portfolio media reveals with a clipped upward motion; hover uses a slight crop shift and caption reveal.

Respect `prefers-reduced-motion`; no continuous decorative animation.

## Content rules

- Preserve business facts, service names, prices, and appointment notes from the current site.
- Clean up obvious spelling and grammar while retaining the original meaning.
- Never invent reviews, certifications, guarantees, statistics, staff, addresses, hours, vehicles, or project outcomes.
- Keep marketing copy concise and specific to detailing.
- Real C&C imagery should replace all placeholders in implementation.
- Do not use section-number eyebrows, `Authentic Account`, `Client Voice`, `Featured Moment`, `Starting Rates FY24`, version labels, atmospheric location labels, or similar generated microcopy.
- Do not use warm-paper theme flips. The site stays in one dark theme; red may create one intentional CTA band.
- Avoid em dashes and decorative middle-dot metadata strings in all visible copy.

## Responsive and accessibility requirements

- Minimum 44px tap targets.
- WCAG AA contrast for body text and controls.
- Visible keyboard focus states and logical heading hierarchy.
- All gallery images need useful alt text based only on known image content.
- Forms require explicit labels, inline validation, success state, and clear failure recovery.
- Verify at 1440px, 1024px, 768px, and 390px widths.
