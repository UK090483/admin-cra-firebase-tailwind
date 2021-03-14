import { IColumn, ITableOptions } from "components/Table/types";
import React from "react";
import JudgeChips from "../JudgeChips";
import Sum from "../Sum";
import { IApplicationRecord } from "applications/ApplicationTypes";
import Table from "components/Table/Table";
import ApplicationSelectAction from "../ApplicationSelectAction";
import { useHistory } from "react-router-dom";
import { AssessmentHelper } from "../../../../assessments/helper/AssessmentHelper";
import useJudges from "judges/hooks/useJudges";
import ThirdRoundFilter from "./ThirdRoundFilter";

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

interface ThirdRoundTableProps {
  data: IApplicationRecord[];
}

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

const ThirdRoundTable: React.FC<ThirdRoundTableProps> = ({ data }) => {
  const cleanData = data.filter((data) => data.statePre === "accepted");
  const history = useHistory();
  const { judges } = useJudges();

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
        rows={AssessmentHelper.evaluateTableData(cleanData, judges)}
      />
    </div>
  );
};

export default ThirdRoundTable;
