import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import type { GalleryItem } from "../app/gallery-data";

type GalleryLightboxProps = {
  items: GalleryItem[];
  activeIndex: number;
  onChange: (index: number) => void;
  onClose: () => void;
};

export function GalleryLightbox({ items, activeIndex, onChange, onClose }: GalleryLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const showPrevious = () => onChange((activeIndex - 1 + items.length) % items.length);
  const showNext = () => onChange((activeIndex + 1) % items.length);

  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    return () => previouslyFocusedRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, onClose]);

  const activeItem = items[activeIndex];

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Portfolio image viewer">
      <button
        ref={closeButtonRef}
        className="lightbox__close"
        type="button"
        aria-label="Close image viewer"
        onClick={onClose}
      >
        <X size={28} weight="bold" aria-hidden="true" />
      </button>

      <button className="lightbox__control lightbox__control--previous" type="button" aria-label="Previous image" onClick={showPrevious}>
        <CaretLeft size={30} weight="bold" aria-hidden="true" />
      </button>

      <figure className="lightbox__figure">
        <img src={activeItem.src} alt={activeItem.alt} />
        <figcaption>{String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</figcaption>
      </figure>

      <button className="lightbox__control lightbox__control--next" type="button" aria-label="Next image" onClick={showNext}>
        <CaretRight size={30} weight="bold" aria-hidden="true" />
      </button>
    </div>
  );
}
