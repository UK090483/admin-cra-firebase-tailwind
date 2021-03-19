import sort from "fast-sort";
import { ITableSortState, IRow } from "../types";

const tableSort = (sortState: ITableSortState | null, rows: IRow[]): IRow[] => {
  return sortState
    ? sort([...rows])[sortState.direction]((a) => a[sortState.field])
    : sort([...rows])["desc"]((a) => a["id"]);
};

export default tableSort;
