import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { SpecialistRail } from "./SpecialistRail";

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

        <SpecialistRail variant="phones" className="quote-cta__specialists" />
      </div>
    </section>
  );
}
