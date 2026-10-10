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
    expect(within(serviceIndex).getAllByRole("tab")).toHaveLength(6);
    expect(activePanel).toHaveTextContent("Hand wax +$50");
    expect(activePanel.querySelectorAll(".service-board__spec-row").length).toBeGreaterThan(0);
    expect(activePanel.querySelector("ul")).toBeNull();
    expect(container.querySelectorAll(".service-board img")).toHaveLength(1);

    await user.click(screen.getByRole("tab", { name: /Ceramic Coating/ }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Large SUV, van, or truck $1,100");

    await user.click(screen.getByRole("tab", { name: /Marine Detailing/ }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Wash, heavy oxidation removal, and wax $80-$100/ft");

    await user.click(screen.getByRole("tab", { name: /Maintenance Wash & Interior Refresh/ }));
    const maintenancePanel = screen.getByRole("tabpanel");
    expect(maintenancePanel).toHaveTextContent("Small sedans $55");
    expect(maintenancePanel).toHaveTextContent("SUVs & regular trucks $65");
    expect(maintenancePanel).toHaveTextContent("Large trucks $75");
    expect(maintenancePanel).toHaveTextContent("Travel fee is additional for mobile service");
    expect(maintenancePanel).toHaveTextContent("Hand wash and hand dry");
    expect(maintenancePanel).toHaveTextContent("Wheel cleaning");
    expect(maintenancePanel).toHaveTextContent("Interior vacuum");
    expect(maintenancePanel).toHaveTextContent("Quick interior dusting");
  });

  it("moves between services with arrow keys", async () => {
    setDesktopViewport(true);
    const user = userEvent.setup();
    render(<ServiceBoard />);
    const exterior = screen.getByRole("tab", { name: /Exterior Detail/ });
    exterior.focus();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: /Interior Detailing/ })).toHaveFocus();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("From $160");
  });

  it("supports Home and End in the desktop service index", async () => {
    setDesktopViewport(true);
    const user = userEvent.setup();
    render(<ServiceBoard />);
    const exterior = screen.getByRole("tab", { name: /Exterior Detail/ });
    exterior.focus();

    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: /Maintenance Wash & Interior Refresh/ })).toHaveFocus();
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
    expect(mobile.getAllByRole("button")).toHaveLength(6);
    expect(exteriorTrigger).toHaveAttribute("aria-expanded", "true");

    await user.click(mobile.getByRole("button", { name: /Paint Correction/ }));
    expect(mobile.getByRole("button", { name: /Paint Correction/ })).toHaveAttribute("aria-expanded", "true");
    const correctionRegion = mobile.getByRole("region", { name: "Paint Correction details" });
    expect(within(correctionRegion).getByText("Wet sanding is an additional charge")).toBeVisible();
    expect(correctionRegion.querySelectorAll(".service-board__spec-row").length).toBeGreaterThan(0);
    expect(
      within(correctionRegion).getByRole("img", {
        name: "Blue Corvette with a glossy, reflective exterior finish"
      })
    ).toHaveAttribute("src", "/images/cc-corvette-finish.jpg");

    await user.click(mobile.getByRole("button", { name: /Maintenance Wash & Interior Refresh/ }));
    const maintenanceRegion = mobile.getByRole("region", { name: "Maintenance Wash & Interior Refresh details" });
    expect(maintenanceRegion).toHaveTextContent("SUVs & regular trucks $65");
    expect(maintenanceRegion).toHaveTextContent("Travel fee is additional for mobile service");
    expect(mobile.queryByRole("region", { name: "Paint Correction details" })).not.toBeInTheDocument();
  });
});
