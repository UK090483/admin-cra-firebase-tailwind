import { db, firebase } from "misc/firebase";
import { FakeApplication } from "./FakeApplication";
import { FakeJudgeRecord } from "./FakeJudgeRecord";
import * as faker from "faker";
import {
  IApplicationAssessment,
  IApplicationRecord,
} from "applications/ApplicationTypes";
import { AssessmentGenerator, getArray, chunk } from "./helper";

import FakeAssessment from "./FakeAssessment";
import getCreateData from "redux/api/helper/getCreateData";
import { IJudgeRecord } from "judges/JudgeTypes";
import { JUDGE_COLORS } from "misc/constants";
import { AssessmentHelper } from "../assessments/helper/AssessmentHelper";

class Seed {
  private makeJudges = (amount: number): IJudgeRecord[] => {
    return getArray(amount).map((item, index) =>
      FakeJudgeRecord("FakeJudge" + index)
    );
  };

  private makeApplications = (amount: number) => {
    return getArray(amount).map((item, index) => FakeApplication());
  };

  numApplications = 500;
  numJudges = 20;
  assessmentsPerJudge = 3;

  judges = this.makeJudges(this.numJudges);

  applications = this.makeApplications(this.numApplications);

  private batch = async (
    resource: any[],
    resourceName: string,
    indexPrefix: string
  ) => {
    const chunks = chunk(resource, 300);
    chunks.forEach(async (item, index) => {
      const Batch = db.batch();
      item.forEach((element, eIndex) => {
        const ref = db
          .collection(resourceName)
          .doc(indexPrefix + (index + 1) * eIndex);
        Batch.set(ref, element);
      });

      console.log(`batched ${item.length} ${resourceName}`);
      await Batch.commit();
    });
  };

  private batchErase = async (resource: string) => {
    const queryresult = await db.collection(resource).get();
    let resultArray: string[] = [];
    queryresult.forEach((doc) => {
      resultArray.push(doc.id);
    });
    const Batch = db.batch();
    resultArray.forEach((element) => {
      const ref = db.collection(resource).doc(element);

      Batch.delete(ref);
    });
    await Batch.commit();
  };

  createFakeJudges = async () => {
    const array = getArray(this.numJudges);
    const _createUser = firebase.functions().httpsCallable("createUser");
    for (let item of array) {
      await _createUser({
        name: "FakeJudge " + (item + 1),
        email: "FakeJudge" + (item + 1) + "@test.com",
        color: `bg-${faker.random.arrayElement(
          JUDGE_COLORS
        )}-${faker.random.arrayElement(["200", "400", "600", "900"])}`,
        judgeType: item < 6 ? "pre" : "main",
        active: true,
        type: "judges",
      });
    }
  };
  eraseFakeJudges = async () => {
    const _deleteUser = firebase.functions().httpsCallable("deleteUser");
    const judges = await db.collection("judges").get();
    for (let judge of judges.docs) {
      await _deleteUser({ uid: judge.id, type: "judges" });
    }
  };

  private judgeAssessment = async (
    application: IApplicationRecord,
    mock_in_process: boolean
  ) => {
    if (!application.assessments) {
      console.log("got application with no assessments");
      return null;
    }

    const nextAssessments = Object.entries(application.assessments).reduce(
      (acc, [key, value]) => {
        return {
          ...acc,
          [key]: FakeAssessment(
            value.application_id,
            value.judge_id,
            mock_in_process
          ),
        };
      },
      {}
    );

    await db
      .collection("applications")
      .doc(application.id)
      .update({ assessments: nextAssessments, ...getCreateData() });
  };

  clear = async () => {
    await this.batchErase("applications");
    await this.eraseFakeJudges();
  };

  start = async () => {
    await this.clear();
    await this.batch(
      this.makeApplications(this.numApplications),
      "applications",
      "FakeApplication"
    );
    await this.createFakeJudges();
  };

  accept = async () => {
    const applications = await db.collection("applications").limit(100).get();

    const Batch = db.batch();
    applications.forEach((application) => {
      const ref = db.collection("applications").doc(application.id);
      Batch.update(ref, {
        statePre: "accepted",
      });
    });
    await Batch.commit();
  };

  makeTableDoc = async () => {
    const applications = await db.collection("applications").get();

    const tableDoc: any = {};

    const parseAssessment = (application: IApplicationRecord) => {
      if (application.assessments) {
        return Object.entries(application.assessments).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: {
              application_id: value.application_id,
              judge_id: value.judge_id,
              sum: AssessmentHelper.evaluateAssessment(value).sum,
            },
          }),
          {}
        );
      }
    };

    applications.forEach((applicationDoc) => {
      const application = applicationDoc.data() as IApplicationRecord;
      tableDoc[applicationDoc.id] = {
        startupName: application.startupName,
        industry: application.industry,
        foundingDate: application.foundingDate,
        headquarters: application.headquarters,
      };
    });

    // console.log(tableDoc);

    await db.collection("tableDoc").doc("first").set(tableDoc);
  };

  addJudges = async () => {
    const applications = await db
      .collection("applications")
      .where("statePre", "==", "accepted")
      .get();
    const judges = await db
      .collection("judges")
      .where("judgeType", "==", "pre")
      .get();

    const judgeIds = judges.docs.map((judge) => judge.id);

    const getAss = (application_id: string) => {
      return judgeIds.reduce(
        (acc, judge_id) => ({
          ...acc,
          [judge_id]: { application_id, judge_id },
        }),
        {}
      );
    };

    const Batch = db.batch();
    applications.forEach((application) => {
      const ref = db.collection("applications").doc(application.id);

      Batch.update(ref, {
        assessments: getAss(application.id),
      });
    });
    await Batch.commit();
  };

  preJudgesJudge = async (mock_in_process?: boolean) => {
    const judgeAbles = await db
      .collection("applications")
      .where("assessments", "!=", "0")
      .get();

    const judges = await db.collection("judges").get();

    const judgesArray: IJudgeRecord[] = judges.docs.map(
      (doc) => doc.data() as IJudgeRecord
    );

    const prejudges = judgesArray
      .filter((judge) => judge.judgeType === "pre")
      .map((item) => item.id);

    const mockInProcess = mock_in_process ? true : false;

    judgeAbles.forEach((doc) => {
      const data = doc.data();
      this.judgeAssessment(
        { ...data, id: doc.id } as IApplicationRecord,
        mockInProcess
      );
    });
  };

  mainJudgesJudge = async () => {
    const mainJudgeAbles = await db
      .collection("applications")
      .where("stateTree", "==", "accepted")
      .get();
    const mainJudges = await db
      .collection("judges")
      .where("judgeType", "==", "main")
      .get();

    mainJudgeAbles.forEach(async (doc) => {
      const application = doc.data();

      const nextAssessments = {
        ...(application.assessments && application.assessments),
      };

      mainJudges.forEach((judgeDoc) => {
        nextAssessments[judgeDoc.id] = FakeAssessment(doc.id, judgeDoc.id);
      });

      await db
        .collection("applications")
        .doc(doc.id)
        .update({ assessments: nextAssessments });
    });
  };
}

const SeedFirebase = new Seed();

export { SeedFirebase };
