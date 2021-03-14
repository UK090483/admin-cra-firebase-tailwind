/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { testColumns, testRows } from "./tests/testPrepare";
import { ITableSortState, IColumn } from "./types";
import Row from "./Row";

interface ICustomRender {
  onRowClick?: () => {};
  hasBulk?: boolean;
  handleBulkItemClick?: (id: string) => void;
  bulkItems?: {};
  columns?: IColumn[];
}

const CustomRender = (props: ICustomRender) => {
  const {
    onRowClick,
    hasBulk,
    handleBulkItemClick,
    bulkItems,
    columns,
  } = props;
  return render(
    <table>
      <tbody>
        {
          <Row
            data={testRows[1]}
            columns={columns || testColumns}
            onRowClick={onRowClick}
            hasBulk={hasBulk || false}
            setBulkItem={handleBulkItemClick || (() => {})}
            bulkItems={bulkItems || {}}
          />
        }
      </tbody>
    </table>
  );
};

describe("Row", () => {
  it("should render", async () => {
    CustomRender({});
  });

  it("should render The right table cells", async () => {
    const { getByText, debug } = CustomRender({});

    getByText(/b/);
    getByText(20);
  });

  it("should call the onRowClick Function", async () => {
    const onRowClick = jest.fn();
    const { getByText } = CustomRender({ onRowClick });

    fireEvent.click(getByText(/b/));

    expect(onRowClick).toHaveBeenCalledTimes(1);
    expect(onRowClick).toHaveBeenCalledWith(testRows[1]);
  });

  it("should render  Bulk toggles with off state ", async () => {
    const { getByTestId } = CustomRender({ hasBulk: true });
    expect(getByTestId("table_bulk_control")).not.toBeChecked();
  });

  it("should render Bulk toggles with on state", async () => {
    const { getByTestId } = CustomRender({
      hasBulk: true,
      bulkItems: { "2": true },
    });
    expect(getByTestId("table_bulk_control")).toBeChecked();
  });

  it("should call the setBulkItem ", async () => {
    const handleBulkItemClick = jest.fn();
    const { getByTestId } = CustomRender({
      handleBulkItemClick,
      hasBulk: true,
    });
    fireEvent.click(getByTestId("table_bulk_control"));

    expect(handleBulkItemClick).toBeCalledTimes(1);
    expect(handleBulkItemClick).toBeCalledWith(2);
  });

  it("should render items from colums[].render and rowData ", async () => {
    const handleBulkItemClick = jest.fn();
    const { getByTestId, getByText } = CustomRender({
      columns: [
        ...testColumns,
        {
          field: "test",
          use: "Test",
          render: (row) => (
            <div data-testid="test_row_render">
              {row.id + row.name + row.age}
            </div>
          ),
        },
      ],
    });
    getByText("2b20");
    getByTestId("test_row_render");
  });
});
