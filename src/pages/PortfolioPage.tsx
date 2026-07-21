import { useState } from "react";
import { galleryItems } from "../app/gallery-data";
import { GalleryLightbox } from "../components/GalleryLightbox";
import { QuoteCta } from "../components/QuoteCta";
import { Reveal } from "../components/Reveal";

export function PortfolioPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <main id="main-content" className="portfolio-page">
      <header className="page-intro shell">
        <div>
          <h1>The work.</h1>
          <p>A closer look at the finish, process, and attention that goes into a properly detailed vehicle.</p>
        </div>
      </header>

      <section className="portfolio-gallery shell" aria-label="Vehicle detailing portfolio">
        {galleryItems.map((item, index) => (
          <Reveal className={`gallery-item ${item.className ?? ""}`} delay={(index % 3) * 0.05} key={item.src}>
            <button type="button" aria-label={item.openLabel} onClick={() => setActiveIndex(index)}>
              <img src={item.src} alt={item.alt} loading={index < 2 ? "eager" : "lazy"} />
            </button>
          </Reveal>
        ))}
      </section>

      <QuoteCta />

      {activeIndex !== null && (
        <GalleryLightbox
          items={galleryItems}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </main>
  );
}
