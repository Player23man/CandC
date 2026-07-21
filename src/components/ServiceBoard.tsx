import { CaretDown } from "@phosphor-icons/react";
import { useRef, useState, type KeyboardEvent } from "react";
import { services, type Service } from "../app/site-data";

export const serviceImages: Record<Service["id"], { src: string; alt: string }> = {
  exterior: {
    src: "/images/detail-exterior.jpg",
    alt: "Vehicle receiving a careful hand wash"
  },
  interior: {
    src: "/images/gallery-suv.jpg",
    alt: "Black vehicle being cleaned by hand"
  },
  correction: {
    src: "/images/detail-process.jpg",
    alt: "White performance car under studio lighting"
  },
  ceramic: {
    src: "/images/ceramic-display.jpg",
    alt: "Ceramic coating display on a detailed red vehicle"
  }
};

function ServiceDetails({ service, mobile = false }: { service: Service; mobile?: boolean }) {
  const image = serviceImages[service.id];

  return (
    <div className="service-board__details" key={service.id}>
      <div className="service-board__overview">
        <div>
          <p className="service-board__price">{service.price}</p>
          <h3>{service.name}</h3>
          <p className="service-board__description">{service.description}</p>
        </div>
        {!mobile && <span className="service-board__selected">Selected service</span>}
      </div>

      <div className="service-board__image-wrap">
        <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
      </div>

      <div className="service-board__lists">
        <div>
          <p className="service-board__list-title">Included in service</p>
          <ul>
            {service.details.map((detail) => <li key={detail}>{detail}</li>)}
          </ul>
        </div>
        {service.priceNotes && (
          <div>
            <p className="service-board__list-title">Pricing &amp; options</p>
            <ul>
              {service.priceNotes.map((note) => <li key={note}>{note}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export function ServiceBoard() {
  const [activeId, setActiveId] = useState<Service["id"]>("exterior");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeService = services.find((service) => service.id === activeId) ?? services[0];

  const selectAndFocus = (index: number) => {
    const nextIndex = (index + services.length) % services.length;
    setActiveId(services[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = index + 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = index - 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = services.length - 1;

    if (nextIndex === null) return;
    event.preventDefault();
    selectAndFocus(nextIndex);
  };

  return (
    <div className="service-board">
      <div className="service-board__desktop">
        <div className="service-board__tabs" role="tablist" aria-label="Detailing services">
          {services.map((service, index) => {
            const isActive = service.id === activeId;
            return (
              <button
                className="service-board__tab"
                data-active={isActive}
                id={`service-tab-${service.id}`}
                key={service.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`service-panel-${service.id}`}
                tabIndex={isActive ? 0 : -1}
                ref={(node) => { tabRefs.current[index] = node; }}
                onClick={() => setActiveId(service.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                <span>{service.name}</span>
                <small>{service.price}</small>
              </button>
            );
          })}
        </div>

        <div
          className="service-board__panel"
          id={`service-panel-${activeService.id}`}
          role="tabpanel"
          aria-labelledby={`service-tab-${activeService.id}`}
          tabIndex={0}
        >
          <ServiceDetails service={activeService} />
        </div>
      </div>

      <div className="service-board__mobile">
        {services.map((service) => {
          const isActive = service.id === activeId;
          return (
            <div className="service-board__mobile-item" key={service.id}>
              <button
                className="service-board__mobile-trigger"
                type="button"
                aria-expanded={isActive}
                aria-controls={`service-mobile-panel-${service.id}`}
                onClick={() => setActiveId(service.id)}
              >
                <span>
                  <strong>{service.name}</strong>
                  <small>{service.price}</small>
                </span>
                <CaretDown size={20} weight="bold" aria-hidden="true" />
              </button>
              {isActive && (
                <div
                  className="service-board__mobile-panel"
                  id={`service-mobile-panel-${service.id}`}
                  role="region"
                  aria-label={`${service.name} details`}
                >
                  <ServiceDetails service={service} mobile />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
