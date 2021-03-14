import { IRow } from "../types";
import Fuse from "fuse.js";

const tableSearch = (
  search: string | null,
  rows: IRow[],
  searchFields: string[]
): IRow[] => {
  const options = {
    // isCaseSensitive: false,
    includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    threshold: 0.1,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: searchFields,
  };
  const fuse = new Fuse(rows, options);

  return search ? fuse.search(search).map((res) => res.item) : rows;
};

export default tableSearch;
