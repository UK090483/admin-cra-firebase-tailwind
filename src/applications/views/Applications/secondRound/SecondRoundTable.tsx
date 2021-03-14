import {
  IBulkActionsProps,
  IColumn,
  ITableOptions,
} from "components/Table/types";
import React from "react";
import TextPreview from "../TextPreview";
import JudgeChips from "../JudgeChips";

import { ManageJudges } from "applications/views/Applications/ManageJudges";
import {
  IApplicationAssessment,
  IApplicationRecord,
} from "applications/ApplicationTypes";
import Table from "components/Table/Table";
import { useHistory } from "react-router-dom";
import useApplicationActions from "../../../hooks/useApplicationActions";

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

const secondRoundOptions: ITableOptions = {
  bulkActions: (bulkState) => <SecondRoundBulk {...bulkState} />,
};

export { secondRoundColumns, secondRoundOptions };

const SecondRoundBulk: React.FC<IBulkActionsProps> = (props) => {
  const { updateApplicationAssessments } = useApplicationActions();

  const { bulkItems, data, setBulkItems } = props;

  const orderedBulkitems = Object.keys(bulkItems).filter((item) => item);
  const bulkItemsCount = orderedBulkitems.length;
  const hasBulkItems = bulkItemsCount > 0;

  const handleClick = (res: IApplicationAssessment) => {
    data.forEach((dataItem) => {
      if (bulkItems[dataItem.id]) {
        const nextAssessments = Object.values(res).reduce((acc, item) => {
          return {
            ...acc,
            [item.id]: {
              application_id: dataItem.id,
              judge_id: item.id,
            },
          };
        }, {});

        updateApplicationAssessments({
          oldAssessments: dataItem.assessments ? dataItem.assessments : {},
          assessments: nextAssessments,
          id: dataItem.id,
        });
      }
    });
    setBulkItems({});
  };

  return (
    <div
      className={`${
        hasBulkItems ? "max-h-64" : "max-h-0"
      } mb-6 transition-all  overflow-hidden`}
    >
      <ManageJudges handleClick={handleClick} />
    </div>
  );
};

interface SecondRoundTableProps {
  data: IApplicationRecord[];
}

const SecondRoundTable: React.FC<SecondRoundTableProps> = ({ data }) => {
  const cleanData = data
    .filter((data) => data.statePre === "accepted")
    .map((item) => ({
      ...item,
      judgeCount: item.assessments ? Object.keys(item.assessments).length : 0,
    }));
  const history = useHistory();

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
