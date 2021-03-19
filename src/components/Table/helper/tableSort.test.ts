import { testRows } from "../tests/testPrepare";
import tableSort from "./tableSort";

describe("tableSort", () => {
  testRows.sort((a, b) => b.id - a.id);
  test("should return untouched if no Sort is present", () => {
    const rows = tableSort(null, testRows);
    expect(rows).toStrictEqual(testRows);
  });

  test("should return filtered if filter is present", () => {
    const rows = tableSort({ field: "name", direction: "desc" }, testRows);
    expect(rows).toMatchSnapshot();
  });
});
