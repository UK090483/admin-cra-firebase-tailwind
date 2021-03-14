import { IApplicationAssessment } from "applications/ApplicationTypes";
import firebase from "misc/firebase";

interface IUpdateApplicationAssessmentProps {
  applicationId: string;
  nextAssessments: IApplicationAssessment;
}

const updateApplicationAssessment = async (
  props: IUpdateApplicationAssessmentProps
) => {
  console.log("update Applications");
  const run = await firebase
    .functions()
    .httpsCallable("judgeUpdateApplication");

  await run(props);

  // // @ts-ignore
  // const bla = run.data.map((item) => {
  //   if (item.foundingDate) {
  //     item.foundingDate = item.foundingDate.toString();
  //   }

  //   return item;
  // });

  return "[...run.data]";
};

export { updateApplicationAssessment };
