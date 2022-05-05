import React from "react";
import { render, screen } from "@testing-library/react";
import SearchIcon from "../SearchIcon";
import "@testing-library/jest-dom";

describe("SearchIcon", () => {
  it("renders the default icon", () => {
    render(<SearchIcon />);

    const icon = screen.getByLabelText("Search");
    expect(icon).toBeInTheDocument();
  });

  it("renders the icon with updated attributes", () => {
    render(<SearchIcon height="h-7" width="w-1" colour="colour" />);

    const icon = screen.getByLabelText("Search");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("colour w-1 h-7");
  });
});
