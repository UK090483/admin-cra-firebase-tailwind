/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ThirdRoundTable from "./ThirdRoundTable";
import { TestWrap } from "tests/testPrepare";

describe("ThirdRoundTable", () => {
  test("renders ", () => {
    const { getByText } = render(
      <TestWrap>
        <ThirdRoundTable data={[]} />
      </TestWrap>
    );
  });
});
