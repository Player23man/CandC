import { useState } from "react";
import { finishedWorkItems, transformationPairs } from "../app/gallery-data";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";
import { CampaignHero } from "../components/CampaignHero";
import { GalleryLightbox } from "../components/GalleryLightbox";
import { QuoteCta } from "../components/QuoteCta";
import { Reveal } from "../components/Reveal";

function pairItems<T>(items: T[]) {
  return Array.from(
    { length: Math.ceil(items.length / 2) },
    (_, rowIndex) => items.slice(rowIndex * 2, rowIndex * 2 + 2),
  );
}

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
            {pairItems(transformationPairs).map((row, rowIndex) => (
              <div
                className={`transformation-row transformation-row--${
                  rowIndex === 1 ? "wide-right" : "wide-left"
                }`}
                key={row[0].id}
              >
                {row.map((pair, itemIndex) => (
                  <Reveal className="transformation-list__item" key={pair.id}>
                    <BeforeAfterSlider
                      pair={pair}
                      priority={rowIndex === 0 && itemIndex === 0}
                    />
                  </Reveal>
                ))}
              </div>
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
            {pairItems(finishedWorkItems).map((row, rowIndex) => (
              <div
                className={`finished-work__row finished-work__row--${
                  rowIndex === 1 ? "wide-right" : "wide-left"
                }`}
                key={row[0].src}
              >
                {row.map((item) => {
                  const itemIndex = finishedWorkItems.indexOf(item);

                  return (
                    <Reveal
                      className={`finished-work__item ${item.className ?? ""}`.trim()}
                      delay={(itemIndex % 2) * 0.06}
                      key={item.src}
                    >
                      <button
                        type="button"
                        aria-label={item.openLabel}
                        onClick={() => setActiveIndex(itemIndex)}
                      >
                        <img src={item.displaySrc} alt={item.alt} loading="lazy" />
                      </button>
                    </Reveal>
                  );
                })}
              </div>
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
