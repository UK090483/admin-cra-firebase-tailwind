import { IApplicationRecord } from "applications/ApplicationTypes";
import * as faker from "faker";
import { IJudgeRecord } from "judges/JudgeTypes";
import { JUDGE_COLORS } from "misc/constants";
import { db, firebase } from "misc/firebase";
import { IAssessmentRecord } from "../assessments/types";
import { FakeApplication } from "./FakeApplication";
import FakeAssessment from "./FakeAssessment";
import { FakeJudgeRecord } from "./FakeJudgeRecord";
import { chunk, getArray } from "./helper";

const getCreateData = () => {
  return {
    updated_at: firebase.firestore.Timestamp.now(),
    updated_by: "blaaaaaaaaaaaaaaaaa",
  };
};

class Seed {
  private makeJudges = (amount: number): IJudgeRecord[] => {
    return getArray(amount).map((item, index) =>
      FakeJudgeRecord("FakeJudge" + index)
    );
  };

  private makeApplications = (amount: number) => {
    return getArray(amount).map((item, index) => FakeApplication());
  };

  numApplications = 200;
  numJudges = 10;
  assessmentsPerJudge = 3;

  judges = this.makeJudges(this.numJudges);

  applications = this.makeApplications(this.numApplications);

  private batch = async (
    resource: any[],
    resourceName: string,
    indexPrefix: string
  ) => {
    const chunks = chunk(resource, 300);

    chunks.forEach(async (item, chunkIndex) => {
      const Batch = db.batch();
      item.forEach((element, itemIndex) => {
        const ref = db
          .collection(resourceName)
          .doc(indexPrefix + (itemIndex + 1 + chunkIndex * 300));

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

  createFromJSON = async () => {};

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

  // private judgeAssessment = async (
  //   application: IApplicationRecord,
  //   mock_in_process: boolean
  // ) => {
  //   if (!application.assessments) {
  //     console.log("got application with no assessments");
  //     return null;
  //   }

  //   const nextAssessments = Object.entries(application.assessments).reduce(
  //     (acc, [key, value]) => {
  //       return {
  //         ...acc,
  //         [key]: FakeAssessment(
  //           value.application_id,
  //           value.judge_id,
  //           mock_in_process
  //         ),
  //       };
  //     },
  //     {}
  //   );

  //   await db
  //     .collection("applications")
  //     .doc(application.id)
  //     .update({ assessments: nextAssessments, ...getCreateData() });
  // };

  clear = async () => {
    await this.batchErase("applications");
    await this.eraseFakeJudges();
    await db.collection("tableDoc").doc("first").delete();
    console.log("clear done");
  };

  start = async () => {
    await this.clear();
    await this.batch(
      this.makeApplications(this.numApplications),
      "applications",
      "FakeApplication"
    );

    await this.makeTableDoc();
    await this.createFakeJudges();
  };

  accept = async () => {
    const applications = await db.collection("tableDoc").doc("first").get();

    const a = applications.data();

    if (!a) return;

    const nextDoc = Object.entries(a).reduce(
      (acc, [key, value], index) => ({
        ...acc,
        [key]: {
          ...(index < 60 ? { ...value, statePre: "accepted" } : { ...value }),
        },
      }),
      {}
    );
    await db.collection("tableDoc").doc("first").set(nextDoc);
  };

  makeTableDoc = async () => {
    const applications = await db.collection("applications").get();

    const tableDoc: any = {};

    applications.forEach((applicationDoc) => {
      const application = applicationDoc.data() as IApplicationRecord;
      tableDoc[applicationDoc.id] = {
        companyLogo: application.companyLogo,
        startupName: application.startupName,
        industry: application.industry,
        stage: application.stage,
        foundingDate: application.foundingDate,
        headquarters: application.headquarters,
        howIsCompanyFunded: application.howIsCompanyFunded,
        salesStrategy: application.salesStrategy,
        productReadiness: application.productReadiness,
      };
    });

    await db.collection("tableDoc").doc("first").set(tableDoc);
  };

  addJudges = async () => {
    const applications = await db.collection("tableDoc").doc("first").get();

    const a = applications.data();

    if (!a) return;

    const judges = await db
      .collection("judges")
      .where("judgeType", "==", "pre")
      .get();

    const judgeIds = judges.docs.map((judge) => judge.id);

    const nextDoc = Object.entries(a).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: {
          ...(value.statePre === "accepted"
            ? { ...value, assessments: judgeIds }
            : { ...value }),
        },
      }),
      {}
    );
    await db.collection("tableDoc").doc("first").set(nextDoc);
  };

  preJudgesJudge = async (mock_in_process?: boolean) => {
    const applications = await db.collection("tableDoc").doc("first").get();
    const applicationsData = applications.data();
    if (!applicationsData) return;
    const mockInProcess = mock_in_process ? true : false;
    const applicationIdsByJudgeID = Object.entries(applicationsData).reduce(
      (acc, [application_id, application]) => {
        if (application.assessments) {
          const applicationAssessments = application.assessments as string[];
          applicationAssessments.forEach((judge_id) => {
            if (!acc[judge_id]) acc[judge_id] = {};

            acc[judge_id][application_id] = FakeAssessment(
              application_id,
              judge_id,
              mockInProcess
            );

            return { ...acc };
          });
        }
        return { ...acc };
      },
      {} as {
        [K: string]: any;
      }
    );
    await Object.entries(applicationIdsByJudgeID).forEach(
      async ([judge_id, assessments]) => {
        await db.collection("judges").doc(judge_id).update({ assessments });
      }
    );
  };

  mainJudgesJudge = async () => {
    const applications = await db.collection("tableDoc").doc("first").get();
    const applicationsData = applications.data();
    if (!applicationsData) return;

    const mainJudgeAbles = Object.entries(applicationsData)
      .filter(
        ([id, item]) => item["stateTree"] && item["stateTree"] === "accepted"
      )
      .map((item) => item[0]);

    // const mainJudgeAbles = await db
    //   .collection("applications")
    //   .where("stateTree", "==", "accepted")
    //   .get();
    const mainJudges = await db
      .collection("judges")
      .where("judgeType", "==", "main")
      .get();

    mainJudges.forEach(async (judge) => {
      const nextData = mainJudgeAbles.reduce(
        (acc, application_id) => ({
          ...acc,
          [`assessments.${application_id}`]: FakeAssessment(
            application_id,
            judge.id
          ),
        }),
        {}
      );

      await db.collection("judges").doc(judge.id).update(nextData);
    });
  };
}

const SeedFirebase = new Seed();

export { SeedFirebase };
