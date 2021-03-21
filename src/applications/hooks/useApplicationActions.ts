import {
  ApplicationStatePre,
  IApplicationAssessment,
  IApplicationUpdateAbles,
} from "applications/ApplicationTypes";
import { AssessmentHelper } from "assessments/helper/AssessmentHelper";
import { useFirestore } from "react-redux-firebase";

export default function useApplicationActions() {
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

  return {};
}
