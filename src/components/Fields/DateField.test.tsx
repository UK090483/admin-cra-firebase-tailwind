/**
 * @jest-environment jsdom
 */

import React from "react";

import { render } from "@testing-library/react";

import { DateField } from "./DateField";

describe("DateField", () => {
  const testDate = Date.now().toString();
  test("should Render", () => {
    const { getByText, debug } = render(<DateField date={testDate} />);
  });

  test("shouldnt crash with wrong input", () => {
    const { getByText, debug } = render(<DateField date={Date.now()} />);
  });
});
