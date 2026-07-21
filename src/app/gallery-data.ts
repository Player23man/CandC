export type GalleryItem = {
  src: string;
  displaySrc: string;
  alt: string;
  openLabel: string;
  className?: string;
};

export const galleryItems: GalleryItem[] = [
  {
    src: "/images/gallery-coupe.jpg",
    displaySrc: "/images/display/gallery-coupe.jpg",
    alt: "Glossy orange coupe after exterior detailing",
    openLabel: "Open coupe detail",
    className: "gallery-item--wide"
  },
  {
    src: "/images/gallery-suv.jpg",
    displaySrc: "/images/display/gallery-suv.jpg",
    alt: "Black sport utility vehicle receiving a careful hand wash",
    openLabel: "Open hand wash detail"
  },
  {
    src: "/images/ceramic-display.jpg",
    displaySrc: "/images/display/ceramic-display.jpg",
    alt: "Ceramic coating display on a detailed red vehicle",
    openLabel: "Open ceramic coating detail",
    className: "gallery-item--tall"
  },
  {
    src: "/images/gallery-sport.jpg",
    displaySrc: "/images/display/gallery-sport.jpg",
    alt: "Red performance vehicle with a reflective exterior finish",
    openLabel: "Open red vehicle detail"
  },
  {
    src: "/images/detail-exterior.jpg",
    displaySrc: "/images/display/detail-exterior.jpg",
    alt: "Detailer washing the exterior of a dark vehicle",
    openLabel: "Open exterior wash detail",
    className: "gallery-item--wide"
  },
  {
    src: "/images/detail-process.jpg",
    displaySrc: "/images/display/detail-process.jpg",
    alt: "White performance car under studio lighting",
    openLabel: "Open studio finish detail"
  }
];

export const portfolioChapters = [
  { id: "finish", title: "Finish", itemIndexes: [3, 5], layout: "pair" },
  { id: "process", title: "Process", itemIndexes: [1, 4], layout: "documentary" },
  { id: "protection", title: "Protection", itemIndexes: [2], layout: "feature" }
] as const;
