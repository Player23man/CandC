import { describe, expect, it } from "vitest";
import { businessProfile, services, testimonial, workIncludes } from "../app/site-data";

describe("C&C business data", () => {
  it("preserves current contact details", () => {
    expect(businessProfile.collin.phone).toBe("815-922-1593");
    expect(businessProfile).not.toHaveProperty("caleb");
    expect(businessProfile.email).toBe("candcdetailing25@gmail.com");
  });

  it("preserves service pricing and testimonial wording", () => {
    const interior = services.find((service) => service.id === "interior");
    const marine = services.find((service) => service.id === "marine");

    expect(interior?.name).toBe("Interior Detailing");
    expect(interior?.price).toBe("From $160");
    expect(interior?.details).toEqual([
      "Full interior blow-out and debris extraction",
      "Comprehensive vacuum of carpets, seats, and trunk",
      "Deep shampoo of carpets, cloth seats, and carpet mats",
      "Deep leather cleaning and conditioning",
      "Steam cleaning and sanitization of surfaces",
      "Full interior surface scrub",
      "Headliner spot cleaning",
      "Floor mat cleaning",
      "Odor neutralization"
    ]);
    expect(interior?.priceNotes).toBeUndefined();
    const exterior = services.find((service) => service.id === "exterior");
    expect(exterior?.details).toContain("Hand wash and hydro sealer");
    expect(JSON.stringify({ services, workIncludes }).toLowerCase()).not.toContain("spray wax");
    expect(workIncludes.protection).toContain("Hydro sealer");
    expect(marine?.price).toBe("From $10/ft");
    expect(marine?.priceNotes).toEqual(expect.arrayContaining([
      "Wash and wax $30/ft",
      "Wash, heavy oxidation removal, and wax $80-$100/ft",
      "Ceramic coating +$20/ft",
      "Deep interior cleaning $30-$40/ft"
    ]));
    expect(services.find((service) => service.id === "ceramic")?.price).toBe("From $900");
    expect(services.find((service) => service.id === "correction")?.price).toBe("From $600");
    expect(testimonial).toContain("2022 Tucson");
    expect(testimonial).toContain("every crevice of car cleaned to perfection!");
  });
});
