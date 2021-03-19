/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import App from "../App";
import { TestWrap } from "./testPrepare";

import * as useAuthP from "hooks/useAuth";

describe("App", () => {
  const useAuthMock = jest.spyOn(useAuthP, "useAuth");
  beforeEach(() => {
    useAuthMock.mockClear();
  });

  test("shows splash sreen on Load ", () => {
    useAuthMock.mockReturnValue({
      authLoaded: false,
      isAdmin: false,
      isEmpty: true,
      email: null,
      displayName: null,
      signIn: () => {},
      logOut: () => {},
    });
    const { getByTestId } = render(
      <TestWrap>
        <App />
      </TestWrap>
    );

    getByTestId("splash screen");
  });

  test("renders not logged in goes to login ", () => {
    useAuthMock.mockReturnValue({
      authLoaded: true,
      isAdmin: false,
      isEmpty: true,
      email: null,
      displayName: null,
      signIn: () => {},
      logOut: () => {},
    });

    const { getByTestId } = render(
      <TestWrap>
        <App />
      </TestWrap>
    );
    getByTestId("login-form");
  });

  test("renders  Judge Layout ", () => {
    useAuthMock.mockReturnValue({
      authLoaded: true,
      isAdmin: false,
      isEmpty: false,
      email: null,
      displayName: null,
      signIn: () => {},
      logOut: () => {},
    });

    const { getByTestId } = render(
      <TestWrap>
        <App />
      </TestWrap>
    );
    getByTestId("judge_layout");
  });

  test("renders  Admin Layout ", () => {
    useAuthMock.mockReturnValue({
      authLoaded: true,
      isAdmin: true,
      isEmpty: false,
      email: null,
      displayName: null,
      signIn: () => {},
      logOut: () => {},
    });

    const { getByTestId } = render(
      <TestWrap>
        <App />
      </TestWrap>
    );
    getByTestId("admin_layout");
  });
});
