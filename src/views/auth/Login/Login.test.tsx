/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Login from "./Login";
import { TestWrap } from "tests/testPrepare";

describe("Login", () => {
  it("Renders without Crashing", async () => {
    render(
      <TestWrap>
        <Login></Login>
      </TestWrap>
    );
  });
});
