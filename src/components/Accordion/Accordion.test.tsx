/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Accordion from "./Accordion";

describe("Accordion", () => {
  it("should render with label ", async () => {
    const { getByText } = render(
      <Accordion label={"testLabel"}>
        <div>Test</div>
      </Accordion>
    );
    expect(getByText("testLabel")).toBeVisible();
  });

  it("should open on click ", async () => {
    const { getByText } = render(
      <Accordion label={"testLabel"}>
        <div>Test</div>
      </Accordion>
    );

    fireEvent.mouseDown(getByText("testLabel"));

    expect(getByText("Test")).toBeVisible();
  });
});
