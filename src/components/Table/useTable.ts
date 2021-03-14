import * as React from "react";
import tableFilter from "./helper/tableFilter";
import tableSort from "./helper/tableSort";
import tableSearch from "./helper/tableSearch";

import {
  ITableProps,
  ITableSortState,
  ITableFilterState,
  IBulkState,
} from "./types";

interface ITableState {
  page: number;
  filter: ITableFilterState | null;
  sort: ITableSortState | null;
  search: string | null;
  bulkItems: IBulkState;
  bulkMaster: boolean;
}

type Action =
  | { type: "setPage"; payload: number }
  | { type: "setFilter"; payload: ITableFilterState | null }
  | { type: "setSort"; payload: ITableSortState | null }
  | { type: "setState"; payload: ITableSortState }
  | { type: "setSearch"; payload: string }
  | { type: "setBulkItem"; payload: string }
  | { type: "setBulkItems"; payload: IBulkState };

type ITableReducer = (state: ITableState, action: Action) => ITableState;

const tableState: ITableState = {
  page: 0,
  filter: null,
  sort: null,
  search: null,
  bulkItems: {},
  bulkMaster: false,
};
const reducer: ITableReducer = (state, action) => {
  switch (action.type) {
    case "setPage":
      return {
        ...state,
        page: action.payload,
        bulkItems: {},
        bulkMaster: false,
      };
    case "setSort":
      return {
        ...state,
        sort: action.payload,
        bulkItems: {},
        bulkMaster: false,
      };
    case "setFilter":
      return {
        ...state,
        filter: action.payload,
        page: 0,
        bulkItems: {},
        bulkMaster: false,
      };

    case "setSearch":
      return {
        ...state,
        search: action.payload,
        page: 0,
        bulkItems: {},
        bulkMaster: false,
      };

    case "setState":
      return { ...state, ...action.payload };
    case "setBulkItem":
      return {
        ...state,
        bulkMaster: false,
        bulkItems: {
          ...state.bulkItems,
          [action.payload]: !!!state.bulkItems[action.payload],
        },
      };
    case "setBulkItems":
      return {
        ...state,
        bulkItems: action.payload,
        bulkMaster: !!Object.keys(action.payload).length,
      };
  }
};

const useTable = (props: ITableProps) => {
  const [state, dispatch] = React.useReducer(reducer, tableState);
  const { page, sort, filter, bulkItems, bulkMaster, search } = state;
  const {
    rows,
    columns,
    onRowClick,
    per_page = 10,
    options = {},
    searchFields = [],
  } = props;

  React.useEffect(() => {
    if (props.name) {
      const presistedState = window.localStorage.getItem(props.name);

      if (presistedState) {
        const ps = JSON.parse(presistedState);
        // console.log((ps.page = 0));
        // dispatch({ type: "setState", payload: ps });
      }
    }
  }, []);

  React.useEffect(() => {
    if (props.name) {
      window.localStorage.setItem(props.name, JSON.stringify(state));
    }
  }, [state]);

  const setPage = (page: number) => {
    dispatch({ type: "setPage", payload: page });
  };

  const setSort = (sort: ITableSortState | null) => {
    dispatch({ type: "setSort", payload: sort });
  };
  const setFilter = (filter: ITableFilterState | null) => {
    dispatch({ type: "setFilter", payload: filter });
  };
  const setBulkItem = (id: string) => {
    dispatch({ type: "setBulkItem", payload: id });
  };
  const setBulkItems = (bulkItems: IBulkState) => {
    dispatch({ type: "setBulkItems", payload: bulkItems });
  };

  const setSearch = (search: string) => {
    dispatch({ type: "setSearch", payload: search });
  };

  const data = React.useMemo(
    () =>
      tableSort(
        sort,
        tableFilter(filter, tableSearch(search, rows, searchFields))
      ),
    [rows, filter, sort, search]
  );

  const paginated = React.useMemo(
    () => data.slice(per_page * state.page, per_page * (state.page + 1)),
    [state.page, data]
  );

  const handleBulkMasterClick = (s: boolean) => {
    dispatch({
      type: "setBulkItems",
      payload: s
        ? paginated.reduce((acc, item) => ({ ...acc, [item.id]: true }), {})
        : {},
    });
  };

  const maxPage = Math.ceil(data.length / per_page);

  return {
    rows,
    data: paginated,
    page,
    setPage,
    maxPage,
    filter,
    setFilter,
    setSearch,
    search,
    columns,
    options,
    setSort,
    sort,
    hasBulk: !!options.bulkActions,
    bulkItems,
    onRowClick,
    setBulkItem,
    bulkMaster,
    handleBulkMasterClick,
    setBulkItems,
  };
};

export default useTable;
