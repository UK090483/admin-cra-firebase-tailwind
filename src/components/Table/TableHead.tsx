import React from "react";
import { ITableSortState, IColumn } from "./types";
import { ArrowCircleUp } from "heroicons-react";

interface ITableHeadProps {
  hasBulk: boolean;
  sort: ITableSortState | null;
  setSort: (sort: ITableSortState | null) => void;
  columns: IColumn[];
  handleBulkMasterClick: (s: boolean) => void;
  bulkMaster: boolean;
}

const TableHead: React.FC<ITableHeadProps> = ({
  setSort,
  sort,
  columns,
  hasBulk,
  bulkMaster,
  handleBulkMasterClick,
}) => {
  const handleClick = (field: string) => {
    if (sort) {
      const nextSort = { ...sort };
      if (field === sort.field) {
        if (sort.direction === "asc") {
          nextSort.direction = "desc";
          return setSort(nextSort);
        }
        return setSort(null);
      }
    }
    setSort({ field: field, direction: "asc" });
  };

  return (
    <thead>
      <tr className="table-row h-12">
        {hasBulk && (
          <th className="table-cell text-center w-10 ">
            <input
              data-testid="table_bulk_control"
              onChange={(e) => {
                handleBulkMasterClick(e.target.checked);
              }}
              type="checkbox"
              className="form-checkbox text-gray-600 "
              checked={bulkMaster}
            />
          </th>
        )}
        {columns.map((column: IColumn, index: number) => (
          <th
            onClick={() => handleClick(column.field)}
            key={index.toString()}
            className={`px-4 py-2 text-left transition-all duration-700 ${
              sort && sort.field === column.field && "bg-gray-500 text-gray-200"
            } ${column.width ? column.width : ""}`}
          >
            <div className={`flex`}>
              <div>{column.use}</div>
              {sort && sort.field === column.field && (
                <ArrowCircleUp
                  data-testid={"table_sort_indicator_" + sort.direction}
                  className={` transform transition-transform duration-500 ${
                    sort.direction === "desc" ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default React.memo(TableHead);
