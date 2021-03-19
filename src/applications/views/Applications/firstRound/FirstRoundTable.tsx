import TextPreview from "applications/views/Applications/TextPreview";
import { IColumn, ITableOptions } from "components/Table/types";
import { DateField } from "components/Fields/DateField";
import ApplicationSelectAction from "../ApplicationSelectAction";
import FirstRoundFilter from "./FirstRoundFilter";
import React from "react";
import Table from "components/Table/Table";
import { useHistory } from "react-router-dom";

const optionsFirstRound: ITableOptions = {
  showFilter: false,
  fixedFilter: (filter, setFilter, columns, rows) => (
    <FirstRoundFilter
      setFilter={setFilter}
      filter={filter}
      columns={columns}
      rows={rows}
    />
  ),
};

interface FirstRoundTableProps {
  data: any[];
}

const FirstRoundTable: React.FC<FirstRoundTableProps> = ({ data }) => {
  let history = useHistory();

  return (
    <div className="animate-fadeIn" data-testid="FirstRoundTable">
      <Table
        searchFields={["startupName", "headquarters"]}
        name="first_stage_Table"
        options={optionsFirstRound}
        per_page={10}
        onRowClick={(data) => {
          history.push(`applications/${data.id}`);
        }}
        columns={columnsFirstRound}
        rows={data}
      />
    </div>
  );
};

export default FirstRoundTable;
export { columnsFirstRound, optionsFirstRound };

const columnsFirstRound: IColumn[] = [
  {
    field: "logo",
    use: "Logo",
    use_in_search: true,
    width: "w-20",
    render: (row) => {
      if (
        row.companyLogo &&
        row.companyLogo[0] &&
        row.companyLogo[0].type === "image"
      ) {
        return (
          <img
            className="w-20 h-10 object-contain"
            src={`${row.companyLogo[0].src}`}
          />
        );
      }

      return <div>noLogo</div>;
    },
  },
  {
    field: "startupName",
    use: "Name",
    use_in_search: true,
    width: "w-1/4",
  },
  {
    field: "industry",
    use: "Industry",
  },
  {
    field: "stage",
    use: "Stage",
  },
  {
    field: "foundingDate",
    use: "Founded",
    render: (row) => <DateField date={row.foundingDate} />,
  },
  {
    field: "headquarters",
    use: "Headquaters",
  },
  {
    field: "state",
    use: "Accept",
    render: (row) => <ApplicationSelectAction row={row} name="statePre" />,
    width: "w-60",
  },

  {
    field: "prev",
    use: "Prev",
    render: (row) => (
      <TextPreview
        row={row}
        prevItemList={[
          "howIsCompanyFunded",
          "salesStrategy",
          "productReadiness",
        ]}
      />
    ),
    width: "w-24",
  },
];
