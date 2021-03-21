import { ArrowLeftOutline } from "heroicons-react";
import React from "react";
import { useSelector } from "react-redux";
import { isLoaded, useFirestoreConnect } from "react-redux-firebase";
import { useHistory, useParams } from "react-router-dom";
import { RootState } from "redux/store";
import { RoutingParam } from "types";
import { AssessmentHelper } from "../assessments/helper/AssessmentHelper";
import ApplicationAccordion from "./JudgeApplicationAccordion";
import { useJudgeApp } from "./hooks/useJudgeApp";
import PageLoading from "../components/Spinner/PageLoading";

const AssessmentView: React.FC = () => {
  const history = useHistory();
  let { id } = useParams<RoutingParam>();
  const { getAssessment } = useJudgeApp();

  useFirestoreConnect({ collection: "applications", doc: id });

  const { application, isLoading } = useSelector((state: RootState) => ({
    application:
      state.firestore.data.applications && state.firestore.data.applications[id]
        ? { ...state.firestore.data.applications[id], id }
        : null,
    isLoading: state.firestore.status.requesting[`applications/${id}`],
  }));

  const assessment = getAssessment(id);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className="animate-fadeIn ">
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
    </div>
  );
};

export default AssessmentView;
