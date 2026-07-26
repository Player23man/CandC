import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { transformationPairs } from "../app/gallery-data";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";

describe("BeforeAfterSlider", () => {
  it("updates the visible comparison position through an accessible range input", () => {
    const { container } = render(
      <BeforeAfterSlider pair={transformationPairs[0]} />,
    );

    const slider = screen.getByRole("slider", {
      name: "Blue paint correction before and after",
    });
    const comparison = container.querySelector(".before-after");

    expect(slider).toHaveValue("50");
    expect(comparison).toHaveStyle({ "--comparison-position": "50%" });

    fireEvent.change(slider, { target: { value: "72" } });

    expect(slider).toHaveValue("72");
    expect(comparison).toHaveStyle({ "--comparison-position": "72%" });
  });

  it("renders factual before and after images with overlay labels", () => {
    render(<BeforeAfterSlider pair={transformationPairs[0]} />);

    expect(screen.getByAltText(/surface haze before correction/i)).toBeVisible();
    expect(screen.getByAltText(/reflective finish after correction/i)).toBeVisible();
    expect(screen.getByText("Before")).toBeVisible();
    expect(screen.getByText("After")).toBeVisible();
  });
});
