/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import App from "../App";
import { TestWrap } from "./testPrepare";

import * as reactRedux from "react-redux";

describe("App", () => {
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  beforeEach(() => {
    useSelectorMock.mockClear();
  });

  test("shows splash sreen on Load ", () => {
    useSelectorMock.mockReturnValue({
      authLoaded: false,
    });
    const { getByTestId } = render(
      <TestWrap>
        <App />
      </TestWrap>
    );

    getByTestId("splash screen");
  });

  test("renders not logged in goes to login ", () => {
    useSelectorMock.mockReturnValue({
      authLoaded: true,
      isEmpty: true,
    });

    const { getByTestId } = render(
      <TestWrap>
        <App />
      </TestWrap>
    );
    getByTestId("login-form");
  });

  test("renders  Judge Layout ", () => {
    useSelectorMock.mockReturnValue({
      authLoaded: true,
      isEmpty: false,
      applicationsData: [],
    });

    const { getByTestId } = render(
      <TestWrap>
        <App />
      </TestWrap>
    );
    getByTestId("judge_layout");
  });

  test("renders  Admin Layout ", () => {
    useSelectorMock.mockReturnValue({
      authLoaded: true,
      isEmpty: false,
      isAdmin: true,
      data: [],
    });

    const { getByTestId } = render(
      <TestWrap>
        <App />
      </TestWrap>
    );
    getByTestId("admin_layout");
  });
});
