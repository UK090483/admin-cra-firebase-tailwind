import { IApplicationAssessment } from "applications/ApplicationTypes";
import FakeAssessment from "./FakeAssessment";
import { IAssessmentRecord } from "assessments/types";
import { IJudgeRecord } from "judges/JudgeTypes";
import firebase from "firebase";

const getArray: (amount: number) => number[] = (amount) => {
  const all = new Array(amount);
  return all.fill(1).map((item, index) => index);
};

function getRandom(arr: number[], n: number): number[] {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

export const base = {
  id: "",
  created_at: firebase.firestore.Timestamp.now(),
  updated_at: firebase.firestore.Timestamp.now(),
  updated_by: "",
  created_by: "",
};

const AssessmentGenerator = (judges: IJudgeRecord[], amount: number) => {
  let all: IAssessmentRecord[] = [];
  return {
    getApplicationAssessments: (id: string) => {
      const ranJudgesIndexes = judges.map((item, index) => index);
      const ranJudges = getRandom(ranJudgesIndexes, amount);
      const ranAssessments = ranJudges.map((item) =>
        FakeAssessment(id, "Fake" + "Judge" + item)
      );

      const lastIndex: number = all.length;
      all = [...all, ...ranAssessments];

      const assessResult: IApplicationAssessment = {};

      ranAssessments.forEach((item, index) => {
        const makeID = "Fake" + "Assessment" + (index + lastIndex);
        assessResult[makeID] = item;
      });

      return assessResult;
    },
    getAllAssessments: () => all,
  };
};
function chunk(array: any[], size: number) {
  const chunked_arr = [];
  for (let i = 0; i < array.length; i++) {
    const last = chunked_arr[chunked_arr.length - 1];
    if (!last || last.length === size) {
      chunked_arr.push([array[i]]);
    } else {
      last.push(array[i]);
    }
  }
  return chunked_arr;
}

export { AssessmentGenerator, getArray, chunk };
