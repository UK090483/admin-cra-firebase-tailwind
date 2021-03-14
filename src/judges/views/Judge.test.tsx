/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Judge from "./Judge";
import { TestWrap } from "tests/testPrepare";

describe("Judge", () => {
  it("Renders without Crashing", async () => {
    render(
      <TestWrap>
        <Judge></Judge>
      </TestWrap>
    );
  });
});
