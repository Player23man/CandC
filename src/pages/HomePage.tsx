import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { QuoteCta } from "../components/QuoteCta";
import { Reveal } from "../components/Reveal";
import { ServiceBoard } from "../components/ServiceBoard";

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
          <div>
            <h1 id="home-hero-title">Finished with intent.</h1>
            <p>Shop and mobile detailing, paint correction, and ceramic coating in Channahon.</p>
            <div className="home-hero__actions">
              <Link className="button button--primary" to="/contact">Get a quote</Link>
              <Link className="hero-link" to="/portfolio">
                View our work
                <ArrowRight size={19} weight="bold" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="service-board-section" aria-labelledby="service-board-title">
        <div className="shell">
          <Reveal className="service-board-section__heading">
            <h2 id="service-board-title">Choose the work your vehicle needs.</h2>
            <p>Compare starting prices, included work, and package options.</p>
          </Reveal>

          <ServiceBoard />

          <Link className="text-link service-board-section__link" to="/contact">
            Ask about your vehicle
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </Link>
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
            <blockquote>
              I felt like I drove away in a brand-new car. His work is meticulous; every crevice of car cleaned to perfection!
            </blockquote>
            <p className="testimonial__source">
              <strong>Verified customer review</strong>
              <span>2022 Tucson owner</span>
            </p>
          </Reveal>
        </div>
      </section>

      <QuoteCta />
    </main>
  );
}
