import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { testimonial } from "../app/site-data";
import { HomePage } from "../pages/HomePage";

describe("HomePage", () => {
  it("renders the approved hero and service prices", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Finished with intent." })).toBeVisible();
    expect(screen.getByText("Exterior Detail")).toBeVisible();
    expect(screen.getByText("From $600")).toBeVisible();
    expect(screen.getByText("From $900")).toBeVisible();
  });

  it("renders the exact source testimonial and quote action", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText(testimonial)).toBeVisible();
    expect(screen.getAllByRole("link", { name: "Get a quote" }).length).toBeGreaterThan(0);
  });
});
