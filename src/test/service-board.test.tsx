import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ServiceBoard } from "../components/ServiceBoard";

function setDesktopViewport(desktop: boolean) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: (query: string): MediaQueryList => ({
      matches: query === "(min-width: 768px)" ? desktop : query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false
    })
  });
}

describe("ServiceBoard", () => {
  it("shows Exterior Detail initially and switches to Ceramic Coating", async () => {
    setDesktopViewport(true);
    const user = userEvent.setup();
    const { container } = render(<ServiceBoard />);
    const serviceIndex = screen.getByRole("tablist", { name: "Detailing services" });
    const activePanel = screen.getByRole("tabpanel");

    expect(screen.getByRole("tab", { name: /Exterior Detail/ })).toHaveAttribute("aria-selected", "true");
    expect(within(serviceIndex).getByText("01")).toBeVisible();
    expect(within(serviceIndex).getByText("04")).toBeVisible();
    expect(activePanel).toHaveTextContent("Hand wax +$50");
    expect(activePanel.querySelectorAll(".service-board__spec-row").length).toBeGreaterThan(0);
    expect(activePanel.querySelector("ul")).toBeNull();
    expect(container.querySelectorAll(".service-board img")).toHaveLength(1);

    await user.click(screen.getByRole("tab", { name: /Ceramic Coating/ }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Large SUV, van, or truck $1,100");
  });

  it("moves between services with arrow keys", async () => {
    setDesktopViewport(true);
    const user = userEvent.setup();
    render(<ServiceBoard />);
    const exterior = screen.getByRole("tab", { name: /Exterior Detail/ });
    exterior.focus();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: /Interior Restoration/ })).toHaveFocus();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Full interior restoration $225+");
  });

  it("supports Home and End in the desktop service index", async () => {
    setDesktopViewport(true);
    const user = userEvent.setup();
    render(<ServiceBoard />);
    const exterior = screen.getByRole("tab", { name: /Exterior Detail/ });
    exterior.focus();

    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: /Ceramic Coating/ })).toHaveFocus();
    await user.keyboard("{Home}");
    expect(exterior).toHaveFocus();
  });

  it("uses one shared active service for the mobile accordion", async () => {
    setDesktopViewport(false);
    const user = userEvent.setup();
    const { container } = render(<ServiceBoard />);
    const mobileControls = container.querySelector(".service-board__mobile");

    expect(mobileControls).not.toBeNull();
    expect(container.querySelectorAll(".service-board img")).toHaveLength(1);
    const mobile = within(mobileControls as HTMLElement);
    const exteriorTrigger = mobile.getByRole("button", { name: /Exterior Detail/ });
    const ceramicTrigger = mobile.getByRole("button", { name: /Ceramic Coating/ });
    expect(exteriorTrigger).toHaveAttribute("aria-expanded", "true");
    expect(within(exteriorTrigger).getByText("01")).toBeVisible();
    expect(within(ceramicTrigger).getByText("04")).toBeVisible();

    await user.click(mobile.getByRole("button", { name: /Paint Correction/ }));
    expect(mobile.getByRole("button", { name: /Paint Correction/ })).toHaveAttribute("aria-expanded", "true");
    const correctionRegion = mobile.getByRole("region", { name: "Paint Correction details" });
    expect(within(correctionRegion).getByText("Wet sanding is an additional charge")).toBeVisible();
    expect(correctionRegion.querySelectorAll(".service-board__spec-row").length).toBeGreaterThan(0);
  });
});
