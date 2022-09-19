import React from "react";
import { render, screen } from "@testing-library/react";
import SmallHeading from "../SmallHeading";

describe("SmallHeading", () => {
  test("renders the default heading", () => {
    const heading = "Heading 1";
    render(<SmallHeading heading={heading} />);

    const headingElement = screen.getByRole("heading", { name: heading });
    expect(headingElement).toBeInTheDocument();
  });

  test("renders the heading with attributes", () => {
    const heading = "Heading 1";
    render(
      <SmallHeading heading={heading} fontColour="colour" fontSize="size" fontStyle="style" />
    );

    const headingElement = screen.getByRole("heading", { name: heading });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveClass("colour size style");
  });
});
