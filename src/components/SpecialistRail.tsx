import { EnvelopeSimple, FacebookLogo, Phone } from "@phosphor-icons/react";
import { businessProfile } from "../app/site-data";

export type SpecialistRailProps = {
  variant?: "full" | "phones";
  className?: string;
};

const specialists = [businessProfile.collin, businessProfile.caleb];

export function SpecialistRail({ variant = "full", className = "" }: SpecialistRailProps) {
  return (
    <div className={`specialist-rail specialist-rail--${variant} ${className}`.trim()} aria-label="Contact C&C Detailing">
      {specialists.map((specialist) => (
        <a className="specialist-rail__item" href={`tel:${specialist.tel}`} key={specialist.name}>
          <span className="specialist-rail__identity">
            <strong>{specialist.name}</strong>
            <small>{specialist.role}</small>
          </span>
          <span className="specialist-rail__destination">
            <Phone size={18} weight="bold" aria-hidden="true" />
            {specialist.phone}
          </span>
        </a>
      ))}

      {variant === "full" && (
        <>
          <a className="specialist-rail__item specialist-rail__item--single" href={`mailto:${businessProfile.email}`}>
            <EnvelopeSimple size={19} weight="bold" aria-hidden="true" />
            {businessProfile.email}
          </a>
          <a
            className="specialist-rail__item specialist-rail__item--single"
            href={businessProfile.facebook}
            target="_blank"
            rel="noreferrer"
          >
            <FacebookLogo size={19} weight="bold" aria-hidden="true" />
            Facebook
          </a>
        </>
      )}
    </div>
  );
}
