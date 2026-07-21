import { EnvelopeSimple, FacebookLogo, Phone } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { businessProfile } from "../app/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <div className="site-footer__brand">
          <img src="/images/cc-wordmark.jpg" alt="C&C Detailing" />
          <p>Shop and mobile detailing in {businessProfile.location}.</p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="site-footer__contacts">
          <a href={`tel:${businessProfile.collin.tel}`}>
            <Phone size={18} aria-hidden="true" />
            Collin {businessProfile.collin.phone}
          </a>
          <a href={`mailto:${businessProfile.email}`}>
            <EnvelopeSimple size={18} aria-hidden="true" />
            {businessProfile.email}
          </a>
          <a href={businessProfile.facebook} target="_blank" rel="noreferrer">
            <FacebookLogo size={19} aria-hidden="true" />
            Facebook
          </a>
        </div>
      </div>

      <div className="shell site-footer__legal">
        <span>© {new Date().getFullYear()} {businessProfile.legalName}</span>
        <span>Appointment only</span>
      </div>
    </footer>
  );
}
