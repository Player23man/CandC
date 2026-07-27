import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { homepageProof } from "../app/gallery-data";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";
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
          src: "/images/gallery-suv.jpg",
          srcSet: "/images/display/gallery-suv.jpg 1280w, /images/gallery-suv.jpg 1600w",
          sizes: "100vw",
          alt: "Black Porsche Taycan receiving a careful hand wash",
          fetchPriority: "high"
        }}
        actions={
          <>
            <Link className="button button--primary button--quote" to="/contact" aria-label="Get a quote">
              Get a quote
            </Link>
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
