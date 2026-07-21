import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { AppRoutes } from "./App";

describe("site routes", () => {
  it.each([
    ["/", "Finished with intent."],
    ["/portfolio", "The work."],
    ["/contact", "Let’s talk about your vehicle."]
  ])("renders %s", (path, heading) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: heading })).toBeVisible();
  });

  it("updates route metadata for the portfolio", async () => {
    render(
      <MemoryRouter initialEntries={["/portfolio"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    await waitFor(() => expect(document.title).toBe("Portfolio | C&C Detailing"));
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      expect.stringContaining("vehicle detailing")
    );
  });

  it("returns to the top when navigating to another page", async () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    const primaryNavigation = screen.getByRole("navigation", { name: "Primary navigation" });
    await user.click(within(primaryNavigation).getByRole("link", { name: "Portfolio" }));

    await waitFor(() => {
      expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "auto" });
    });
    scrollTo.mockRestore();
  });
});
