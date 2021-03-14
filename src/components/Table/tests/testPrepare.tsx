import * as React from "react";

import { ITableColumns } from "../types";

const testRows = [
  { name: "a", age: 10, id: 1 },
  { name: "b", age: 20, id: 2 },
  { name: "c", age: 30, id: 3 },
  { name: "d", age: 40, id: 4 },
];

const testArray = new Array(88);

const testRows88 = testArray
  .fill(1)
  .map((item, index) => ({
    name: "testItem" + index,
    age: index * 10,
    id: index + 1,
  }));

const testColumns: ITableColumns = [
  { field: "name", use: "Name" },
  { field: "age", use: "Age" },
];

export { testRows, testColumns, testRows88 };
