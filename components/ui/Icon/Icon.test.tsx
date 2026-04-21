import { render } from "@testing-library/react";
import { Icon } from "./Icon";
import { expect, it, describe } from "vitest";

describe("Icon", () => {
  const MockSvg = (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="mock-svg" {...props} />
  );

  it("renders the passed SVG component with default size and opacity", () => {
    const { getByTestId } = render(<Icon src={MockSvg} />);
    const svg = getByTestId("mock-svg");

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("w-6");
    expect(svg).toHaveClass("h-6");
    expect(svg).toHaveClass("opacity-primary");
  });

  it("applies the list size class", () => {
    const { getByTestId } = render(<Icon src={MockSvg} size="list" />);
    const svg = getByTestId("mock-svg");

    expect(svg).toHaveClass("w-5");
    expect(svg).toHaveClass("h-5");
  });

  it("applies secondary opacity class", () => {
    const { getByTestId } = render(<Icon src={MockSvg} opacity="secondary" />);
    const svg = getByTestId("mock-svg");

    expect(svg).toHaveClass("opacity-secondary");
  });

  it("forwards the viewBox and other props", () => {
    const { getByTestId } = render(<Icon src={MockSvg} data-custom="true" />);
    const svg = getByTestId("mock-svg");

    expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    expect(svg).toHaveAttribute("data-custom", "true");
  });
});
