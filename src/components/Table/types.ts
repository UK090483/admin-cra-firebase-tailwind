import * as React from "react";

export interface IColumn {
  field: string;
  use: string;
  use_in_search?: boolean;
  use_in_display?: boolean;
  width?: string;
  render?: (row: IRow) => JSX.Element | string | number;
}
export interface IRowData {
  [name: string]: any;
}

export interface IBulkActionsProps {
  bulkItems: IBulkState;
  data: IRow[];
  setBulkItems: (bulkItems: IBulkState) => void;
}

export interface ITableOptions {
  bulkActions?: (props: IBulkActionsProps) => JSX.Element;
  showFilter?: boolean;
  fixedFilter?: (
    filter: ITableFilterState | null,
    setFilter: (filter: ITableFilterState | null) => void,
    columns: IColumn[],
    rows: IRow[]
  ) => JSX.Element;
}

export interface ITableProps {
  name?: string;
  columns: IColumn[];
  rows: IRow[];
  per_page?: number;
  searchFields?: string[];
  onRowClick?: IRowClickFunction;
  options?: ITableOptions;
  rowStyle?: (row: IRow) => string | void;
}
export interface ITableSortState {
  field: string;
  direction: "desc" | "asc";
}

export interface IBulkState {
  [id: string]: boolean;
}

export type ITableFilter = [
  "===" | "!==" | ">" | "<",
  string | boolean | undefined
];
export interface ITableFilterState {
  [id: string]: ITableFilter[];
}

export interface IColumn {
  field: string;
  use: string;
  use_in_search?: boolean;
  use_in_display?: boolean;
  render?: (row: IRow) => JSX.Element | string | number;
}

export interface ITableColumns extends Array<IColumn> {}

export interface IRow {
  [key: string]: any;
}

export type IRowClickFunction = (data: any) => void;
export declare type RowArray = IRow[];
export declare type renderFunction = (
  row: IRow,
  col: IColumn,
  display_value: string
) => JSX.Element;
export interface Iprop {
  rows: IRow[];
  columns: IColumn[];
  row_render?: renderFunction;
  per_page?: number;
  no_content_text?: string;
  debounce_search?: number;
  table_header?: string;
  show_search?: boolean;
  onRowClick?: IRowClickFunction;
}
/**
 * Interface describing data after the active page has been set
 * @props pagination: Has the full paginated data for the rows prop
 * @props back_button_clickable: indicates if back button is clickable
 * @props forward_button_clickable: Dictates if the forward button is clickable
 * @props current_rows: The rows to be shown in the table(The current page rows)
 * @props active_page_number: The currently selected page number
 * @param {string} search_string: The Text used in the search field
 *
 */
export interface ItableState {
  pagination: ItableLinks;
  back_button_clickable: boolean;
  forward_button_clickable: boolean;
  current_rows: IRow[];
  active_page_number: number;
  search_string: string;
}
export interface IpageNum {
  [key: number]: {
    page_row_array: IRow[];
    back_button_clickable: boolean;
    forward_button_clickable: boolean;
    is_active: boolean;
  };
}
export interface ItableLinks {
  page_number_store: number[];
  page_map: IpageNum;
  all_rows: IRow[];
}
export interface InavComponProp {
  back_button_clickable: boolean;
  forward_button_clickable: boolean;
}
export interface IpageActiveSet {
  table_links: ItableLinks;
  back_button_clickable: boolean;
  forward_button_clickable: boolean;
  current_rows: IRow[];
  active_page_number: number;
}
export interface IpaginateProps extends ItableState {
  backButtonOnclick: (event: React.MouseEvent) => void;
  forwardButtonOnclick: (event: React.MouseEvent) => void;
  pageNumberClick: (event: React.MouseEvent, page_number: number) => void;
}
export declare type stringObj = {
  [key: string]: any;
};
