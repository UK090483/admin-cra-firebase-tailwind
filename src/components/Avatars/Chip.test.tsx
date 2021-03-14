/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Chip from "./Chip";

describe("Chip", () => {
  it("should render  ", async () => {
    const { getByText } = render(
      <Chip color="bg-green-300" name="Ali Barba" />
    );

    getByText("AB");
  });
});
