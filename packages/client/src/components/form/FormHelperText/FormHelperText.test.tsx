import React from "react";
import { render, screen } from "@testing-library/react";
import FormHelperText from "../FormHelperText";

describe("FormHelperText", () => {
  test("renders helper text without error", () => {
    const text = "Helper text";
    render(<FormHelperText helperText={text} />);

    const helperText = screen.getByText(text);
    expect(helperText).toBeInTheDocument();
    expect(helperText).not.toHaveClass("text-red-500");
  });

  test("renders helper text with error", () => {
    const text = "Helper text";
    render(<FormHelperText helperText={text} isError />);

    const helperText = screen.getByText(text);
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveClass("text-red-500");
  });
});
