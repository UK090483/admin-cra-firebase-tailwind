import { IApplicationTableItem } from "applications/ApplicationTypes";
import useAssessments from "assessments/hooks/useAssessments";
import PageLoading from "components/Spinner/PageLoading";
import Table from "components/Table/Table";
import { IColumn } from "components/Table/types";
import React from "react";
import useUi from "../../../../hooks/useUi";
import JudgeChips from "../JudgeChips";
import Sum from "../Sum";
import TableExport from "../TableExport/tableExport";
import { Chart } from "./Chart";

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

interface FourthRoundTableProps {
  data: IApplicationTableItem[] | undefined;
}

const FourthRoundTable: React.FC<FourthRoundTableProps> = ({ data }) => {
  const { integrateJudgeAverages, sumIn100 } = useUi();
  const { sumByApplicationId } = useAssessments();

  if (!data) {
    return <PageLoading></PageLoading>;
  }

  const cleanData = data.filter((data) => data.stateTree === "accepted");

  const withSum = cleanData.map((item) => {
    return {
      ...item,
      preSum: sumByApplicationId[item.id] && sumByApplicationId[item.id].pre,
      mainSum: sumByApplicationId[item.id] && sumByApplicationId[item.id].main,
      sum: sumByApplicationId[item.id] && sumByApplicationId[item.id].all,
    };
  });

  return (
    <div className="animate-fadeIn">
      <Chart rows={[]}></Chart>
      <Table
        name="fourth_stage_Table"
        options={{}}
        per_page={10}
        // onRowClick={(data) => {
        //   redirect(`applications/${data.id}`);
        // }}
        columns={fourthRoundColumns}
        rows={withSum}
      />
      <TableExport />
    </div>
  );
};

export default FourthRoundTable;
