import React from "react";
import { render, screen } from "@testing-library/react";
import TextField from "..";
import "@testing-library/jest-dom";
import { SearchIcon } from "../../../Icons/SearchIcon";

describe("TextField", () => {
  test("renders the text field with a label, a placeholder and an error + helper text", () => {
    render(
      <TextField
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

    // text field
    const textField = screen.getByRole("textbox");
    const textFieldLabel = screen.getByLabelText("Test label-label");
    expect(textField).toBeInTheDocument();
    expect(textFieldLabel).toBeInTheDocument();
    expect(textFieldLabel).toHaveClass("border-red-500");

    // placeholder
    expect(screen.getByPlaceholderText("Test placeholder")).toBeInTheDocument();

    // label
    expect(screen.getByText("Test label")).toBeInTheDocument();
  });

  test("renders the text field with a label, placeholder, error, value and helper text", () => {
    render(
      <TextField
        value="Test value"
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

    // text field
    const textField = screen.getByRole("textbox");
    const textFieldLabel = screen.getByLabelText("Test label-label");
    expect(textField).toBeInTheDocument();
    expect(textFieldLabel).toBeInTheDocument();
    expect(textFieldLabel).toHaveClass("border-red-500");

    // placeholder
    expect(screen.getByPlaceholderText("Test placeholder")).toBeInTheDocument();

    // label
    expect(screen.getByText("Test label")).toBeInTheDocument();

    // value
    expect(screen.getByDisplayValue("Test value")).toBeInTheDocument();
  });

  test("renders the text field extra class", () => {
    render(<TextField name="testing" extraClass="test-class" />);

    // text field
    const textField = screen.getByLabelText("testing-label");
    expect(textField).toBeInTheDocument();
    expect(textField).toHaveClass("test-class");
  });

  test("renders placeholder", () => {
    render(<TextField name="testing" placeholder="Test placeholder" />);

    // placeholder
    expect(screen.getByPlaceholderText("Test placeholder")).toBeInTheDocument();
  });

  test.skip("renders end icon", () => {
    render(<TextField name="testing" endIcon={<SearchIcon />} />);

    // end icon
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
  });
});
