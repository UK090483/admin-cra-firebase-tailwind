/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { ManageJudges } from "./ManageJudges";
import { TestWrap } from "tests/testPrepare";

import useJudges from "judges/hooks/useJudges";

jest.mock("judges/hooks/useJudges", () => () => ({
  judgesOrdered: [
    { name: "J 1", id: "j1", judgeType: "pre" },
    { name: "J 2", id: "j2", judgeType: "pre" },
    { name: "J 3", id: "j3", judgeType: "main" },
    { name: "J $", id: "j4", judgeType: "main" },
  ],
}));

describe("ManageJudges", () => {
  it("should render pre", async () => {
    const handleClick = jest.fn();
    const { queryByText, getByText } = render(
      <TestWrap>
        <ManageJudges handleClick={handleClick} />
      </TestWrap>
    );

    getByText("J1");
    getByText("J2");
    expect(queryByText("J3")).not.toBeInTheDocument();
    expect(queryByText("J4")).not.toBeInTheDocument();
  });

  it("should manage Judges", async () => {
    const handleClick = jest.fn();
    const { getAllByTestId, getByTestId, getByText } = render(
      <TestWrap>
        <ManageJudges
          handleClick={handleClick}
          preselected={{ j1: { judge_id: "j1" } }}
        />
      </TestWrap>
    );

    fireEvent.click(getByTestId("manageJudges_submit"));
    expect(handleClick).toBeCalledTimes(1);
    expect(handleClick).toBeCalledWith({
      j1: { id: "j1", name: "J 1", judgeType: "pre" },
    });

    handleClick.mockReset();

    fireEvent.click(getAllByTestId("manageJudges_select")[0]);
    fireEvent.click(getByTestId("manageJudges_submit"));
    expect(handleClick).toBeCalledTimes(1);
    expect(handleClick).toBeCalledWith({});
  });
});
