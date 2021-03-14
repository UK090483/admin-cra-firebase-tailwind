import * as React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { IColumn, ITableOptions, ITableFilterState, IRow } from "./types";

interface IFilterProps {
  filter: ITableFilterState | null;
  setFilter: (filter: ITableFilterState | null) => void;
  columns: IColumn[];
  options: ITableOptions;
  rows: IRow[];
}

const Filter: React.FC<IFilterProps> = ({
  filter,
  setFilter,
  columns,
  options,
  rows,
}) => {
  return (
    <div>
      {options.showFilter && (
        <div data-testid="filter" className={`flex justify-between  `}>
          <div className={`bg-green-300  `}>
            {filter &&
              Object.entries(filter).map(([key, [[comp, val]]], index) => {
                return (
                  <div
                    key={index}
                    data-testid="table_show_filter"
                    className={`flex`}
                  >
                    <div className={`px-2 py-2`}>{key}</div>
                    <div className={`px-2 py-2`}>{comp}</div>
                    <div className={`px-2 py-2`}>{val}</div>
                  </div>
                );
              })}
          </div>
          <div className={` `}>
            <Popup trigger={<button>Filter</button>} position="left center">
              {columns.map((item) => (
                <div
                  key={item.field}
                  onClick={() => {
                    //   setFilter({ [item.field]: false });
                  }}
                >
                  {item.use}
                </div>
              ))}
            </Popup>
          </div>
        </div>
      )}

      {options.fixedFilter &&
        options.fixedFilter(filter, setFilter, columns, rows)}
    </div>
  );
};
export default Filter;
