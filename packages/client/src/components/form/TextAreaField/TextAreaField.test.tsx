import React from "react";
import { render, screen } from "@testing-library/react";
import TextAreaField from ".";
import "@testing-library/jest-dom";

describe("TextAreaField", () => {
  test("renders the text area field with a label, a placeholder and an error + helper text", () => {
    render(
      <TextAreaField
        label="Test label"
        placeholder="Test placeholder"
        isError
        helperText="Test error"
      />
    );

    // error message
    const error = screen.getByText("Test error");
    expect(error).toBeInTheDocument();
    expect(error).toHaveClass("text-red-500");

    // text area field
    const textAreaField = screen.getByRole("textbox");
    const textAreaFieldLabel = screen.getByLabelText("Test label-label");
    expect(textAreaField).toBeInTheDocument();
    expect(textAreaFieldLabel).toBeInTheDocument();
    expect(textAreaFieldLabel).toHaveClass("border-red-500");

    // placeholder
    expect(screen.getByPlaceholderText("Test placeholder")).toBeInTheDocument();

    // label
    expect(screen.getByText("Test label")).toBeInTheDocument();
  });

  test("renders the text area field with a label, placeholder, error, value and helper text", () => {
    render(
      <TextAreaField
        value={`Test value\nSecond line`}
        label="Test label"
        placeholder="Test placeholder"
        isError
        helperText="Test error"
      />
    );

    // error message
    const error = screen.getByText("Test error");
    expect(error).toBeInTheDocument();
    expect(error).toHaveClass("text-red-500");

    // text area field
    const textAreaField = screen.getByRole("textbox");
    const textAreaFieldLabel = screen.getByLabelText("Test label-label");
    expect(textAreaField).toBeInTheDocument();
    expect(textAreaFieldLabel).toBeInTheDocument();
    expect(textAreaFieldLabel).toHaveClass("border-red-500");

    // placeholder
    expect(screen.getByPlaceholderText("Test placeholder")).toBeInTheDocument();

    // label
    expect(screen.getByText("Test label")).toBeInTheDocument();

    // value
    expect(textAreaField.textContent?.trim()).toEqual(
      `Test value\nSecond line`
    );
  });

  test("renders the text area field extra class", () => {
    render(<TextAreaField name="testing" extraClass="test-class" />);

    // text area field
    const textAreaField = screen.getByLabelText("testing-label");
    expect(textAreaField).toBeInTheDocument();
    expect(textAreaField).toHaveClass("test-class");
  });
});
