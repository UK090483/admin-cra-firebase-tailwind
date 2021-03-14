/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Judges from "./Judges";
import { TestWrap } from "tests/testPrepare";

describe("Judges", () => {
  it("Renders without Crashing", async () => {
    render(
      <TestWrap>
        <Judges></Judges>
      </TestWrap>
    );
  });
});
