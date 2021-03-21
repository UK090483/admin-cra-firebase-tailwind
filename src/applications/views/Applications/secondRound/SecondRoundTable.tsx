import { IApplicationRecord } from "applications/ApplicationTypes";
import NoDataPanel from "components/NoDataPanel";
import PageLoading from "components/Spinner/PageLoading";
import Table from "components/Table/Table";
import { IColumn, ITableOptions } from "components/Table/types";
import React from "react";
import { useHistory } from "react-router-dom";
import JudgeChips from "../JudgeChips";
import TextPreview from "../TextPreview";
import SecondRoundBulk from "./secondRoundBulk";

interface SecondRoundTableProps {
  data: any[] | undefined;
}

const SecondRoundTable: React.FC<SecondRoundTableProps> = ({ data }) => {
  const history = useHistory();

  if (!data) {
    return <PageLoading></PageLoading>;
  }

  const cleanData = data
    .filter((data) => data.statePre === "accepted")
    .map((item) => ({
      ...item,
      judgeCount: item.assessments ? Object.keys(item.assessments).length : 0,
    }));

  if (cleanData.length < 1) {
    return <NoDataPanel text={"No Applications Accepted yet"} />;
  }

  return (
    <div className="animate-fadeIn">
      <Table
        searchFields={["startupName", "headquarters"]}
        name="second_stage_Table"
        options={secondRoundOptions}
        per_page={10}
        onRowClick={(data) => {
          history.push(`applications/${data.id}`);
        }}
        columns={secondRoundColumns}
        rows={cleanData}
      />
    </div>
  );
};

export default SecondRoundTable;

const secondRoundOptions: ITableOptions = {
  bulkActions: (bulkState) => <SecondRoundBulk {...bulkState} />,
};

const secondRoundColumns: IColumn[] = [
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
    field: "judgeCount",
    use: "Judges",
    use_in_search: false,
    render: (row) => <JudgeChips row={row} withManage={true} />,
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
