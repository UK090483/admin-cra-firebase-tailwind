/**
 * @jest-environment jsdom
 */

import React from "react";

import Navigation from "./Navigation";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Navigation ", () => {
  it("should  render", async () => {
    const { queryByTestId } = render(
      <Navigation page={0} maxPage={30} setPage={() => {}} />
    );
    expect(queryByTestId("table_Navigation")).toBeTruthy();
  });

  it("should set Page Next", async () => {
    const setPage = jest.fn();
    const { getByText, debug } = render(
      <Navigation page={0} maxPage={3} setPage={setPage} />
    );

    getByText("1/3");
    const Prev = getByText(/Prev/);
    const Next = getByText(/Next/);

    expect(Prev).toBeDisabled();
    expect(Next).not.toBeDisabled();

    fireEvent.click(Prev);
    expect(setPage).toBeCalledTimes(0);
    expect(Prev).toBeDisabled();
    expect(Next).not.toBeDisabled();

    fireEvent.click(Next);
    expect(setPage).toBeCalledTimes(1);
    expect(setPage).toBeCalledWith(1);

    fireEvent.click(Next);
    expect(setPage).toBeCalledTimes(2);
  });

  it("should set Page Prev", async () => {
    const setPage = jest.fn();
    const { getByText, debug } = render(
      <Navigation page={2} maxPage={3} setPage={setPage} />
    );

    getByText("3/3");
    const Prev = getByText(/Prev/);
    const Next = getByText(/Next/);

    expect(Prev).not.toBeDisabled();
    expect(Next).toBeDisabled();

    fireEvent.click(Next);
    expect(setPage).toBeCalledTimes(0);
    expect(Prev).not.toBeDisabled();
    expect(Next).toBeDisabled();

    fireEvent.click(Prev);
    expect(setPage).toBeCalledTimes(1);
    expect(setPage).toBeCalledWith(1);
  });
});
