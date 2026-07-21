import { useState, type FormEvent } from "react";
import { businessProfile, services } from "../app/site-data";

export type QuoteFormValues = {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  service: string;
  preference: string;
  details: string;
  timing: string;
};

type QuoteFormErrors = Partial<Record<"name" | "phone" | "email" | "vehicle" | "service" | "details", string>>;

const initialValues: QuoteFormValues = {
  name: "",
  phone: "",
  email: "",
  vehicle: "",
  service: "",
  preference: "",
  details: "",
  timing: ""
};

export function buildQuoteMailto(values: QuoteFormValues) {
  const subject = `C&C quote request: ${values.vehicle}`;
  const body = [
    `Name: ${values.name}`,
    `Phone: ${values.phone || "Not provided"}`,
    `Email: ${values.email || "Not provided"}`,
    `Vehicle: ${values.vehicle}`,
    `Service: ${values.service}`,
    `Shop or mobile: ${values.preference || "No preference"}`,
    `Vehicle condition and details: ${values.details}`,
    `Preferred timing: ${values.timing || "Not provided"}`,
    "",
    "Photos will be added manually if available."
  ].join("\n");

  return `mailto:${encodeURIComponent(businessProfile.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function validateQuote(values: QuoteFormValues): QuoteFormErrors {
  const errors: QuoteFormErrors = {};

  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!values.phone.trim()) errors.phone = "Enter your phone number.";
  if (!values.email.trim()) errors.email = "Enter your email address.";
  if (!values.vehicle.trim()) errors.vehicle = "Tell us about your vehicle.";
  if (!values.service) errors.service = "Choose a service.";
  if (!values.details.trim()) errors.details = "Describe the vehicle’s condition or what you need help with.";

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<QuoteFormErrors>({});
  const [preparedMailto, setPreparedMailto] = useState("");
  const [status, setStatus] = useState("");

  const updateValue = (field: keyof QuoteFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateQuote(values);
    setErrors(nextErrors);
    setPreparedMailto("");
    setStatus("");

    if (Object.keys(nextErrors).length > 0) return;

    const href = buildQuoteMailto(values);
    setPreparedMailto(href);
    setStatus("Your quote details are ready. Your email app should open with a prepared message.");
    window.location.href = href;
  };

  const copyEmail = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(businessProfile.email);
      setStatus("Email address copied.");
    }
  };

  return (
    <form className="quote-form" noValidate onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="quote-name">Name <span aria-hidden="true">*</span></label>
        <input
          id="quote-name"
          name="name"
          autoComplete="name"
          value={values.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "quote-name-error" : undefined}
          onChange={(event) => updateValue("name", event.target.value)}
        />
        {errors.name && <p className="field-error" id="quote-name-error">{errors.name}</p>}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="quote-phone">Phone <span aria-hidden="true">*</span></label>
          <input
            id="quote-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "quote-phone-error" : undefined}
            onChange={(event) => updateValue("phone", event.target.value)}
          />
          {errors.phone && <p className="field-error" id="quote-phone-error">{errors.phone}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="quote-email">Email <span aria-hidden="true">*</span></label>
          <input
            id="quote-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "quote-email-error" : undefined}
            onChange={(event) => updateValue("email", event.target.value)}
          />
          {errors.email && <p className="field-error" id="quote-email-error">{errors.email}</p>}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="quote-vehicle">Vehicle year, make, and model <span aria-hidden="true">*</span></label>
        <input
          id="quote-vehicle"
          name="vehicle"
          value={values.vehicle}
          aria-invalid={Boolean(errors.vehicle)}
          aria-describedby={errors.vehicle ? "quote-vehicle-error" : undefined}
          onChange={(event) => updateValue("vehicle", event.target.value)}
        />
        {errors.vehicle && <p className="field-error" id="quote-vehicle-error">{errors.vehicle}</p>}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="quote-service">Service interest <span aria-hidden="true">*</span></label>
          <select
            id="quote-service"
            name="service"
            value={values.service}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "quote-service-error" : undefined}
            onChange={(event) => updateValue("service", event.target.value)}
          >
            <option value="">Select a service</option>
            {services.map((service) => <option value={service.name} key={service.id}>{service.name}</option>)}
            <option value="Not sure">Not sure yet</option>
          </select>
          {errors.service && <p className="field-error" id="quote-service-error">{errors.service}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="quote-preference">Shop or mobile preference</label>
          <select
            id="quote-preference"
            name="preference"
            value={values.preference}
            onChange={(event) => updateValue("preference", event.target.value)}
          >
            <option value="">No preference</option>
            <option value="Shop">Shop</option>
            <option value="Mobile">Mobile</option>
          </select>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="quote-details">Vehicle condition and details <span aria-hidden="true">*</span></label>
        <textarea
          id="quote-details"
          name="details"
          rows={5}
          value={values.details}
          aria-invalid={Boolean(errors.details)}
          aria-describedby={errors.details ? "quote-details-error" : undefined}
          onChange={(event) => updateValue("details", event.target.value)}
        />
        {errors.details && <p className="field-error" id="quote-details-error">{errors.details}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="quote-timing">Preferred timing</label>
        <input
          id="quote-timing"
          name="timing"
          value={values.timing}
          onChange={(event) => updateValue("timing", event.target.value)}
        />
      </div>

      <div className="form-field form-field--file">
        <label htmlFor="quote-photos">Optional vehicle photos</label>
        <input id="quote-photos" name="photos" type="file" accept="image/*" multiple />
        <p>Attachments cannot be transferred automatically. Add selected photos to the prepared email before sending.</p>
      </div>

      <div className="quote-form__submit">
        <button className="button button--primary" type="submit">Get a quote</button>
        <p>Submitting prepares an email. It does not send anything automatically.</p>
      </div>

      <div className="quote-form__status" role="status" aria-live="polite">{status}</div>

      {preparedMailto && (
        <div className="email-fallback">
          <p>If no mail app opened, email <a href={preparedMailto}>{businessProfile.email}</a>.</p>
          <button type="button" onClick={copyEmail}>Copy email address</button>
        </div>
      )}
    </form>
  );
}
