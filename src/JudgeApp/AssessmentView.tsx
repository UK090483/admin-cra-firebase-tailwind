import { ArrowLeftOutline } from "heroicons-react";
import React from "react";
import { useSelector } from "react-redux";
import { isLoaded, useFirestoreConnect } from "react-redux-firebase";
import { useHistory, useParams } from "react-router-dom";
import { RootState } from "redux/store";
import { RoutingParam } from "types";
import { AssessmentHelper } from "../assessments/helper/AssessmentHelper";
import ApplicationAccordion from "./JudgeApplicationAccordion";

const AssessmentView: React.FC = () => {
  let { id } = useParams<RoutingParam>();

  useFirestoreConnect({ collection: "applications", doc: id });

  const history = useHistory();
  const applications = useSelector(
    (state: RootState) => state.firestore.data.applications
  );

  // const assessment = getAssessment(application);

  const { assessment } = useSelector((state: RootState) => ({
    assessment:
      state.fb.profile.assessments && state.fb.profile.assessments[id],
  }));

  if (!isLoaded(applications)) {
    return <div>Loading...</div>;
  }

  const application = applications[id]
    ? { ...applications[id], id, foundingDate: "bla" }
    : null;

  return (
    <>
      <ArrowLeftOutline
        className="-mt-6"
        size={40}
        onClick={() => {
          history.push("/");
        }}
      />

      {application && (
        <>
          <h2 className="mt-4 mb-6 text-4xl">{application.startupName}</h2>
          <h2 className="mt-4 mb-6 text-2xl">
            {`Points: ${
              assessment &&
              AssessmentHelper.sumAssessmentPointsForJudgeApp(assessment)
            }/44`}{" "}
          </h2>
          <ApplicationAccordion application={application} />
        </>
      )}
    </>
  );
};

export default AssessmentView;
