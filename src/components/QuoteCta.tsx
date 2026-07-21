import { ArrowRight, Phone } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { businessProfile } from "../app/site-data";

export function QuoteCta() {
  return (
    <section className="quote-cta" aria-labelledby="quote-cta-title">
      <div className="shell quote-cta__inner">
        <h2 id="quote-cta-title">Tell us what your vehicle needs.</h2>
        <div className="quote-cta__actions">
          <Link className="button quote-cta__primary" to="/contact">
            Get a quote
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </Link>
          <a href={`tel:${businessProfile.collin.tel}`}>
            <Phone size={18} weight="bold" aria-hidden="true" />
            Collin {businessProfile.collin.phone}
          </a>
          <a href={`tel:${businessProfile.caleb.tel}`}>
            <Phone size={18} weight="bold" aria-hidden="true" />
            Caleb {businessProfile.caleb.phone}
          </a>
        </div>
        <p>Appointment only. Mileage fees may apply for mobile service.</p>
      </div>
    </section>
  );
}
