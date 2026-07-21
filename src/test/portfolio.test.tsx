import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { PortfolioPage } from "../pages/PortfolioPage";

describe("PortfolioPage", () => {
  it("renders the editorial gallery and opens an accessible lightbox", () => {
    render(
      <MemoryRouter>
        <PortfolioPage />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "The work." })).toBeVisible();
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
});
