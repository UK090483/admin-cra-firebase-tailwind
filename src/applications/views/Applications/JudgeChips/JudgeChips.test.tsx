/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import JudgeChips from "./JudgeChips";
import { TestWrap } from "tests/testPrepare";

import useJudges from "judges/hooks/useJudges";

jest.mock("judges/hooks/useJudges", () => () => ({
  judges: {
    judge1: { name: "J 1", judgeType: "pre" },
    judge2: { name: "J 2", judgeType: "pre" },
    judge3: { name: "J 3", judgeType: "main" },
  },
}));

const testRow = {
  assessments: {
    judge1: { judge_id: "judge1" },
    judge2: { judge_id: "judge2" },
    judge3: { judge_id: "judge3" },
  },
};

describe("JudgeChips", () => {
  it("should render pre Chips", async () => {
    const { getByText, queryByText } = render(
      <TestWrap>
        <JudgeChips row={testRow} />
      </TestWrap>
    );
    getByText("J1");
    getByText("J2");
    expect(queryByText("J3")).not.toBeInTheDocument();
  });

  it("should render main Chips", async () => {
    const { getByText, queryByText } = render(
      <TestWrap>
        <JudgeChips row={testRow} type="main" />
      </TestWrap>
    );
    getByText("J3");
    expect(queryByText("J1")).not.toBeInTheDocument();
    expect(queryByText("J2")).not.toBeInTheDocument();
  });

  it("should render Manage", async () => {
    const { getByText, debug } = render(
      <TestWrap>
        <JudgeChips row={testRow} withManage={true} />
      </TestWrap>
    );
    getByText("+");
  });
});
