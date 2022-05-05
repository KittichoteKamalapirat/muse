import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  test("renders the filled button component by default", () => {
    const label = "Hello World";
    render(<Button label={label} />);

    const button = screen.getByRole("button", { name: label });
    const link = screen.queryByRole("link", { name: label });
    expect(button).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();
    expect(button).toHaveClass("bg-blurple-link text-white", { exact: false });
  });

  test("renders the filled button component", () => {
    const label = "Hello World";
    render(<Button label={label} />);

    const button = screen.getByRole("button", { name: label });
    const link = screen.queryByRole("link", { name: label });
    expect(button).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();
    expect(button).toHaveClass("bg-blurple-link text-white", { exact: false });
  });

  test("renders linked button component", () => {
    const label = "Hello World";
    render(<Button label={label} href="/test" />);

    const button = screen.getByRole("button", { name: label });
    const link = screen.getByRole("link", { name: label });
    expect(button).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(button).toHaveClass("bg-blurple-link text-white", { exact: false });
  });
});
