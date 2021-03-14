/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ApplicationSelectAction from "./ApplicationSelectAction";
import { TestWrap } from "tests/testPrepare";

describe("ApplicationSelectAction", () => {
  it("should render", async () => {
    render(
      <TestWrap>
        <ApplicationSelectAction row={{ test: "accepted" }} name="test" />
      </TestWrap>
    );
  });
});
