/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import UsersCreate from "./UserCreate";
import { TestWrap } from "tests/testPrepare";

describe("UsersCreate", () => {
  it("Renders without Crashing", async () => {
    render(
      <TestWrap>
        <UsersCreate></UsersCreate>
      </TestWrap>
    );
  });
});
