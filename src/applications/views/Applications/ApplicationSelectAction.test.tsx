/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ApplicationSelectAction from "./ApplicationSelectAction";
import { TestWrap } from "tests/testPrepare";
import useApplicationActions from "../../hooks/useApplicationActions";
jest.mock("../../hooks/useApplicationActions");

const mockedUseApplicationActions = useApplicationActions as jest.Mock;

describe("ApplicationSelectAction", () => {
  const updateApplication = jest.fn();

  beforeEach(() => {
    mockedUseApplicationActions.mockImplementation(() => ({
      updateApplication,
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
      fireEvent.click(getByText(state.label));
      expect(updateApplication).toHaveBeenCalledTimes(index + 1);
      expect(updateApplication).toHaveBeenCalledWith({
        data: { test: state.id },
        id: "testid",
      });
    });
  });

  it("should not call updateApplication function if value is set", async () => {
    const { getByText } = render(
      <TestWrap>
        <ApplicationSelectAction
          row={{ test: "accepted", id: "testid" }}
          name="test"
        />
      </TestWrap>
    );

    fireEvent.click(getByText("Ja"));
    expect(updateApplication).toHaveBeenCalledTimes(0);
  });
});
