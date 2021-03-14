import ApplicationAccordion from "./JudgeApplicationAccordion";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { RoutingParam } from "types";
import { useJudgeAppApplications } from "./state/hooks/useJudgeAppApplications";
import { ArrowLeftOutline } from "heroicons-react";
import { AssessmentHelper } from "../assessments/helper/AssessmentHelper";
import { getAssessment } from "./helper/getAssessment";

const AssessmentView: React.FC = () => {
  let { id } = useParams<RoutingParam>();
  const { applications } = useJudgeAppApplications();

  const history = useHistory();

  const application = applications[id];

  const assessment = getAssessment(application);

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
