import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { CampaignHero } from "../components/CampaignHero";
import { QuoteCta } from "../components/QuoteCta";
import { Reveal } from "../components/Reveal";
import { ServiceBoard } from "../components/ServiceBoard";

export function HomePage() {
  return (
    <main id="main-content">
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

      <section className="service-board-section service-board-section--print" aria-labelledby="service-board-title">
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
          <div className="finish-spread">
            <Reveal className="finish-spread__lead">
              <figure>
                <img src="/images/gallery-suv.jpg" alt="Black vehicle being hand washed" loading="lazy" />
                <figcaption>Black vehicle, hand washed</figcaption>
              </figure>
            </Reveal>
            <div className="finish-spread__supporting">
              <Reveal className="finish-spread__supporting-item" delay={0.06}>
                <figure>
                  <img src="/images/gallery-sport.jpg" alt="Glossy red vehicle exterior" loading="lazy" />
                  <figcaption>Glossy red vehicle exterior</figcaption>
                </figure>
              </Reveal>
              <Reveal className="finish-spread__supporting-item finish-spread__supporting-item--offset" delay={0.12}>
                <figure>
                  <img src="/images/ceramic-display.jpg" alt="Ceramic coating display on a red vehicle" loading="lazy" />
                  <figcaption>Ceramic coating display</figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial testimonial--print" aria-label="Customer testimonial">
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
