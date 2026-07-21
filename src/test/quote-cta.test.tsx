import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, it } from "vitest";
import { QuoteCta } from "../components/QuoteCta";

it("renders the contact dock with both specialists", () => {
  const { container } = render(
    <MemoryRouter>
      <QuoteCta />
    </MemoryRouter>
  );

  expect(screen.getByRole("heading", { name: "Tell us what your vehicle needs." })).toBeVisible();
  expect(container.querySelector(".specialist-rail--phones")).toBeInTheDocument();
  expect(screen.getByText("Exterior specialist")).toBeVisible();
  expect(screen.getByText("Interior specialist")).toBeVisible();
  expect(screen.getByRole("link", { name: "Get a quote" })).toHaveAttribute("href", "/contact");
  expect(screen.getByRole("link", { name: /Collin.*815-922-1593/ })).toHaveAttribute("href", "tel:8159221593");
  expect(screen.getByRole("link", { name: /Caleb.*815-409-5501/ })).toHaveAttribute("href", "tel:8154095501");
});
