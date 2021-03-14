/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { testColumns, testRows } from "./tests/testPrepare";
import { ITableSortState, IColumn } from "./types";
import Search from "./Search";

describe.only("Search", () => {
  it("should render", async () => {
    const { getByTestId } = render(
      <Search setSearch={() => {}} search={null} />
    );
    getByTestId("searchInput");
  });
});
