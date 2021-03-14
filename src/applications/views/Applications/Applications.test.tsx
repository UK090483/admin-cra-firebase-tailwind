/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Applications from "./Applications";
import { TestWrap } from "tests/testPrepare";

describe("Applications", () => {
  it("should render", async () => {
    render(
      <TestWrap>
        <Applications></Applications>
      </TestWrap>
    );
  });
});
