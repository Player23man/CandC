import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "../components/SiteFooter";

describe("SiteFooter", () => {
  it("links the Frontstage design credit and removes the appointment note", () => {
    render(
      <MemoryRouter>
        <SiteFooter />
      </MemoryRouter>
    );

    expect(screen.queryByText("Appointment only")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Designed by Frontstage." })).toHaveAttribute(
      "href",
      "https://frontstagewebdesign.com"
    );
    expect(screen.getByText("Frontstage.")).toHaveClass("site-footer__credit-wordmark");
  });
});
