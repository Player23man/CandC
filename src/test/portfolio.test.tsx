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
  it("renders the editorial gallery and opens an accessible lightbox", () => {
    render(
      <MemoryRouter>
        <PortfolioPage />
      </MemoryRouter>
    );

    expect(document.querySelector(".campaign-hero--portfolio")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "The work." })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Finish" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Process" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Interior" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Protection" })).toBeVisible();
    expect(screen.getAllByRole("button", { name: /Open .* detail/ })).toHaveLength(13);
    const firstImage = screen.getByRole("button", { name: "Open coupe detail" });
    fireEvent.click(firstImage);

    expect(screen.getByRole("dialog", { name: "Portfolio image viewer" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Close image viewer" })).toHaveFocus();
  });

  it("supports Escape and previous/next keyboard controls", () => {
    render(
      <MemoryRouter>
        <PortfolioPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "Open coupe detail" }));
    const dialog = screen.getByRole("dialog", { name: "Portfolio image viewer" });
    expect(within(dialog).getByAltText("Glossy orange coupe after exterior detailing")).toBeVisible();

    fireEvent.keyDown(document, { key: "ArrowRight" });
    expect(within(dialog).getByAltText("Black sport utility vehicle receiving a careful hand wash")).toBeVisible();

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
