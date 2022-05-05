import React from "react";
import { render, screen } from "@testing-library/react";
import CloseIcon from "../CloseIcon";

describe("ButtonIcon", () => {
  it("renders the default icon", () => {
    render(<CloseIcon />);

    const icon = screen.getByLabelText("close");
    expect(icon).toBeInTheDocument();
  });

  it("renders the icon with updated attributes", () => {
    render(<CloseIcon height="h-7" width="w-1" />);

    const icon = screen.getByLabelText("close");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("w-1 h-7");
  });
});
