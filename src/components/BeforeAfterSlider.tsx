import { useState, type CSSProperties } from "react";
import type { TransformationPair } from "../app/gallery-data";

type BeforeAfterSliderProps = {
  pair: TransformationPair;
  priority?: boolean;
  className?: string;
};

export function BeforeAfterSlider({
  pair,
  priority = false,
  className = "",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const style = {
    "--comparison-position": `${position}%`,
  } as CSSProperties;

  return (
    <figure
      className={`before-after ${className}`.trim()}
      style={style}
      data-comparison-id={pair.id}
    >
      <img
        className="before-after__image before-after__image--after"
        src={pair.after.displaySrc}
        alt={pair.after.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
      <div className="before-after__before-layer">
        <img
          className="before-after__image before-after__image--before"
          src={pair.before.displaySrc}
          alt={pair.before.alt}
          loading={priority ? "eager" : "lazy"}
        />
      </div>
      <span className="before-after__label before-after__label--before">
        Before
      </span>
      <span className="before-after__label before-after__label--after">
        After
      </span>
      <span className="before-after__divider" aria-hidden="true">
        <span className="before-after__handle">
          <span className="before-after__handle-arrow">‹</span>
          <span className="before-after__handle-arrow">›</span>
        </span>
      </span>
      <input
        className="before-after__range"
        type="range"
        min="0"
        max="100"
        value={position}
        aria-label={pair.label}
        aria-valuetext={`${position}% before image`}
        onChange={(event) => setPosition(Number(event.currentTarget.value))}
      />
    </figure>
  );
}
