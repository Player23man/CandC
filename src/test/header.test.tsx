import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "../components/SiteHeader";

describe("SiteHeader", () => {
  it("opens the mobile menu and exposes every route", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    expect(screen.getAllByRole("link", { name: "Home" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Portfolio" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Contact" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Get a quote" })[0]).toHaveAttribute("href", "/contact");
  });
});
