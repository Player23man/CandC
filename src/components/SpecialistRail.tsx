import { ArrowUpRight, EnvelopeSimple, FacebookLogo, Phone } from "@phosphor-icons/react";
import { businessProfile } from "../app/site-data";

export type SpecialistRailProps = {
  variant?: "full" | "phones";
  className?: string;
};

const specialists = [businessProfile.collin];

export function SpecialistRail({ variant = "full", className = "" }: SpecialistRailProps) {
  return (
    <div className={`specialist-rail specialist-rail--${variant} ${className}`.trim()} aria-label="Contact C&C Detailing">
      {specialists.map((specialist) => (
        <a className="specialist-rail__item" href={`tel:${specialist.tel}`} key={specialist.name}>
          <span className="specialist-rail__identity">
            <small>
              <Phone size={16} weight="bold" aria-hidden="true" />
              Phone
            </small>
            <strong>{specialist.name}</strong>
          </span>
          <span className="specialist-rail__destination">
            {specialist.phone}
          </span>
          <ArrowUpRight className="specialist-rail__arrow" size={19} weight="bold" aria-hidden="true" />
        </a>
      ))}

      {variant === "full" && (
        <>
          <a
            className="specialist-rail__item"
            href={`mailto:${businessProfile.email}`}
            aria-label={businessProfile.email}
          >
            <span className="specialist-rail__identity">
              <small>
                <EnvelopeSimple size={16} weight="bold" aria-hidden="true" />
                Email
              </small>
              <strong>C&amp;C Detailing</strong>
            </span>
            <span className="specialist-rail__destination">
              {businessProfile.email}
            </span>
            <ArrowUpRight className="specialist-rail__arrow" size={19} weight="bold" aria-hidden="true" />
          </a>
          <a
            className="specialist-rail__item"
            href={businessProfile.facebook}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <span className="specialist-rail__identity">
              <small>
                <FacebookLogo size={16} weight="bold" aria-hidden="true" />
                Facebook
              </small>
              <strong>C&amp;C Detailing</strong>
            </span>
            <span className="specialist-rail__destination">Open page</span>
            <ArrowUpRight className="specialist-rail__arrow" size={19} weight="bold" aria-hidden="true" />
          </a>
        </>
      )}
    </div>
  );
}
