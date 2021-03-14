/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SecondRoundTable from "./SecondRoundTable";
import { TestWrap } from "tests/testPrepare";
import { debug } from "console";

describe("SecondRoundTable", () => {
  test("renders ", () => {
    const { getByText, debug } = render(
      <TestWrap>
        <SecondRoundTable data={[]} />
      </TestWrap>
    );
  });
});
