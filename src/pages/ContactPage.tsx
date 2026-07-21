import { EnvelopeSimple, FacebookLogo, Phone } from "@phosphor-icons/react";
import { businessProfile, serviceNotes } from "../app/site-data";
import { ContactForm } from "../components/ContactForm";

const specialists = [businessProfile.collin, businessProfile.caleb];

export function ContactPage() {
  return (
    <main id="main-content" className="contact-page">
      <header className="contact-intro shell">
        <div>
          <h1>Let’s talk about your vehicle.</h1>
          <p>C&C works by appointment at the shop and through mobile service around Channahon.</p>
        </div>
      </header>

      <section className="contact-layout shell" aria-label="Quote and contact information">
        <aside className="contact-details">
          <div className="specialist-list">
            {specialists.map((specialist) => (
              <a className="specialist-row" href={`tel:${specialist.tel}`} key={specialist.name}>
                <span>
                  <strong>{specialist.name}</strong>
                  <small>{specialist.role}</small>
                </span>
                <span>{specialist.phone}<Phone size={20} weight="bold" aria-hidden="true" /></span>
              </a>
            ))}
          </div>

          <div className="contact-links">
            <a href={`mailto:${businessProfile.email}`}>
              <EnvelopeSimple size={20} weight="bold" aria-hidden="true" />
              {businessProfile.email}
            </a>
            <a href={businessProfile.facebook} target="_blank" rel="noreferrer">
              <FacebookLogo size={20} weight="bold" aria-hidden="true" />
              Facebook
            </a>
          </div>

          <div className="appointment-notes">
            <h2>Before you request a quote</h2>
            <ul>
              {serviceNotes.map((note) => <li key={note}>{note}</li>)}
            </ul>
          </div>
        </aside>

        <div className="contact-form-wrap">
          <h2>Request a quote</h2>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
