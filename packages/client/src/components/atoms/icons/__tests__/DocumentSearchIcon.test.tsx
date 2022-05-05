import { render, screen } from "@testing-library/react";
import React from "react";
import DocumentSearchIcon from "../DocumentSearchIcon";
import "@testing-library/jest-dom";

describe("ButtonIcon", () => {
  it("renders the default icon", () => {
    render(<DocumentSearchIcon label="search-icon" />);

    const icon = screen.getByLabelText("search-icon");
    expect(icon).toBeInTheDocument();
  });

  it("renders the icon with updated attributes", () => {
    render(<DocumentSearchIcon label="search-icon" height="h-7" width="w-1" />);

    const icon = screen.getByLabelText("search-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("w-1 h-7");
  });
});
