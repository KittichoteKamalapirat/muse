import { render, screen } from "@testing-library/react";
import React from "react";
import KebabMenuIcon from "../KebabMenuIcon";
import "@testing-library/jest-dom";

describe("ButtonIcon", () => {
  it("renders the default icon", () => {
    render(<KebabMenuIcon />);

    const icon = screen.getByLabelText("dots-vertical-icon");
    expect(icon).toBeInTheDocument();
  });

  it("renders the icon with updated attributes", () => {
    render(<KebabMenuIcon height="h-7" width="w-1" />);

    const icon = screen.getByLabelText("dots-vertical-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("w-1 h-7");
  });
});
