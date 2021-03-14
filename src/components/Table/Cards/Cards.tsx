import React, { FC } from "react";
import { ITableProps } from "../types";
import useTable from "../useTable";
import Card from "./Card";

const Table: FC<ITableProps> = (props) => {
  const {
    data,
    page,
    setPage,
    maxPage,
    filter,
    setFilter,
    columns,
    options,
    setSort,
    sort,
    hasBulk,
    bulkItems,
    rows,
    onRowClick,
    setBulkItem,
    bulkMaster,
    handleBulkMasterClick,
  } = useTable(props);

  return (
    <>
      <div className="p-1  bg-white">
        {/* {options.bulkActions && options.bulkActions({ bulkItems, data })} */}
        <div className="table-fixed border-collapse w-full ">
          {/* <TableHead
            setSort={setSort}
            sort={sort}
            columns={columns}
            hasBulk={hasBulk}
            bulkMaster={bulkMaster}
            handleBulkMasterClick={handleBulkMasterClick}
          /> */}
          <div>
            {data.map((data) => {
              return (
                <Card
                  key={data.id}
                  data={data}
                  onRowClick={onRowClick}
                  columns={columns}
                  hasBulk={hasBulk}
                  bulkItems={bulkItems}
                  setBulkItem={setBulkItem}
                ></Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Table;
