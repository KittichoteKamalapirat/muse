import React from "react";
import { render, screen } from "@testing-library/react";
import FormActionButtons from "./FormActionButtons";
import "@testing-library/jest-dom";

describe("FormActionButtons", () => {
  test("renders default buttons", () => {
    render(<FormActionButtons onSecondaryClick={() => undefined} />);

    const primaryButton = screen.getByRole("button", { name: "Save" });
    const secondaryButton = screen.getByRole("button", { name: "Cancel" });
    expect(primaryButton).toBeInTheDocument();
    expect(secondaryButton).toBeInTheDocument();
  });

  test("renders custom buttons", () => {
    render(
      <FormActionButtons
        primaryText="Yes"
        secondaryText="No"
        onSecondaryClick={() => undefined}
      />
    );

    const primaryButton = screen.getByRole("button", { name: "Yes" });
    const secondaryButton = screen.getByRole("button", { name: "No" });
    expect(primaryButton).toBeInTheDocument();
    expect(secondaryButton).toBeInTheDocument();
  });
});
