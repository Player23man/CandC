import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import {
  finishedWorkItems,
  homepageProof,
  transformationPairs,
} from "../app/gallery-data";
import { PortfolioPage } from "../pages/PortfolioPage";

describe("PortfolioPage", () => {
  it("renders six editorial comparisons and a caption-free finished-work grid", () => {
    render(
      <MemoryRouter>
        <PortfolioPage />
      </MemoryRouter>,
    );

    const transformations = screen.getByRole("region", {
      name: "Detailing transformations",
    });
    expect(within(transformations).getAllByRole("slider")).toHaveLength(6);
    expect(
      screen.getByRole("heading", { name: "Transformations" }),
    ).toBeVisible();
    expect(screen.getByRole("heading", { name: "Finished work" })).toBeVisible();
    expect(document.querySelectorAll(".portfolio-page figcaption")).toHaveLength(0);
    expect(
      screen.getAllByRole("button", { name: /Open .* detail/ }),
    ).toHaveLength(finishedWorkItems.length + 1);
  });

  it("opens finished work and supports Escape and previous/next keyboard controls", () => {
    render(
      <MemoryRouter>
        <PortfolioPage />
      </MemoryRouter>,
    );

    fireEvent.click(
      screen.getAllByRole("button", { name: "Open blue Corvette detail" })[0],
    );
    const dialog = screen.getByRole("dialog", { name: "Portfolio image viewer" });
    expect(
      within(dialog).getByAltText("Blue Corvette with a reflective exterior finish"),
    ).toBeVisible();
    expect(screen.getByRole("button", { name: "Close image viewer" })).toHaveFocus();

    fireEvent.keyDown(document, { key: "ArrowRight" });
    expect(
      within(dialog).getByAltText("Black Porsche Taycan receiving a careful hand wash"),
    ).toBeVisible();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("models six local transformation pairs and a curated finished-work set", () => {
    expect(transformationPairs.map((pair) => pair.id)).toEqual([
      "paint-correction",
      "driver-footwell",
      "cargo-area",
      "center-console",
      "exterior-panel",
      "engine-bay",
    ]);

    for (const pair of transformationPairs) {
      expect(pair.before.src).toMatch(/^\/images\/cc-/);
      expect(pair.before.displaySrc).toMatch(/^\/images\/display\/cc-/);
      expect(pair.after.src).toMatch(/^\/images\/cc-/);
      expect(pair.after.displaySrc).toMatch(/^\/images\/display\/cc-/);
    }

    expect(finishedWorkItems).toHaveLength(6);
    expect(homepageProof.transformation.id).toBe("paint-correction");
    expect(homepageProof.supportingItems).toHaveLength(2);
  });
});
