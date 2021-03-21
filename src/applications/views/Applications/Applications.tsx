import React from "react";
import useApplications from "applications/hooks/useApplications";
import FirstRoundTable from "./firstRound/FirstRoundTable";
import SecondRoundTable from "./secondRound/SecondRoundTable";
import ThirdRoundTable from "./thirdRound/ThirdRoundTable";
import FourthRoundTable from "./fourthRound/FourthRoundTable";
import useUi from "hooks/useUi";
import StageButton from "./StageButton";
import TableExport from "./TableExport/tableExport";
import PageLoading from "components/Spinner/PageLoading";
import NoDataPanel from "../../../components/NoDataPanel";

const Applications: React.FC = () => {
  const { ordered, isLoaded } = useApplications();
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
        return <FirstRoundTable data={ordered} />;
    }
  };

  if (!isLoaded) {
    return <PageLoading />;
  }

  return (
    <div className="animate-fadeIn ">
      {<StageButton />}

      {getTable()}

      {/* <TableExport data={ordered} /> */}
    </div>
  );
};

export default Applications;
