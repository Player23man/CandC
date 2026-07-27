import { useState, type FormEvent } from "react";
import { services } from "../app/site-data";

export type QuoteFormValues = {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  service: string[];
  preference: string;
  details: string;
  timing: string;
};

type QuoteFormErrors = Partial<Record<"name" | "phone" | "email" | "vehicle" | "service" | "details" | "photos", string>>;

const initialValues: QuoteFormValues = {
  name: "",
  phone: "",
  email: "",
  vehicle: "",
  service: [],
  preference: "",
  details: "",
  timing: ""
};

function validateQuote(values: QuoteFormValues, photoCount: number): QuoteFormErrors {
  const errors: QuoteFormErrors = {};

  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!values.phone.trim()) errors.phone = "Enter your phone number.";
  if (!values.email.trim()) errors.email = "Enter your email address.";
  if (!values.vehicle.trim()) errors.vehicle = "Tell us about your vehicle.";
  if (values.service.length === 0) errors.service = "Choose at least one service.";
  if (!values.details.trim()) errors.details = "Describe the vehicle’s condition or what you need help with.";
  if (values.service.includes("Interior Detailing") && photoCount === 0) {
    errors.photos = "Add at least one interior photo.";
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<QuoteFormErrors>({});
  const [status, setStatus] = useState("");
  const [photoCount, setPhotoCount] = useState(0);
  const requiresInteriorPhotos = values.service.includes("Interior Detailing");

  const updateValue = (field: keyof QuoteFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const toggleService = (serviceName: string) => {
    const isSelected = values.service.includes(serviceName);
    const nextServices = isSelected
      ? values.service.filter((service) => service !== serviceName)
      : [...values.service, serviceName];

    setValues((current) => ({ ...current, service: nextServices }));

    if (nextServices.length > 0) {
      setErrors(({ service: _service, ...current }) => current);
    }
    if (!nextServices.includes("Interior Detailing")) {
      setErrors(({ photos: _photos, ...current }) => current);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const nextErrors = validateQuote(values, photoCount);
    setErrors(nextErrors);
    setStatus("");

    if (Object.keys(nextErrors).length > 0) {
      event.preventDefault();
      return;
    }

    setStatus("Sending your quote request…");
  };

  return (
    <form
      className="quote-form"
      action="https://formspree.io/f/xjgnjqjv"
      method="post"
      encType="multipart/form-data"
      noValidate
      onSubmit={handleSubmit}
    >
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

      <fieldset
        className="service-choice-group"
        aria-invalid={Boolean(errors.service)}
        aria-describedby={[
          "quote-service-help",
          errors.service ? "quote-service-error" : ""
        ].filter(Boolean).join(" ")}
      >
        <legend>Service interest <span aria-hidden="true">*</span></legend>
        <p className="service-choice-group__help" id="quote-service-help">Choose all services that apply.</p>
        <div className="service-choice-grid">
          {[...services.map((service) => service.name), "Not sure yet"].map((serviceName) => {
            const checked = values.service.includes(serviceName);
            return (
              <label className="service-choice" key={serviceName}>
                <input
                  type="checkbox"
                  name="service"
                  value={serviceName}
                  checked={checked}
                  onChange={() => toggleService(serviceName)}
                />
                <span>{serviceName}</span>
              </label>
            );
          })}
        </div>
        {errors.service && <p className="field-error" id="quote-service-error">{errors.service}</p>}
      </fieldset>

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
        <label htmlFor="quote-photos">
          {requiresInteriorPhotos ? "Vehicle photos" : "Optional vehicle photos"}
          {requiresInteriorPhotos && <> <span aria-hidden="true">*</span></>}
        </label>
        <input
          id="quote-photos"
          name="photos"
          type="file"
          accept="image/*"
          multiple
          aria-required={requiresInteriorPhotos}
          aria-invalid={Boolean(errors.photos)}
          aria-describedby={errors.photos ? "quote-photos-error" : undefined}
          onChange={(event) => {
            const nextPhotoCount = event.target.files?.length ?? 0;
            setPhotoCount(nextPhotoCount);
            if (nextPhotoCount > 0) {
              setErrors(({ photos: _photos, ...current }) => current);
            }
          }}
        />
        {errors.photos && <p className="field-error" id="quote-photos-error">{errors.photos}</p>}
        <p>Selected photos will be included with your request.</p>
      </div>

      <div className="quote-form__submit">
        <button className="button button--primary button--quote" type="submit" aria-label="Get a quote">
          Get a quote
        </button>
        <p>Submitting sends your request directly to C&C.</p>
      </div>

      <div className="quote-form__status" role="status" aria-live="polite">{status}</div>
    </form>
  );
}
