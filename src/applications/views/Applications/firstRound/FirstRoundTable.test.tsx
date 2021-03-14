/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FirstRoundTable from "./FirstRoundTable";
import { TestWrap } from "tests/testPrepare";
import { debug } from "console";

const testRow = {
  foundingDate: Date.now(),
  id: "testid",
};

describe("FirstRoundTable", () => {
  test("renders ", () => {
    const { getByText } = render(
      <TestWrap>
        <FirstRoundTable data={[]} />
      </TestWrap>
    );
  });
});
