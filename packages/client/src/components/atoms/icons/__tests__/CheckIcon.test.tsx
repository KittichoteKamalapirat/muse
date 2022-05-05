import { render, screen } from "@testing-library/react";
import React from "react";
import CheckIcon from "../CheckIcon";

describe("DisplayIcon", () => {
  it("renders the default icon", () => {
    render(<CheckIcon />);

    const icon = screen.getByLabelText("check-circle-icon");
    expect(icon).toBeInTheDocument();
  });

  it("renders the icon with updated attributes", () => {
    render(<CheckIcon height="h-7" width="w-1" />);

    const icon = screen.getByLabelText("check-circle-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("w-1 h-7");
  });
});
