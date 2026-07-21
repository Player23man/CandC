import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { galleryItems } from "../app/gallery-data";
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
    expect(screen.getByRole("heading", { name: "Protection" })).toBeVisible();
    expect(screen.getAllByRole("button", { name: /Open .* detail/ })).toHaveLength(6);
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

  it("keeps full-resolution lightbox sources and display-sized page sources", () => {
    for (const item of galleryItems) {
      expect(item.displaySrc).toMatch(/^\/images\/display\//);
      expect(item.src).toMatch(/^\/images\/(?!display\/)/);
    }
  });
});
