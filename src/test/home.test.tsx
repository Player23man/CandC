import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { HomePage } from "../pages/HomePage";

describe("HomePage", () => {
  it("renders the approved hero and service prices", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Finished with intent." })).toBeVisible();
    expect(screen.getByRole("tab", { name: /Exterior Detail/ })).toBeVisible();
    expect(screen.getByRole("tab", { name: /Paint Correction/ })).toHaveTextContent("From $600");
    expect(screen.getByRole("tab", { name: /Ceramic Coating/ })).toHaveTextContent("From $900");
  });

  it("uses the service board and attributes the customer review", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Choose the work your vehicle needs." })).toBeVisible();
    expect(screen.queryByRole("heading", { name: "Built around what your vehicle needs." })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "What the work includes." })).not.toBeInTheDocument();
    expect(screen.getByText("Verified customer review")).toBeVisible();
    expect(screen.getByText("2022 Tucson owner")).toBeVisible();
  });

  it("renders the source review excerpt and quote action", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/I felt like I drove away in a brand-new car/)).toBeVisible();
    expect(screen.getAllByRole("link", { name: "Get a quote" }).length).toBeGreaterThan(0);
  });
});
