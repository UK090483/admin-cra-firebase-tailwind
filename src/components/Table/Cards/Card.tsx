import React from "react";
import { IRowClickFunction, IRowData, IColumn, IBulkState } from "../types";

interface IRowProps {
  data: IRowData;
  onRowClick: IRowClickFunction | undefined;
  columns: IColumn[];
  bulkItems: IBulkState;
  setBulkItem: (id: string) => void;
  hasBulk: boolean;
}

const Card: React.FC<IRowProps> = ({
  data,
  onRowClick,
  columns,
  bulkItems,
  setBulkItem,
  hasBulk,
}) => {
  return (
    <div
      onClick={(e) => {
        onRowClick && onRowClick(data);
      }}
      className={`bg-blue-300 mb-4 p-2 shadow-2xl rounded-md`}
    >
      {hasBulk && (
        <td
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={` text-center w-10 `}
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
          <div key={item.field} className={`p-1 flex flex-wrap `}>
            <h1 className="font-bold pr-4">{item.use}:</h1>
            {item.render ? item.render(data) : data[item.field]}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Card);
