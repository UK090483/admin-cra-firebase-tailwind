/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Sum from "./Sum";
import { TestWrap } from "tests/testPrepare";

describe("Sum", () => {
  it("should render", async () => {
    const { getByText } = render(
      <TestWrap>
        <Sum sum={33} />
      </TestWrap>
    );
    getByText("∅33");
  });
});
