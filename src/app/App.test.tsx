import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
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
});
