export type GalleryItem = {
  src: string;
  alt: string;
  openLabel: string;
  className?: string;
};

export const galleryItems: GalleryItem[] = [
  {
    src: "/images/gallery-coupe.jpg",
    alt: "Glossy orange coupe after exterior detailing",
    openLabel: "Open coupe detail",
    className: "gallery-item--wide"
  },
  {
    src: "/images/gallery-suv.jpg",
    alt: "Black sport utility vehicle receiving a careful hand wash",
    openLabel: "Open hand wash detail"
  },
  {
    src: "/images/ceramic-display.jpg",
    alt: "Ceramic coating display on a detailed red vehicle",
    openLabel: "Open ceramic coating detail",
    className: "gallery-item--tall"
  },
  {
    src: "/images/gallery-sport.jpg",
    alt: "Red performance vehicle with a reflective exterior finish",
    openLabel: "Open red vehicle detail"
  },
  {
    src: "/images/detail-exterior.jpg",
    alt: "Detailer washing the exterior of a dark vehicle",
    openLabel: "Open exterior wash detail",
    className: "gallery-item--wide"
  },
  {
    src: "/images/detail-process.jpg",
    alt: "White performance car under studio lighting",
    openLabel: "Open studio finish detail"
  }
];
