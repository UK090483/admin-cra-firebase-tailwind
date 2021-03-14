import tableSearch from "./tableSearch";
import { testRows } from "../tests/testPrepare";

describe("tableSearch", () => {
  test("should return untouched if no search is present", () => {
    const rows = tableSearch(null, testRows, []);
    expect(rows).toStrictEqual(testRows);
  });

  //   test("should return search items", () => {
  //     const rows = tableSearch("a", testRows, ["name"]);

  //     console.log(rows);
  //     expect(rows).toStrictEqual([testRows[1]]);
  //   });

  //   test("should return filtered items with !== compare", () => {
  //     const rows = tableSearch({ name: [["!==", "a"]] }, testRows);
  //     expect(rows).toStrictEqual(testRows.slice(1, 4));
  //   });

  //   test("should return unfiltered items with unknown compare", () => {
  //     // @ts-ignore
  //     const rows = tableSearch({ name: [["xxx", "a"]] }, testRows);
  //     expect(rows).toStrictEqual(testRows);
  //   });
});
