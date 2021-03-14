import React, { FC } from "react";
import { ITableProps } from "./types";
import useTable from "./useTable";
import Navigation from "./Navigation";
import Row from "./Row";
import TableHead from "./TableHead";
import Filter from "./Filter";
import Search from "./Search";

const Table: FC<ITableProps> = (props) => {
  const {
    data,
    page,
    setPage,
    maxPage,
    filter,
    setFilter,
    search,
    setSearch,
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
    setBulkItems,
  } = useTable(props);

  const { rowStyle, searchFields } = props;

  return (
    <>
      <div className="p-4 bg-white rounded-xl shadow-xl">
        <div className="flex justify-between items-center">
          <Filter
            filter={filter}
            setFilter={setFilter}
            columns={columns}
            options={options}
            rows={rows}
          />
          {searchFields && <Search setSearch={setSearch} search={search} />}
        </div>

        {options.bulkActions &&
          options.bulkActions({ bulkItems, data, setBulkItems })}
        <table className="table-fixed border-collapse w-full ">
          <TableHead
            setSort={setSort}
            sort={sort}
            columns={columns}
            hasBulk={hasBulk}
            bulkMaster={bulkMaster}
            handleBulkMasterClick={handleBulkMasterClick}
          />
          <tbody>
            {data.map((data) => {
              return (
                <Row
                  key={data.id}
                  data={data}
                  onRowClick={onRowClick}
                  columns={columns}
                  hasBulk={hasBulk}
                  bulkItems={bulkItems}
                  setBulkItem={setBulkItem}
                  rowStyle={rowStyle && rowStyle}
                ></Row>
              );
            })}
          </tbody>
        </table>
        {maxPage > 1 && (
          <Navigation maxPage={maxPage} setPage={setPage} page={page} />
        )}
      </div>
    </>
  );
};
export default Table;
