/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Users from "./Users";
import { TestWrap } from "tests/testPrepare";

describe("Users", () => {
  it("Renders without Crashing", async () => {
    render(
      <TestWrap>
        <Users></Users>
      </TestWrap>
    );
  });
});
