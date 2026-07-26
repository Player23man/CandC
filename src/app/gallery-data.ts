export type GalleryImage = {
  src: string;
  displaySrc: string;
  alt: string;
};

export type TransformationPair = {
  id: string;
  label: string;
  before: GalleryImage;
  after: GalleryImage;
};

export type GalleryItem = GalleryImage & {
  openLabel: string;
  className?: string;
};

export const transformationPairs: TransformationPair[] = [
  {
    id: "paint-correction",
    label: "Blue paint correction before and after",
    before: {
      src: "/images/cc-paint-before.jpg",
      displaySrc: "/images/display/cc-paint-before.jpg",
      alt: "Blue painted panel with visible surface haze before correction",
    },
    after: {
      src: "/images/cc-paint-after.jpg",
      displaySrc: "/images/display/cc-paint-after.jpg",
      alt: "Blue painted panel with a clearer reflective finish after correction",
    },
  },
  {
    id: "driver-footwell",
    label: "Driver footwell before and after",
    before: {
      src: "/images/cc-footwell-before.jpg",
      displaySrc: "/images/display/cc-footwell-before.jpg",
      alt: "Driver footwell with visible dirt before detailing",
    },
    after: {
      src: "/images/cc-footwell-after.jpg",
      displaySrc: "/images/display/cc-footwell-after.jpg",
      alt: "Driver footwell after interior detailing",
    },
  },
  {
    id: "cargo-area",
    label: "Cargo area before and after",
    before: {
      src: "/images/cc-cargo-before.jpg",
      displaySrc: "/images/display/cc-cargo-before.jpg",
      alt: "Cargo area with visible debris before detailing",
    },
    after: {
      src: "/images/cc-cargo-after.jpg",
      displaySrc: "/images/display/cc-cargo-after.jpg",
      alt: "Cargo area after interior detailing",
    },
  },
  {
    id: "center-console",
    label: "Center console before and after",
    before: {
      src: "/images/cc-console-before.jpg",
      displaySrc: "/images/display/cc-console-before.jpg",
      alt: "Center console with visible residue before detailing",
    },
    after: {
      src: "/images/cc-console-after.jpg",
      displaySrc: "/images/display/cc-console-after.jpg",
      alt: "Center console after interior detailing",
    },
  },
  {
    id: "exterior-panel",
    label: "Dark exterior panel before and after",
    before: {
      src: "/images/cc-panel-before.jpg",
      displaySrc: "/images/display/cc-panel-before.jpg",
      alt: "Dark exterior panel with visible surface marks before correction",
    },
    after: {
      src: "/images/cc-panel-after.jpg",
      displaySrc: "/images/display/cc-panel-after.jpg",
      alt: "Dark exterior panel with a clearer finish after correction",
    },
  },
  {
    id: "engine-bay",
    label: "Engine bay before and after",
    before: {
      src: "/images/cc-engine-before.jpg",
      displaySrc: "/images/display/cc-engine-before.jpg",
      alt: "Engine bay with visible dust before detailing",
    },
    after: {
      src: "/images/cc-engine-after.jpg",
      displaySrc: "/images/display/cc-engine-after.jpg",
      alt: "Engine bay after detailing",
    },
  },
];

export const finishedWorkItems: GalleryItem[] = [
  {
    src: "/images/cc-corvette-finish.jpg",
    displaySrc: "/images/display/cc-corvette-finish.jpg",
    alt: "Blue Corvette with a reflective exterior finish",
    openLabel: "Open blue Corvette detail",
    className: "finished-work__item--wide",
  },
  {
    src: "/images/gallery-suv.jpg",
    displaySrc: "/images/display/gallery-suv.jpg",
    alt: "Black Porsche Taycan receiving a careful hand wash",
    openLabel: "Open Porsche hand wash detail",
  },
  {
    src: "/images/cc-supra-boat-finish.jpg",
    displaySrc: "/images/display/cc-supra-boat-finish.jpg",
    alt: "Supra boat with a polished exterior finish",
    openLabel: "Open Supra boat detail",
    className: "finished-work__item--tall",
  },
  {
    src: "/images/gallery-coupe.jpg",
    displaySrc: "/images/display/gallery-coupe.jpg",
    alt: "Glossy orange coupe after exterior detailing",
    openLabel: "Open orange coupe detail",
  },
  {
    src: "/images/cc-white-pickup-finish.jpg",
    displaySrc: "/images/display/cc-white-pickup-finish.jpg",
    alt: "White pickup truck after exterior detailing",
    openLabel: "Open white pickup detail",
    className: "finished-work__item--wide",
  },
  {
    src: "/images/gallery-sport.jpg",
    displaySrc: "/images/display/gallery-sport.jpg",
    alt: "Red performance vehicle with a reflective exterior finish",
    openLabel: "Open red performance vehicle detail",
  },
];

export const homepageProof = {
  transformation: transformationPairs[0],
  supportingItems: [finishedWorkItems[0], finishedWorkItems[1]],
} as const;
