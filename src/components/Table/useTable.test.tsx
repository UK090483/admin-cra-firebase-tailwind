/**
 * @jest-environment jsdom
 */

import useTable from "./useTable";
import { testColumns, testRows, testRows88 } from "./tests/testPrepare";
import { renderHook, act } from "@testing-library/react-hooks";
import { ITableProps } from "./types";

const CustomRender = (props: ITableProps) => {
  return renderHook(() => useTable({ ...props }));
};

describe("useTable", () => {
  test("should have correct initial state ", () => {
    const { result } = CustomRender({ columns: testColumns, rows: testRows });

    expect(result.current.page).toBe(0);
    expect(result.current.setPage).toBeTruthy();
    expect(result.current.maxPage).toBe(1);
    expect(result.current.data).toMatchObject(testRows);
    expect(result.current.filter).toBeNull;
    expect(result.current.setFilter).toBeTruthy();
    expect(result.current.columns).toMatchObject(testColumns);
    expect(result.current.options).toMatchObject({});
    expect(result.current.sort).toBeNull();
    expect(result.current.setSort).toBeTruthy();
    expect(result.current.onRowClick).toBeUndefined();
    expect(result.current.setBulkItem).toBeTruthy();
  });

  test("should have correct initial state  long List ", () => {
    const { result } = CustomRender({ columns: testColumns, rows: testRows88 });

    expect(result.current.page).toBe(0);
    expect(result.current.setPage).toBeTruthy();
    expect(result.current.maxPage).toBe(9);
    expect(result.current.data).toMatchObject(testRows88.slice(0, 10));
    expect(result.current.filter).toBeNull;
    expect(result.current.setFilter).toBeTruthy();
    expect(result.current.columns).toMatchObject(testColumns);
    expect(result.current.options).toMatchObject({});
    expect(result.current.sort).toBeNull();
    expect(result.current.setSort).toBeTruthy();
    expect(result.current.onRowClick).toBeUndefined();
    expect(result.current.setBulkItem).toBeTruthy();
  });

  test("should have working Pagination", () => {
    const { result } = CustomRender({ columns: testColumns, rows: testRows88 });

    expect(result.current.page).toBe(0);
    expect(result.current.data).toMatchObject(testRows88.slice(0, 10));
    act(() => {
      result.current.setPage(2);
    });
    expect(result.current.data).toMatchObject(testRows88.slice(20, 30));
    act(() => {
      result.current.setPage(4);
    });
    expect(result.current.data).toMatchObject(testRows88.slice(40, 50));
  });

  test("should handle BulkActions", () => {
    const { result } = CustomRender({ columns: testColumns, rows: testRows88 });
    act(() => {
      result.current.setBulkItem("2");
    });
    expect(result.current.bulkItems).toStrictEqual({ "2": true });
    act(() => {
      result.current.setBulkItem("2");
    });
    expect(result.current.bulkItems).toStrictEqual({ "2": false });
  });

  test("should handle Sort", () => {
    const { result } = CustomRender({ columns: testColumns, rows: testRows88 });

    act(() => {
      result.current.setSort({ field: "name", direction: "asc" });
    });

    expect(result.current.sort).toStrictEqual({
      field: "name",
      direction: "asc",
    });
  });

  test("should handle Filter", () => {
    const { result } = CustomRender({ columns: testColumns, rows: testRows88 });
    act(() => {
      result.current.setFilter({ name: [["===", "a"]] });
    });
    expect(result.current.filter).toStrictEqual({ name: [["===", "a"]] });
  });

  test("should handle Filter", () => {
    const { result } = CustomRender({ columns: testColumns, rows: testRows88 });
    act(() => {
      result.current.setFilter({ name: [["===", "a"]] });
    });
    expect(result.current.filter).toStrictEqual({ name: [["===", "a"]] });
  });

  test("should handle BulkMasterClick", () => {
    const { result } = CustomRender({ columns: testColumns, rows: testRows });
    act(() => {
      result.current.handleBulkMasterClick(true);
    });
    expect(result.current.bulkItems).toStrictEqual({
      1: true,
      2: true,
      3: true,
      4: true,
    });

    act(() => {
      result.current.handleBulkMasterClick(false);
    });

    expect(result.current.bulkItems).toStrictEqual({});
  });
});
