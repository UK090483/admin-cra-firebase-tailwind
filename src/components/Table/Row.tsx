import React from "react";
import {
  IRowClickFunction,
  IRowData,
  IColumn,
  IBulkState,
  IRow,
} from "./types";

interface IRowProps {
  data: IRowData;
  onRowClick: IRowClickFunction | undefined;
  columns: IColumn[];
  bulkItems: IBulkState;
  setBulkItem: (id: string) => void;
  hasBulk: boolean;
  rowStyle?: (row: IRow) => string | void;
}

const Row: React.FC<IRowProps> = ({
  data,
  onRowClick,
  columns,
  bulkItems,
  setBulkItem,
  hasBulk,
  rowStyle,
}) => {
  return (
    <tr
      data-testid={`tableRow-${data.id}`}
      onClick={(e) => {
        onRowClick && onRowClick(data);
      }}
      className={`table-row  border-b border-purple-300 transition-all duration-300  hover:bg-actionColor-200  ${
        rowStyle ? rowStyle(data) : ""
      }`}
    >
      {hasBulk && (
        <td
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`table-cell text-center w-10 `}
        >
          <input
            data-testid="table_bulk_control"
            onChange={() => {
              setBulkItem(data.id);
            }}
            type="checkbox"
            className="form-checkbox  text-gray-600 "
            checked={!!bulkItems[data.id]}
          />
        </td>
      )}
      {columns.map((item) => {
        return (
          <td key={item.field} className={`p-3  ${item.width}`}>
            {item.render ? item.render(data) : data[item.field]}
          </td>
        );
      })}
    </tr>
  );
};

export default React.memo(Row);
