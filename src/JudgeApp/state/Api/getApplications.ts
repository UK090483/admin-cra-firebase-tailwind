import firebase from "misc/firebase";

import { parseAllDatesDoc } from "redux/api/helper/timestamp-parser";

const getApplications = async () => {
  const run = await firebase
    .functions()
    .httpsCallable("getJudgeApplications")();

  // @ts-ignore
  const bla = run.data.map((item) => {
    if (item.foundingDate) {
      item.foundingDate = item.foundingDate.toString();
    }

    return item;
  });

  return [...run.data];
};

export { getApplications };
