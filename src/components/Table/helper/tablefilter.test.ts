import tableFilter from "./tableFilter";
import { testRows } from "../tests/testPrepare";

describe("tableFilter", () => {
  test("should return untouched if no filter is present", () => {
    const rows = tableFilter({}, testRows);
    expect(rows).toStrictEqual(testRows);
  });

  test("should return filtered items with === compare", () => {
    const rows = tableFilter({ name: [["===", "b"]] }, testRows);
    expect(rows).toStrictEqual([testRows[1]]);
  });

  test("should return filtered items with !== compare", () => {
    const rows = tableFilter({ name: [["!==", "a"]] }, testRows);
    expect(rows).toStrictEqual(testRows.slice(1, 4));
  });

  test("should return unfiltered items with unknown compare", () => {
    // @ts-ignore
    const rows = tableFilter({ name: [["xxx", "a"]] }, testRows);
    expect(rows).toStrictEqual(testRows);
  });
});
