import type { ReactNode } from "react";

type CampaignImage = {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  fetchPriority?: "high" | "low" | "auto";
};

export type CampaignHeroProps = {
  layout: "home" | "portfolio" | "contact";
  title: string;
  description: string;
  image?: CampaignImage;
  imageAction?: { label: string; onClick: () => void };
  actions?: ReactNode;
};

export function CampaignHero({ layout, title, description, image, imageAction, actions }: CampaignHeroProps) {
  const titleId = `campaign-${layout}-title`;
  const imageElement = image ? (
    <img
      className="campaign-hero__image"
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.sizes}
      alt={image.alt}
      fetchPriority={image.fetchPriority}
    />
  ) : null;

  return (
    <header className={`campaign-hero campaign-hero--${layout}`} aria-labelledby={titleId}>
      {imageAction && imageElement ? (
        <button
          className="campaign-hero__image-action"
          type="button"
          aria-label={imageAction.label}
          onClick={imageAction.onClick}
        >
          {imageElement}
        </button>
      ) : (
        imageElement
      )}
      {image && <div className="campaign-hero__scrim" aria-hidden="true" />}
      <div className="shell campaign-hero__content">
        <h1 id={titleId}>{title}</h1>
        <p>{description}</p>
        {actions && <div className="campaign-hero__actions">{actions}</div>}
      </div>
    </header>
  );
}
