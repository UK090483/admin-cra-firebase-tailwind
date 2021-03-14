import TextPreview from "applications/views/Applications/TextPreview";
import { IColumn, ITableOptions } from "components/Table/types";

import React from "react";
import Table from "components/Table/Table";
import { useHistory } from "react-router-dom";

import { useJudgeAppApplications } from "./state/hooks/useJudgeAppApplications";
import { IApplicationRecord } from "../applications/ApplicationTypes";
import {
  getApplicationStateColor,
  getApplicationState,
} from "./helper/getAssessmentStateColor";
import { AssessmentHelper } from "../assessments/helper/AssessmentHelper";
import Intro from "./Intro";
import TableFilter from "./TableFilter";

const columnsFirstRound: IColumn[] = [
  {
    field: "logo",
    use: "Logo",
    use_in_search: true,
    width: "w-40",
    render: (row) => {
      if (row.companyLogo[0] && row.companyLogo[0].type === "image") {
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
  // {
  //   field: "stage",
  //   use: "Stage",
  // },

  // {
  //   field: "headquarters",
  //   use: "Headquaters",
  // },
  {
    field: "sum",
    use: "Sum",
    width: "w-20",
  },

  // {
  //   field: "prev",
  //   use: "Prev",
  //   render: (row) => (
  //     <TextPreview
  //       row={row}
  //       prevItemList={[
  //         "howIsCompanyFunded",
  //         "salesStrategy",
  //         "productReadiness",
  //       ]}
  //     />
  //   ),
  //   width: "w-24",
  // },
];

interface FirstRoundTableProps {}

const FirstRoundTable: React.FC<FirstRoundTableProps> = () => {
  const { applicationsData } = useJudgeAppApplications();

  const withSum = applicationsData.map((application) => ({
    ...application,
    applicationState: getApplicationState(application),
    sum:
      application.assessments && Object.values(application.assessments)[0]
        ? AssessmentHelper.sumAssessmentPoints(
            Object.values(application.assessments)[0]
          )
        : "---",
  }));

  const options: ITableOptions = {
    showFilter: false,
    fixedFilter: (filter, setFilter, columns, rows) => (
      <TableFilter
        setFilter={setFilter}
        filter={filter}
        columns={columns}
        rows={rows}
      />
    ),
  };

  let history = useHistory();
  return (
    <div className="animate-fadeIn ">
      <Intro applications={withSum} />

      <Table
        searchFields={["startupName", "headquarters"]}
        name="first_stage_Table"
        options={options}
        per_page={10}
        onRowClick={(data) => {
          history.push(`applications/${data.id}`);
        }}
        columns={columnsFirstRound}
        rows={withSum}
        rowStyle={(row) => {
          return getApplicationStateColor(row as IApplicationRecord);
        }}
      />
    </div>
  );
};

export default FirstRoundTable;
