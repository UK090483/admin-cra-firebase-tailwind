import { useDispatch } from "react-redux";

import getCreateData from "../../redux/api/helper/getCreateData";
import { uuid } from "uuidv4";
import { updateApplicationAction } from "applications/state/applicationsReducer";
import {
  IApplicationAssessment,
  IApplicationUpdateAbles,
} from "applications/ApplicationTypes";
import { AssessmentHelper } from "assessments/helper/AssessmentHelper";

interface IUpdateApplicationProps {
  data: IApplicationUpdateAbles;
  id: string;
}

interface IUpdateApplicationAssessmentsProps {
  oldAssessments: IApplicationAssessment;
  assessments: IApplicationAssessment;
  id: string;
}

export default function useApplicationActions() {
  const dispatch = useDispatch();

  const updateApplication = (props: IUpdateApplicationProps) => {
    dispatch(updateApplicationAction({ ...props }));
  };

  const updateApplicationAssessments = (
    props: IUpdateApplicationAssessmentsProps
  ) => {
    const { oldAssessments, assessments, id } = props;

    const notEraseAbleAssessments = Object.entries(oldAssessments).reduce(
      (acc, [key, value]) => ({
        ...acc,
        ...(AssessmentHelper.getAssessmentState(value) !== "assigned" && {
          [key]: value,
        }),
      }),
      {}
    );
    const nextAssessments = { ...assessments, ...notEraseAbleAssessments };
    dispatch(
      updateApplicationAction({ data: { assessments: nextAssessments }, id })
    );
  };

  return { updateApplication, updateApplicationAssessments };
}
