/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { testColumns, testRows, testRows88 } from "./tests/testPrepare";

import Table from "./Table";
import { IRow } from "./types";

interface ICustomRender {
  onRowClick?: () => {};
  hasBulk?: boolean;
  handleBulkItemClick?: (id: number) => {};
  bulkItems?: {};
  columns?: IColumn[];
  rows?: IRow[];
}

const CustomRender = (props: ICustomRender) => {
  const {
    onRowClick,
    hasBulk,
    handleBulkItemClick,
    bulkItems,
    rows,
    columns,
  } = props;
  return render(
    <Table
      columns={columns || testColumns}
      rows={rows || testRows}
      onRowClick={onRowClick}
    />
  );
};

describe("Table", () => {
  it("should render", async () => {
    CustomRender({});
  });

  it("should render with navigation", async () => {
    CustomRender({ rows: testRows88 });
  });
});
