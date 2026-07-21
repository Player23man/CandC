import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ServiceBoard } from "../components/ServiceBoard";

describe("ServiceBoard", () => {
  it("shows Exterior Detail initially and switches to Ceramic Coating", async () => {
    const user = userEvent.setup();
    render(<ServiceBoard />);

    expect(screen.getByRole("tab", { name: /Exterior Detail/ })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Hand wax +$50");

    await user.click(screen.getByRole("tab", { name: /Ceramic Coating/ }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Large SUV, van, or truck $1,100");
  });

  it("moves between services with arrow keys", async () => {
    const user = userEvent.setup();
    render(<ServiceBoard />);
    const exterior = screen.getByRole("tab", { name: /Exterior Detail/ });
    exterior.focus();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: /Interior Restoration/ })).toHaveFocus();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Full interior restoration $225+");
  });

  it("uses one shared active service for the mobile accordion", async () => {
    const user = userEvent.setup();
    const { container } = render(<ServiceBoard />);
    const mobileControls = container.querySelector(".service-board__mobile");

    expect(mobileControls).not.toBeNull();
    const mobile = within(mobileControls as HTMLElement);
    expect(mobile.getByRole("button", { name: /Exterior Detail/ })).toHaveAttribute("aria-expanded", "true");

    await user.click(mobile.getByRole("button", { name: /Paint Correction/ }));
    expect(mobile.getByRole("button", { name: /Paint Correction/ })).toHaveAttribute("aria-expanded", "true");
    expect(mobile.getByText("Wet sanding is an additional charge")).toBeVisible();
  });
});
