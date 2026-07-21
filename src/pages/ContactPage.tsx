import { serviceNotes } from "../app/site-data";
import { CampaignHero } from "../components/CampaignHero";
import { ContactForm } from "../components/ContactForm";
import { SpecialistRail } from "../components/SpecialistRail";

export function ContactPage() {
  return (
    <main id="main-content" className="contact-page">
      <CampaignHero
        layout="contact"
        title="Let’s talk about your vehicle."
        description="C&C works by appointment at the shop and through mobile service around Channahon."
      />

      <section className="contact-rail-band" aria-label="Contact C&C Detailing">
        <div className="shell">
          <SpecialistRail />
        </div>
      </section>

      <section className="quote-chapter" aria-label="Quote request">
        <div className="shell quote-chapter__inner">
          <div className="appointment-notes">
            <h2>Before you request a quote</h2>
            <ul>
              {serviceNotes.map((note) => <li key={note}>{note}</li>)}
            </ul>
          </div>

          <div className="contact-form-wrap">
            <h2>Request a quote</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
