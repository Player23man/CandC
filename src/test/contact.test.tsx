import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { buildQuoteMailto, ContactForm } from "../components/ContactForm";
import { ContactPage } from "../pages/ContactPage";

it("renders the concierge campaign, contact rail, and request guidance", () => {
  render(
    <MemoryRouter>
      <ContactPage />
    </MemoryRouter>
  );

  expect(document.querySelector(".campaign-hero--contact")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Let’s talk about your vehicle." })).toBeVisible();
  expect(screen.getByRole("link", { name: /Collin.*815-922-1593/ })).toHaveAttribute("href", "tel:8159221593");
  expect(screen.getByRole("link", { name: /Caleb.*815-409-5501/ })).toHaveAttribute("href", "tel:8154095501");
  expect(screen.getByRole("heading", { name: "Before you request a quote" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Request a quote" })).toBeVisible();
});

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
