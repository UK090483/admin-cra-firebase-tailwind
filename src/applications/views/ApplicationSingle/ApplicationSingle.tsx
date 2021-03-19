import React from "react";
import { useParams } from "react-router-dom";
import { RoutingParam } from "types";
import ApplicationAccordion from "./ApplicationAccordion/ApplicationAccordion";
import ApplicationSingleTable from "./ApplicationSingleTable";
import ActionButton from "components/Buttons/ActionButton";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Reducers/RootReducer";
import { isLoaded } from "react-redux-firebase";
import useAssessments from "assessments/hooks/useAssessments";
import useJudges from "judges/hooks/useJudges";
import { Spinner } from "components/Spinner/Spinner";

const ApplicationSingle: React.FC = () => {
  let { id } = useParams<RoutingParam>();

  useFirestoreConnect({ collection: "applications", doc: id });

  const applications = useSelector(
    (state: RootState) => state.firestore.data.applications
  );

  const { AssessmentsByApplicationId } = useAssessments();

  const assessments =
    AssessmentsByApplicationId && AssessmentsByApplicationId[id]
      ? Object.values(AssessmentsByApplicationId[id])
      : [];

  const application =
    applications && applications[id]
      ? { ...applications[id], id, foundingDate: "bla" }
      : null;

  if (!application) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner size="1/3"></Spinner>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn ">
      <h2 className="-mt-3 mb-6 text-4xl">{application.startupName}</h2>

      <ApplicationSingleTable />

      <h2 className="pt-10  text-4xl">Antworten</h2>

      <div className="mb-8 -mt-8">
        <ActionButton
          path={`/applications/${application.id}/update`}
          type="update"
        />
      </div>

      <ApplicationAccordion
        assessments={assessments}
        application={application}
      />
    </div>
  );
};

export default ApplicationSingle;
