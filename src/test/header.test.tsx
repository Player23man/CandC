import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "../components/SiteHeader";

describe("SiteHeader", () => {
  it("opens a numbered mobile menu with routes, contact details, and a quote action", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const mobileNavigation = screen.getByRole("navigation", { name: "Mobile navigation" });

    expect(within(mobileNavigation).getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(within(mobileNavigation).getByRole("link", { name: "Portfolio" })).toHaveAttribute(
      "href",
      "/portfolio"
    );
    expect(within(mobileNavigation).getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact"
    );
    expect(within(mobileNavigation).getByText("01")).toBeInTheDocument();
    expect(within(mobileNavigation).getByText("02")).toBeInTheDocument();
    expect(within(mobileNavigation).getByText("03")).toBeInTheDocument();
    expect(
      within(mobileNavigation).getByRole("link", { name: "Call Collin at 815-922-1593" })
    ).toHaveAttribute("href", "tel:8159221593");
    expect(within(mobileNavigation).getByText("Channahon, Illinois")).toBeInTheDocument();
    expect(within(mobileNavigation).getByRole("link", { name: "Get a quote" })).toHaveAttribute(
      "href",
      "/contact"
    );
    expect(document.body.style.overflow).toBe("hidden");

    screen.getAllByRole("link", { name: "Get a quote" }).forEach((quoteLink) => {
      expect(quoteLink).toHaveClass("button--quote");
    });

    await user.click(screen.getByRole("button", { name: "Close menu" }));

    expect(document.body.style.overflow).toBe("");
  });
});
