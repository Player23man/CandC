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
  },
  {
    src: "/images/interior-before.jpg",
    displaySrc: "/images/display/interior-before.jpg",
    alt: "Vehicle floor area before interior detailing",
    openLabel: "Open interior before detail"
  },
  {
    src: "/images/interior-detailing.jpg",
    displaySrc: "/images/display/interior-detailing.jpg",
    alt: "Clean light-colored vehicle seats and floor area after detailing",
    openLabel: "Open interior after detail"
  },
  {
    src: "/images/cc-interior-floor-before.jpg",
    displaySrc: "/images/display/cc-interior-floor-before.jpg",
    alt: "Front footwell carpet with visible debris before interior cleaning",
    openLabel: "Open interior carpet before detail",
    className: "gallery-item--wide"
  },
  {
    src: "/images/cc-interior-floor-mat-clean.jpg",
    displaySrc: "/images/display/cc-interior-floor-mat-clean.jpg",
    alt: "Clean driver footwell with a fitted rubber floor mat",
    openLabel: "Open clean floor mat detail",
    className: "gallery-item--tall"
  },
  {
    src: "/images/cc-interior-console-clean.jpg",
    displaySrc: "/images/display/cc-interior-console-clean.jpg",
    alt: "Clean center console and cupholders between light-colored seats",
    openLabel: "Open clean center console detail",
    className: "gallery-item--tall"
  },
  {
    src: "/images/cc-interior-cargo-clean.jpg",
    displaySrc: "/images/display/cc-interior-cargo-clean.jpg",
    alt: "Freshly vacuumed vehicle cargo area with visible carpet lines",
    openLabel: "Open clean cargo area detail",
    className: "gallery-item--wide"
  },
  {
    src: "/images/cc-jeep-finish.jpg",
    displaySrc: "/images/display/cc-jeep-finish.jpg",
    alt: "Clean Jeep rear wheel, tire, and painted body panel",
    openLabel: "Open Jeep exterior detail",
    className: "gallery-item--tall"
  }
];

export const portfolioChapters = [
  { id: "finish", title: "Finish", itemIndexes: [3, 5, 12], layout: "pair" },
  { id: "process", title: "Process", itemIndexes: [1, 4, 8], layout: "documentary" },
  { id: "interior", title: "Interior", itemIndexes: [6, 7, 9, 10, 11], layout: "documentary" },
  { id: "protection", title: "Protection", itemIndexes: [2], layout: "feature" }
] as const;
