import { render, screen } from "@testing-library/react";
import React from "react";
import XCircleIcon from "../XCircleIcon";

describe("DisplayIcon", () => {
  it("renders the default icon", () => {
    render(<XCircleIcon />);

    const icon = screen.getByLabelText("x-circle-icon");
    expect(icon).toBeInTheDocument();
  });

  it("renders the icon with updated attributes", () => {
    render(<XCircleIcon height="h-7" width="w-1" />);

    const icon = screen.getByLabelText("x-circle-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("w-1 h-7");
  });
});
