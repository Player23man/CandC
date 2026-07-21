import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { CampaignHero } from "../components/CampaignHero";
import { SpecialistRail } from "../components/SpecialistRail";

describe("campaign system", () => {
  it("renders an image campaign with a labelled title and action slot", () => {
    render(
      <MemoryRouter>
        <CampaignHero
          layout="home"
          title="Finished with intent."
          description="Shop and mobile detailing in Channahon."
          image={{ src: "/images/detail-process.jpg", alt: "White performance car under studio lighting" }}
          actions={<a href="/contact">Get a quote</a>}
        />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Finished with intent." })).toBeVisible();
    expect(screen.getByAltText("White performance car under studio lighting")).toBeVisible();
    expect(screen.getByRole("link", { name: "Get a quote" })).toHaveAttribute("href", "/contact");
  });

  it("renders every real contact destination in the full specialist rail", () => {
    render(<SpecialistRail />);

    expect(screen.getByRole("link", { name: /Collin.*815-922-1593/ })).toHaveAttribute("href", "tel:8159221593");
    expect(screen.queryByText("Caleb")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "candcdetailing25@gmail.com" })).toHaveAttribute("href", "mailto:candcdetailing25@gmail.com");
    expect(screen.getByRole("link", { name: "Facebook" })).toHaveAttribute("target", "_blank");
  });
});
