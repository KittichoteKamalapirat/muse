import React from "react";
import { render, screen } from "@testing-library/react";
import TrashIcon from "../TrashIcon";
import "@testing-library/jest-dom";

describe("ButtonIcon", () => {
  it("renders the default icon", () => {
    render(<TrashIcon label="trash" />);

    const icon = screen.getByLabelText("trash");
    expect(icon).toBeInTheDocument();
  });

  it("renders the icon with updated attributes", () => {
    render(<TrashIcon label="trash" height="h-7" width="w-1" />);

    const icon = screen.getByLabelText("trash");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("w-1 h-7");
  });
});
