import { render, screen } from "@testing-library/react";
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
});
