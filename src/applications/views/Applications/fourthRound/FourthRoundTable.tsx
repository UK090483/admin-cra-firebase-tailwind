import { IApplicationTableItem } from "applications/ApplicationTypes";
import useAssessments from "assessments/hooks/useAssessments";
import NoDataPanel from "components/NoDataPanel";
import PageLoading from "components/Spinner/PageLoading";
import Table from "components/Table/Table";
import { IColumn } from "components/Table/types";
import React from "react";
import { useHistory } from "react-router";
import useUi from "../../../../hooks/useUi";
import JudgeChips from "../JudgeChips";
import Sum from "../Sum";
import TableExport from "../TableExport/tableExport";
import { Chart } from "./Chart";

interface FourthRoundTableProps {
  data: IApplicationTableItem[] | undefined;
}

const FourthRoundTable: React.FC<FourthRoundTableProps> = (props) => {
  let history = useHistory();
  const { data } = props;
  const { integrateJudgeAverages } = useUi();
  const { sumByApplicationId, sumWithJudgeAverages } = useAssessments();

  if (!data) {
    return <PageLoading></PageLoading>;
  }

  const cleanData = data.filter((data) => data.stateTree === "accepted");

  if (cleanData.length < 1) {
    return <NoDataPanel text={"No Applications Accepted yet"} />;
  }

  const withSum = cleanData.map((item) => {
    return {
      ...item,
      preSum: integrateJudgeAverages
        ? sumWithJudgeAverages[item.id] && sumWithJudgeAverages[item.id].pre
        : sumByApplicationId[item.id] && sumByApplicationId[item.id].pre,
      mainSum: integrateJudgeAverages
        ? sumWithJudgeAverages[item.id] && sumWithJudgeAverages[item.id].main
        : sumByApplicationId[item.id] && sumByApplicationId[item.id].main,
      sum: integrateJudgeAverages
        ? sumWithJudgeAverages[item.id] && sumWithJudgeAverages[item.id].all
        : sumByApplicationId[item.id] && sumByApplicationId[item.id].all,
    };
  });

  return (
    <div className="animate-fadeIn">
      <Chart judgeType="main" />
      <Table
        name="fourth_stage_Table"
        options={{}}
        per_page={10}
        onRowClick={(data) => {
          history.push(`applications/${data.id}`);
        }}
        columns={fourthRoundColumns}
        rows={withSum}
      />
      <TableExport />
    </div>
  );
};

export default FourthRoundTable;

const fourthRoundColumns: IColumn[] = [
  {
    field: "startupName",
    use: "Name",
    use_in_search: true,
  },

  {
    field: "sum",
    use: "Sum",
    use_in_search: false,
    render: (row) => (
      <>
        <Sum sum={row.sum} />
      </>
    ),
  },
  {
    field: "preSum",
    use: "Pre Sum",
    use_in_search: false,
    render: (row) => (
      <>
        <Sum sum={row.preSum} />
      </>
    ),
  },

  {
    field: "judges",
    use: "pre Judges",
    use_in_search: false,
    render: (row) => <JudgeChips row={row} />,
  },

  {
    field: "mainSum",
    use: "Main Sum",
    use_in_search: false,
    render: (row) => (
      <>
        <Sum sum={row.mainSum} />
      </>
    ),
  },
  {
    field: "mainjudges",
    use: "main Judges",
    use_in_search: false,
    render: (row) => <JudgeChips row={row} type="main" />,
  },
];
