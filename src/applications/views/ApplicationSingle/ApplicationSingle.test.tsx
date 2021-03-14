/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ApplicationSingle from "./ApplicationSingle";
import { TestWrap } from "tests/testPrepare";

describe("ApplicationSingle", () => {
  it("should render", async () => {
    render(
      <TestWrap>
        <ApplicationSingle />
      </TestWrap>
    );
  });
});
