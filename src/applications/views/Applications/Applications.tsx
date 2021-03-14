import React from "react";
import useApplications from "applications/hooks/useApplications";
import FirstRoundTable from "./firstRound/FirstRoundTable";
import SecondRoundTable from "./secondRound/SecondRoundTable";
import ThirdRoundTable from "./thirdRound/ThirdRoundTable";
import FourthRoundTable from "./fourthRound/FourthRoundTable";

import useUi from "hooks/useUi";
import StageButton from "./StageButton";

import TableExport from "./tableExport";

const Applications: React.FC = () => {
  const { ordered, loading, loadedAt } = useApplications();

  const { stage } = useUi();

  const getTable = () => {
    switch (stage) {
      case "first_filter":
        return <FirstRoundTable data={ordered} />;
      case "assign_prejudges":
        return <SecondRoundTable data={ordered} />;
      case "first_evaluation":
        return <ThirdRoundTable data={ordered} />;

      case "final_evaluation":
        return <FourthRoundTable data={ordered} />;
      default:
        break;
    }
  };

  if (loading && !loadedAt) {
    return <div>loading....</div>;
  }

  return (
    <div className="animate-fadeIn ">
      <StageButton />

      {getTable()}

      {/* <TableExport data={ordered} /> */}
    </div>
  );
};

export default Applications;
