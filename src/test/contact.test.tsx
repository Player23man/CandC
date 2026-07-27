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
  expect(screen.getByRole("heading", { name: "Contact C&C Detailing" })).toBeVisible();
  expect(screen.getByText("Call, email, or message us on Facebook.")).toBeVisible();
  expect(screen.getByRole("link", { name: /Collin.*815-922-1593/ })).toHaveAttribute("href", "tel:8159221593");
  expect(screen.getByRole("link", { name: /candcdetailing25@gmail.com/ })).toHaveAttribute(
    "href",
    "mailto:candcdetailing25@gmail.com"
  );
  expect(screen.getByRole("link", { name: /Facebook/ })).toHaveAttribute(
    "href",
    "https://www.facebook.com/profile.php?id=61574139886965"
  );
  expect(screen.queryByText("Exterior specialist")).not.toBeInTheDocument();
  expect(screen.queryByText("Caleb")).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Before you request a quote" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Request a quote" })).toBeVisible();
});

describe("ContactForm", () => {
  it("shows inline errors before preparing an email", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    expect(document.querySelector('label[for="quote-phone"] span')).toHaveTextContent("*");
    expect(document.querySelector('label[for="quote-email"] span')).toHaveTextContent("*");

    const quoteButton = screen.getByRole("button", { name: "Get a quote" });
    expect(quoteButton).toHaveClass("button--quote");
    await user.click(quoteButton);

    expect(screen.getByText("Enter your name.")).toBeVisible();
    expect(screen.getByText("Enter your phone number.")).toBeVisible();
    expect(screen.getByText("Enter your email address.")).toBeVisible();
    expect(screen.getByText("Tell us about your vehicle.")).toBeVisible();
    expect(screen.getByText("Choose at least one service.")).toBeVisible();
    expect(screen.getByRole("status")).toHaveTextContent("");
  });

  it("allows customers to select every service that applies", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    expect(screen.getByText("Choose all services that apply.")).toBeVisible();
    const serviceChoices = screen.getAllByRole("checkbox");
    expect(serviceChoices).toHaveLength(6);

    for (const serviceChoice of serviceChoices) {
      await user.click(serviceChoice);
    }

    serviceChoices.forEach((serviceChoice) => {
      expect(serviceChoice).toBeChecked();
      expect(serviceChoice).toBeEnabled();
    });
  });

  it("requires a vehicle photo when Interior Detailing is selected", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    expect(screen.getByText("Optional vehicle photos")).toBeVisible();

    await user.click(screen.getByRole("checkbox", { name: "Exterior Detail" }));
    await user.click(screen.getByRole("checkbox", { name: "Interior Detailing" }));

    const photos = screen.getByLabelText(/Vehicle photos/);
    expect(document.querySelector('label[for="quote-photos"] span')).toHaveTextContent("*");
    expect(photos).toHaveAttribute("aria-required", "true");

    await user.click(screen.getByRole("button", { name: "Get a quote" }));

    expect(screen.getByText("Add at least one interior photo.")).toBeVisible();
    expect(photos).toHaveAttribute("aria-invalid", "true");
  });

  it("clears the photo requirement after upload or a different service selection", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const interior = screen.getByRole("checkbox", { name: "Interior Detailing" });
    await user.click(interior);
    const photos = screen.getByLabelText(/Vehicle photos/);
    await user.click(screen.getByRole("button", { name: "Get a quote" }));
    expect(screen.getByText("Add at least one interior photo.")).toBeVisible();

    await user.upload(photos, new File(["image"], "interior.jpg", { type: "image/jpeg" }));
    expect(screen.queryByText("Add at least one interior photo.")).not.toBeInTheDocument();

    await user.click(interior);
    await user.click(screen.getByRole("checkbox", { name: "Exterior Detail" }));
    expect(screen.getByText("Optional vehicle photos")).toBeVisible();
    expect(photos).toHaveAttribute("aria-required", "false");
  });

  it("builds a recoverable email handoff from submitted details", () => {
    const href = buildQuoteMailto({
      name: "Alec",
      phone: "815-555-0100",
      email: "alec@example.com",
      vehicle: "2022 Ford F-150",
      service: ["Exterior Detail", "Interior Detailing"],
      preference: "Mobile",
      details: "Light swirl marks",
      timing: "Next month"
    });

    expect(href).toContain("mailto:candcdetailing25%40gmail.com");
    expect(decodeURIComponent(href)).toContain("C&C quote request: 2022 Ford F-150");
    expect(decodeURIComponent(href)).toContain("Services: Exterior Detail, Interior Detailing");
  });
});
