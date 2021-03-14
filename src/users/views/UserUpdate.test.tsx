/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import UserUpdate from "./UserUpdate";
import { TestWrap } from "tests/testPrepare";

describe("UserUpdate", () => {
  it("Renders without Crashing", async () => {
    render(
      <TestWrap>
        <UserUpdate></UserUpdate>
      </TestWrap>
    );
  });
});
