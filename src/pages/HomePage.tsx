import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { services, testimonial, workIncludes } from "../app/site-data";
import { QuoteCta } from "../components/QuoteCta";
import { Reveal } from "../components/Reveal";

const inclusionGroups = [
  { title: "Exterior", items: workIncludes.exterior },
  { title: "Interior", items: workIncludes.interior },
  { title: "Protection", items: workIncludes.protection }
];

function ServiceRow({ service }: { service: (typeof services)[number] }) {
  return (
    <article className="service-row">
      <div>
        <h3>{service.name}</h3>
        <p>{service.description}</p>
      </div>
      <strong>{service.price}</strong>
    </article>
  );
}

export function HomePage() {
  return (
    <main id="main-content">
      <section className="home-hero" aria-labelledby="home-hero-title">
        <img
          className="home-hero__image"
          src="/images/detail-process.jpg"
          alt="White performance car under studio lighting"
          fetchPriority="high"
        />
        <div className="home-hero__scrim" aria-hidden="true" />
        <div className="shell home-hero__content">
          <Reveal>
            <h1 id="home-hero-title">Finished with intent.</h1>
            <p>Shop and mobile detailing, paint correction, and ceramic coating in Channahon.</p>
            <div className="home-hero__actions">
              <Link className="button button--primary" to="/contact">Get a quote</Link>
              <Link className="hero-link" to="/portfolio">
                View our work
                <ArrowRight size={19} weight="bold" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="home-services" aria-labelledby="services-title">
        <div className="shell">
          <Reveal className="section-heading">
            <h2 id="services-title">Built around what your vehicle needs.</h2>
            <p>Clear starting prices. Packages scale with vehicle size and condition.</p>
          </Reveal>

          <div className="services-index">
            <div className="services-index__group">
              {services.slice(0, 2).map((service) => <ServiceRow key={service.id} service={service} />)}
            </div>
            <Reveal className="services-index__media">
              <img src="/images/ceramic-display.jpg" alt="Ceramic coating display on a detailed red vehicle" />
            </Reveal>
            <div className="services-index__group">
              {services.slice(2).map((service) => <ServiceRow key={service.id} service={service} />)}
            </div>
          </div>

          <Link className="text-link" to="/contact">
            See full package details
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="work-includes" aria-labelledby="work-includes-title">
        <div className="work-includes__media">
          <img src="/images/detail-exterior.jpg" alt="Vehicle receiving a careful hand wash" loading="lazy" />
        </div>
        <div className="work-includes__content">
          <Reveal>
            <h2 id="work-includes-title">What the work includes.</h2>
            <p>Every package is grounded in the same careful exterior, interior, and protection work.</p>
          </Reveal>
          <div className="inclusion-groups">
            {inclusionGroups.map((group) => (
              <Reveal className="inclusion-group" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home-portfolio" aria-labelledby="portfolio-preview-title">
        <div className="shell">
          <Reveal className="portfolio-preview__heading">
            <h2 id="portfolio-preview-title">The finish speaks for itself.</h2>
            <Link className="text-link" to="/portfolio">
              View portfolio
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </Link>
          </Reveal>
          <div className="portfolio-preview">
            <Reveal className="portfolio-preview__lead">
              <img src="/images/gallery-suv.jpg" alt="Black vehicle being hand washed" loading="lazy" />
            </Reveal>
            <Reveal className="portfolio-preview__small" delay={0.06}>
              <img src="/images/gallery-sport.jpg" alt="Glossy red vehicle exterior" loading="lazy" />
            </Reveal>
            <Reveal className="portfolio-preview__small portfolio-preview__small--offset" delay={0.12}>
              <img src="/images/ceramic-display.jpg" alt="Ceramic coating display on a red vehicle" loading="lazy" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="testimonial" aria-label="Customer testimonial">
        <div className="shell testimonial__inner">
          <Reveal>
            <blockquote>{testimonial}</blockquote>
          </Reveal>
        </div>
      </section>

      <QuoteCta />
    </main>
  );
}
