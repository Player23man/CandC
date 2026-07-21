import { describe, expect, it } from "vitest";
import { businessProfile, services, testimonial } from "../app/site-data";

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
    expect(interior?.priceNotes).toBeUndefined();
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
