import { describe, expect, it } from "vitest";
import { businessProfile, services, testimonial } from "../app/site-data";

describe("C&C business data", () => {
  it("preserves current contact details", () => {
    expect(businessProfile.collin.phone).toBe("815-922-1593");
    expect(businessProfile.caleb.phone).toBe("815-409-5501");
    expect(businessProfile.email).toBe("candcdetailing25@gmail.com");
  });

  it("preserves service pricing and testimonial wording", () => {
    expect(services.find((service) => service.id === "ceramic")?.price).toBe("From $900");
    expect(services.find((service) => service.id === "correction")?.price).toBe("From $600");
    expect(testimonial).toContain("2022 Tucson");
    expect(testimonial).toContain("every crevice of car cleaned to perfection!");
  });
});
