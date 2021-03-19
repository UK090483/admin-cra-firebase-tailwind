/**
 * @jest-environment jsdom
 */

import { getByTestId, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Applications from "./Applications";
import { TestWrap } from "tests/testPrepare";
import useApplications from "applications/hooks/useApplications";
import useUi from "hooks/useUi";

jest.mock("applications/hooks/useApplications");
jest.mock("hooks/useUi");

const mockedUseUi = useUi as jest.Mock;
const mockedUseApplications = useApplications as jest.Mock;

describe("Applications", () => {
  it("should render Loading", async () => {
    mockedUseApplications.mockImplementation(() => ({
      ordered: undefined,
      loading: true,
    }));
    mockedUseUi.mockImplementation(() => ({ stage: "first_filter" }));

    const { getByTestId } = render(
      <TestWrap>
        <Applications></Applications>
      </TestWrap>
    );
    getByTestId("pageLoading");
  });

  it("should default render FirstRoundTable", async () => {
    mockedUseApplications.mockImplementation(() => ({
      ordered: [],
      isLoaded: true,
    }));
    mockedUseUi.mockImplementation(() => ({ stage: "" }));
    const { getByTestId } = render(
      <TestWrap>
        <Applications></Applications>
      </TestWrap>
    );
    getByTestId("FirstRoundTable");
  });

  it("should render FirstRoundTable", async () => {
    mockedUseApplications.mockImplementation(() => ({
      ordered: [],
      isLoaded: true,
    }));
    mockedUseUi.mockImplementation(() => ({ stage: "first_filter" }));
    const { debug, getByTestId } = render(
      <TestWrap>
        <Applications></Applications>
      </TestWrap>
    );
    getByTestId("FirstRoundTable");
  });

  it("should render assign_prejudges", async () => {
    mockedUseApplications.mockImplementation(() => ({
      ordered: [],
      loading: null,
      loadedAt: "someTime",
    }));
    mockedUseUi.mockImplementation(() => ({ stage: "assign_prejudges" }));
    const { debug, getByTestId } = render(
      <TestWrap>
        <Applications></Applications>
      </TestWrap>
    );
  });

  it("should render first_evaluation", async () => {
    mockedUseUi.mockImplementation(() => ({ stage: "first_evaluation" }));
    mockedUseApplications.mockImplementation(() => ({
      ordered: [],
      loading: null,
      loadedAt: "someTime",
    }));
    render(
      <TestWrap>
        <Applications></Applications>
      </TestWrap>
    );
  });

  it("should render final_evaluation ", async () => {
    mockedUseUi.mockImplementation(() => ({ stage: "final_evaluation" }));
    mockedUseApplications.mockImplementation(() => ({
      ordered: [],
      loading: null,
      loadedAt: "someTime",
    }));
    render(
      <TestWrap>
        <Applications></Applications>
      </TestWrap>
    );
  });
});
