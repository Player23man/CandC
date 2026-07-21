import type { GalleryItem } from "../app/gallery-data";
import { Reveal } from "./Reveal";

type GalleryChapterProps = {
  id: string;
  title: string;
  items: Array<{ item: GalleryItem; index: number }>;
  layout: "pair" | "documentary" | "feature";
  onOpen: (index: number) => void;
};

export function GalleryChapter({ id, title, items, layout, onOpen }: GalleryChapterProps) {
  const titleId = `${id}-title`;

  return (
    <section className={`gallery-chapter gallery-chapter--${layout}`} aria-labelledby={titleId}>
      <div className="shell gallery-chapter__inner">
        <Reveal className="gallery-chapter__heading">
          <h2 id={titleId}>{title}</h2>
        </Reveal>
        <div className="gallery-chapter__images">
          {items.map(({ item, index }, itemIndex) => (
            <Reveal className="gallery-chapter__item" delay={itemIndex * 0.06} key={item.src}>
              <figure>
                <button type="button" aria-label={item.openLabel} onClick={() => onOpen(index)}>
                  <img src={item.displaySrc} alt={item.alt} loading="lazy" />
                </button>
                <figcaption>{item.alt}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
