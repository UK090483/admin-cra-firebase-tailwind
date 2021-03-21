import React from "react";
import { IColumn, ITableOptions } from "components/Table/types";
import Table from "components/Table/Table";
import { useHistory } from "react-router-dom";
import { IApplicationRecord } from "../applications/ApplicationTypes";
import { getApplicationStateColor } from "./helper/getAssessmentStateColor";
import { AssessmentHelper } from "../assessments/helper/AssessmentHelper";
import Intro from "./Intro";
import TableFilter from "./TableFilter";
import useApplications from "applications/hooks/useApplications";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Reducers/RootReducer";
import PageLoading from "components/Spinner/PageLoading";

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
            alt="Logo"
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
    field: "sum",
    use: "Sum",
    width: "w-20",
  },
];

interface FirstRoundTableProps {}

const FirstRoundTable: React.FC<FirstRoundTableProps> = () => {
  const history = useHistory();
  const { ordered } = useApplications();
  const { id, assessments, judgeType } = useSelector((state: RootState) => ({
    id: state.fb.auth.uid,
    assessments: state.fb.profile.assessments,
    judgeType: state.fb.profile.judgeType,
  }));

  if (!judgeType) {
    return <PageLoading />;
  }

  const filtered =
    ordered &&
    ordered.filter((element) => {
      return judgeType === "pre"
        ? element.assessments && element.assessments.includes(id)
        : element.stateTree === "accepted";
    });

  const withSum =
    filtered &&
    filtered.map((application) => ({
      ...application,
      applicationState:
        assessments && assessments[application.id]
          ? AssessmentHelper.getAssessmentState(assessments[application.id])
          : "assigned",

      sum:
        assessments && assessments[application.id]
          ? AssessmentHelper.sumAssessmentPointsForJudgeApp(
              assessments[application.id]
            )
          : "---",
    }));

  if (!withSum) {
    return <PageLoading />;
  }

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

export default FirstRoundTable;
