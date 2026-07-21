import { ArrowRight, Phone } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { businessProfile } from "../app/site-data";

export function QuoteCta() {
  return (
    <section className="quote-cta" aria-labelledby="quote-cta-title">
      <div className="shell quote-cta__inner">
        <div className="quote-cta__heading">
          <h2 id="quote-cta-title">Tell us what your vehicle needs.</h2>
          <p>Appointment only. Mileage fees may apply for mobile service.</p>
        </div>

        <div className="quote-cta__action">
          <Link className="button button--primary quote-cta__primary" to="/contact">
            Get a quote
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </Link>
        </div>

        <div className="quote-cta__specialists" aria-label="Call a detailing specialist">
          <a className="quote-cta__specialist" href={`tel:${businessProfile.collin.tel}`}>
            <span className="quote-cta__specialist-info">
              <strong>{businessProfile.collin.name}</strong>
              <small>{businessProfile.collin.role}</small>
            </span>
            <span className="quote-cta__phone">
              <Phone size={18} weight="bold" aria-hidden="true" />
              {businessProfile.collin.phone}
            </span>
          </a>
          <a className="quote-cta__specialist" href={`tel:${businessProfile.caleb.tel}`}>
            <span className="quote-cta__specialist-info">
              <strong>{businessProfile.caleb.name}</strong>
              <small>{businessProfile.caleb.role}</small>
            </span>
            <span className="quote-cta__phone">
              <Phone size={18} weight="bold" aria-hidden="true" />
              {businessProfile.caleb.phone}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
