/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { TestWrap } from "tests/testPrepare";
import useApplicationActions from "../../hooks/useApplicationActions";
import ApplicationSelectAction from "./ApplicationSelectAction";

jest.mock("../../hooks/useApplicationActions");

const mockedUseApplicationActions = useApplicationActions as jest.Mock;

describe("ApplicationSelectAction", () => {
  const updateApplicationAssessments = jest.fn();

  beforeEach(() => {
    mockedUseApplicationActions.mockImplementation(() => ({
      updateApplicationAssessments,
    }));
  });

  it("should render", async () => {
    const { getByText } = render(
      <TestWrap>
        <ApplicationSelectAction row={{ test: "accepted" }} name="test" />
      </TestWrap>
    );
  });

  it("should call updateApplication function", async () => {
    updateApplicationAssessments.mockImplementation(() => Promise.resolve());

    const { getByText } = render(
      <TestWrap>
        <ApplicationSelectAction
          row={{ test: "d", id: "testid" }}
          name="test"
        />
      </TestWrap>
    );

    [
      { label: "Ja", id: "accepted" },
      { label: "Nein", id: "declined" },
      { label: "Vielleicht", id: "postponed" },
    ].forEach((state, index) => {
      act(() => {
        fireEvent.click(getByText(state.label));
      });

      expect(updateApplicationAssessments).toHaveBeenCalledTimes(index + 1);
      expect(updateApplicationAssessments).toHaveBeenCalledWith({
        state: "accepted",
        id: "testid",
        name: "test",
      });
    });
  });

  it("should not call updateApplication function if value is set", async () => {
    updateApplicationAssessments.mockImplementation(() => Promise.resolve());
    const { getByText } = render(
      <TestWrap>
        <ApplicationSelectAction
          row={{ test: "accepted", id: "testid" }}
          name="test"
        />
      </TestWrap>
    );

    act(() => {
      fireEvent.click(getByText("Ja"));
    });

    expect(updateApplicationAssessments).toHaveBeenCalledTimes(0);
  });
});
