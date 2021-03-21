import { firestore } from "@firebase/rules-unit-testing";
import {
  IApplicationUpdateAbles,
  ApplicationStatePre,
} from "applications/ApplicationTypes";
import { useFirestore } from "react-redux-firebase";
import useApplicationActions from "../applications/hooks/useApplicationActions";

const useActions = () => {
  const firestore = useFirestore();

  interface IUpdateApplicationProps {
    data: IApplicationUpdateAbles;
    id: string;
  }
  const updateApplication = async (props: IUpdateApplicationProps) => {
    const { id, data } = props;
    await firestore.update({ collection: "applications", doc: id }, data);
    return data;
  };

  interface IUpdateApplicationAssessmentsProps {
    state: ApplicationStatePre;
    name: string;
    id: string;
  }
  const updateApplicationAssessments = async (
    props: IUpdateApplicationAssessmentsProps
  ) => {
    const { state, id, name } = props;
    await firestore.update(
      { collection: "tableDoc", doc: "first" },
      { [`${id}.${name}`]: state }
    );
  };

  type UpdateAssessmentProps = {
    judge_id: string;
    application_id: string;
    data: { [key: string]: number | string };
  };
  const updateAssessment = async (props: UpdateAssessmentProps) => {
    const { application_id, judge_id, data } = props;

    const updateData = Object.entries(data).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [`assessments.${application_id}.${key}`]: value,
      }),
      {}
    );

    await firestore.update(
      { collection: "judges", doc: judge_id },
      {
        [`assessments.${application_id}.application_id`]: application_id,
        [`assessments.${application_id}.judge_id`]: judge_id,
        ...updateData,
      }
    );
  };

  return { updateAssessment, updateApplication, updateApplicationAssessments };
};

export { useActions };
