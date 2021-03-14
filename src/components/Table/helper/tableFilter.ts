import { IRow } from "../types";
import { ITableFilter, ITableFilterState } from "../types";

const tableFilter = (
  filterState: ITableFilterState | null,
  rows: IRow[]
): IRow[] => {
  return filterState
    ? rows.filter((item) => filterFn(filterState, item))
    : rows;
};

export default tableFilter;

const filterFn = (filterState: ITableFilterState, item: IRow): boolean => {
  let res = true;
  Object.entries(filterState).forEach(([key, filter]) => {
    filter.forEach((f) => {
      //   console.log(filter);
      //   console.log(item[key]);
      res = compare(f, item[key]);
      //   console.log(res);
      //   console.log("---------------------");
    });
  });

  return res;
};

const compare = (filter: ITableFilter, item: any): boolean => {
  switch (filter[0]) {
    case "===":
      return item === filter[1];

    case "!==":
      return item !== filter[1];

    default:
      return true;
  }
};
