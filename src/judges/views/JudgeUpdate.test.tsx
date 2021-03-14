/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import JudgeUpdate from "./JudgeUpdate";
import { TestWrap } from "tests/testPrepare";

describe("JudgeUpdate", () => {
  it("Renders without Crashing", async () => {
    render(
      <TestWrap>
        <JudgeUpdate></JudgeUpdate>
      </TestWrap>
    );
  });
});
