import React from "react";
import { render, screen } from "@testing-library/react";
import FormFieldLabel from "./FormFieldLabel";

describe("FormFieldLabel", () => {
  test("renders the default label", () => {
    const label = "Label 1";
    render(<FormFieldLabel label={label} />);

    const labelElement = screen.getByLabelText(label);
    expect(labelElement).toBeInTheDocument();
  });

  test("renders the label with attributes", () => {
    const label = "Label 1";
    render(
      <FormFieldLabel
        label={label}
        fontColour="colour"
        fontSize="size"
        fontStyle="style"
        extraClass="class"
      />
    );

    const labelElement = screen.getByLabelText(label);
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass("colour size style class");
  });
});
