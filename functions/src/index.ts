// import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

import getJudgeApplications from "./https/getJudgeApplications";
import judgeUpdateApplication from "./https/judgeUpdateApplication";

import createUser from "./https/users/createUser";
import updateUser from "./https/users/updateUser";
import deleteUser from "./https/users/deleteUser";
import initUser from "./https/users/initUser";

import imageTransform from "./https/imageCdn";

export {
  imageTransform,
  deleteUser,
  createUser,
  updateUser,
  initUser,
  getJudgeApplications,
  judgeUpdateApplication,
};
