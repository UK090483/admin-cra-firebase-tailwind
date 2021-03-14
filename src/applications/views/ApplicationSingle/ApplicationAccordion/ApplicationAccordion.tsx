import React from "react";
import { IApplicationRecord } from "applications/ApplicationTypes";
import { ApplicationHelper } from "applications/helper/ApplicationHelper";
import Accordion from "components/Accordion/Accordion";
import useJudges from "judges/hooks/useJudges";
import AccordionFields from "components/Accordion/AccordionFields";

interface IApplicationAccordion {
  application: IApplicationRecord;
}

const ApplicationAccordion: React.FC<IApplicationAccordion> = (props) => {
  const { application } = props;

  const assessments = application.assessments
    ? Object.values(application.assessments)
    : [];

  const hasAssessments = assessments.length > 1;

  const { judges } = useJudges();

  return (
    <div className="shadow-2xl">
      {ApplicationHelper.getTopics().map((topic, index) => {
        const topicAssessments = ApplicationHelper.getAssessments(topic);

        return (
          <Accordion key={index} label={topic}>
            <div key={index} className="flex">
              <AccordionFields
                application={application}
                topic={topic}
                extraClasses={
                  topicAssessments && hasAssessments ? "w-2/3 pr-1" : "w-full"
                }
              />

              <div
                className={`${
                  !!topicAssessments && hasAssessments && "w-1/3 pl-1"
                }`}
              >
                {!!topicAssessments &&
                  hasAssessments &&
                  topicAssessments.map((topicAssessment, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-gray-300 p-3 rounded-md mb-2"
                      >
                        <h3 className="font-bold pb-2">{topicAssessment}</h3>
                        {assessments &&
                          hasAssessments &&
                          assessments.map((assessment, index) => {
                            return (
                              <Accordion
                                key={index}
                                label={
                                  <div>
                                    {`${judges[assessment.judge_id].name}  ${
                                      assessment[topicAssessment]
                                    }`}
                                  </div>
                                }
                              >
                                {
                                  // @ts-ignore
                                  assessment[topicAssessment + "Reason"]
                                }
                              </Accordion>
                            );
                          })}
                      </div>
                    );
                  })}
              </div>
            </div>
          </Accordion>
        );
      })}
    </div>
  );
};

export default ApplicationAccordion;
