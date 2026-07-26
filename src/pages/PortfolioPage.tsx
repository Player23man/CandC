import { useState } from "react";
import { finishedWorkItems, transformationPairs } from "../app/gallery-data";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";
import { CampaignHero } from "../components/CampaignHero";
import { GalleryLightbox } from "../components/GalleryLightbox";
import { QuoteCta } from "../components/QuoteCta";
import { Reveal } from "../components/Reveal";

export function PortfolioPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <main id="main-content" className="portfolio-page">
      <CampaignHero
        layout="portfolio"
        title="The work."
        description="A closer look at the finish, process, and attention that goes into a properly detailed vehicle."
        image={{
          src: finishedWorkItems[0].displaySrc,
          alt: finishedWorkItems[0].alt,
          fetchPriority: "high",
        }}
        imageAction={{
          label: finishedWorkItems[0].openLabel,
          onClick: () => setActiveIndex(0),
        }}
      />

      <section
        className="portfolio-transformations"
        aria-label="Detailing transformations"
      >
        <div className="shell">
          <Reveal className="portfolio-section-heading">
            <h2 id="transformations-title">Transformations</h2>
          </Reveal>
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
          <Reveal className="portfolio-section-heading portfolio-section-heading--light">
            <h2 id="finished-work-title">Finished work</h2>
          </Reveal>
          <div className="finished-work__grid">
            {finishedWorkItems.map((item, index) => (
              <Reveal
                className={`finished-work__item ${item.className ?? ""}`.trim()}
                delay={(index % 2) * 0.06}
                key={item.src}
              >
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

      <QuoteCta />

      {activeIndex !== null && (
        <GalleryLightbox
          items={finishedWorkItems}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </main>
  );
}
