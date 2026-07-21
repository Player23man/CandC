import { useState } from "react";
import { galleryItems, portfolioChapters } from "../app/gallery-data";
import { CampaignHero } from "../components/CampaignHero";
import { GalleryChapter } from "../components/GalleryChapter";
import { GalleryLightbox } from "../components/GalleryLightbox";
import { QuoteCta } from "../components/QuoteCta";

export function PortfolioPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <main id="main-content" className="portfolio-page">
      <CampaignHero
        layout="portfolio"
        title="The work."
        description="A closer look at the finish, process, and attention that goes into a properly detailed vehicle."
        image={{
          src: galleryItems[0].displaySrc,
          alt: galleryItems[0].alt,
          fetchPriority: "high"
        }}
        imageAction={{
          label: galleryItems[0].openLabel,
          onClick: () => setActiveIndex(0)
        }}
      />

      <div className="portfolio-chapters" aria-label="Vehicle detailing portfolio">
        {portfolioChapters.map((chapter) => (
          <GalleryChapter
            id={chapter.id}
            title={chapter.title}
            layout={chapter.layout}
            items={chapter.itemIndexes.map((index) => ({ item: galleryItems[index], index }))}
            onOpen={setActiveIndex}
            key={chapter.id}
          />
        ))}
      </div>

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
