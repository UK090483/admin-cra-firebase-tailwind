/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TableHead from "./TableHead";
import { testColumns } from "./tests/testPrepare";
import { ITableSortState } from "./types";

const CustomRender = (sort: ITableSortState | null, setSort: () => {}) => {
  return render(
    <table>
      <TableHead
        columns={testColumns}
        sort={sort}
        hasBulk={false}
        setSort={setSort}
      />
    </table>
  );
};

describe("TableHead", () => {
  it("should render", async () => {
    CustomRender(null, jest.fn);
  });

  it("should show the string in Use attribute", async () => {
    const { getByText } = CustomRender(null, jest.fn);
    getByText(/Name/);
    getByText(/Age/);
  });

  it("should show sort Indicator asc", async () => {
    const { getByTestId } = CustomRender(
      { field: "name", direction: "asc" },
      jest.fn
    );
    getByTestId("table_sort_indicator_asc");
  });
  it("should show sort Indicator desc", async () => {
    const { getByTestId } = CustomRender(
      { field: "name", direction: "desc" },
      jest.fn
    );
    getByTestId("table_sort_indicator_desc");
  });

  it("should call the setSort Function start at no sort", async () => {
    const setSort = jest.fn();
    const { getByText } = CustomRender(null, setSort);

    fireEvent.click(getByText(/Name/));
    expect(setSort).toHaveBeenCalledTimes(1);
    expect(setSort).toHaveBeenCalledWith({ field: "name", direction: "asc" });
  });

  it("should call the setSort Function start at asc", async () => {
    const setSort = jest.fn();
    const { getByText } = CustomRender(
      { field: "name", direction: "asc" },
      setSort
    );

    fireEvent.click(getByText(/Name/));
    expect(setSort).toHaveBeenCalledTimes(1);
    expect(setSort).toHaveBeenCalledWith({ field: "name", direction: "desc" });
  });

  it("should call the setSort Function start at desc", async () => {
    const setSort = jest.fn();
    const { getByText } = CustomRender(
      { field: "name", direction: "desc" },
      setSort
    );

    fireEvent.click(getByText(/Name/));
    expect(setSort).toHaveBeenCalledTimes(1);
    expect(setSort).toHaveBeenCalledWith(null);
  });
});
