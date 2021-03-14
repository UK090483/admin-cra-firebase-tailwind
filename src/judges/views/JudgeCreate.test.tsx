/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import JudgeCreate from "./JudgeCreate";
import { TestWrap } from "tests/testPrepare";

describe("JudgeCreate", () => {
  it("Renders without Crashing", async () => {
    render(
      <TestWrap>
        <JudgeCreate></JudgeCreate>
      </TestWrap>
    );
  });
});
