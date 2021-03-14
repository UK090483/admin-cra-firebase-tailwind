/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Button from "./Button";

describe("Button", () => {
  test("renders with no props", () => {
    const { getByText } = render(<Button>Test</Button>);
    getByText("Test");
  });

  test("renders with size s", () => {
    const { getByText } = render(<Button size="s">Test</Button>);
    expect(getByText("Test")).toHaveClass("text-xs");
  });
  test("renders with size l", () => {
    const { getByText } = render(<Button size="l">Test</Button>);
    expect(getByText("Test")).toHaveClass("text-lg");
  });

  test("renders with active", () => {
    const { getByText } = render(<Button active>Test</Button>);
    expect(getByText("Test")).toHaveClass("bg-actionColor-700");
  });
});
