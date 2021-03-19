import { IApplicationRecord } from "applications/ApplicationTypes";
import useAssessments from "assessments/hooks/useAssessments";
import PageLoading from "components/Spinner/PageLoading";
import Table from "components/Table/Table";
import { IColumn, ITableOptions } from "components/Table/types";
import React from "react";
import { useHistory } from "react-router-dom";
import ApplicationSelectAction from "../ApplicationSelectAction";
import JudgeChips from "../JudgeChips";
import Sum from "../Sum";
import ThirdRoundFilter from "./ThirdRoundFilter";

interface ThirdRoundTableProps {
  data: IApplicationRecord[] | undefined;
}

const ThirdRoundTable: React.FC<ThirdRoundTableProps> = ({ data }) => {
  if (!data) {
    return <PageLoading></PageLoading>;
  }

  const cleanData = data.filter((data) => data.statePre === "accepted");
  const history = useHistory();

  const { sumByApplicationId } = useAssessments();

  const withSum = cleanData.map((item) => {
    return {
      ...item,
      preSum: sumByApplicationId[item.id] && sumByApplicationId[item.id].pre,
    };
  });

  return (
    <div className="animate-fadeIn">
      <Table
        searchFields={["startupName", "headquarters"]}
        name="third_stage_Table"
        options={optionsThirdRound}
        per_page={10}
        onRowClick={(data) => {
          history.push(`applications/${data.id}`);
        }}
        columns={thirdRoundColumns}
        rows={withSum}
      />
    </div>
  );
};

export default ThirdRoundTable;

const optionsThirdRound: ITableOptions = {
  showFilter: false,
  fixedFilter: (filter, setFilter, columns, rows) => (
    <ThirdRoundFilter
      setFilter={setFilter}
      filter={filter}
      columns={columns}
      rows={rows}
    />
  ),
};

const thirdRoundColumns: IColumn[] = [
  {
    field: "startupName",
    use: "Name",
    use_in_search: true,
  },
  {
    field: "industry",
    use: "Industry",
  },

  {
    field: "preSum",
    use: "Sum",
    render: (row) => <Sum sum={row.preSum} />,
  },

  {
    field: "judges",
    use: "Judges",
    render: (row) => <JudgeChips row={row} />,
  },
  {
    field: "state",
    use: "To Main Judges ?",
    render: (row) => <ApplicationSelectAction row={row} name="stateTree" />,
    width: "w-60",
  },
];
