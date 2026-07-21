import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { buildQuoteMailto, ContactForm } from "../components/ContactForm";

describe("ContactForm", () => {
  it("shows inline errors before preparing an email", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Get a quote" }));

    expect(screen.getByText("Enter your name.")).toBeVisible();
    expect(screen.getByText("Enter a phone number or email address.")).toBeVisible();
    expect(screen.getByText("Tell us about your vehicle.")).toBeVisible();
    expect(screen.getByRole("status")).toHaveTextContent("");
  });

  it("builds a recoverable email handoff from submitted details", () => {
    const href = buildQuoteMailto({
      name: "Alec",
      phone: "815-555-0100",
      email: "",
      vehicle: "2022 Ford F-150",
      service: "Ceramic Coating",
      preference: "Mobile",
      details: "Light swirl marks",
      timing: "Next month"
    });

    expect(href).toContain("mailto:candcdetailing25%40gmail.com");
    expect(decodeURIComponent(href)).toContain("C&C quote request: 2022 Ford F-150");
    expect(decodeURIComponent(href)).toContain("Service: Ceramic Coating");
  });
});
