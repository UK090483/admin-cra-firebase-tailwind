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

import setSession from "./https/users/setSession";

import getDataJotForm from "./https/getDataJotForm";
import getJotFormImage from "./https/getJotFormImage";

export {
  getJotFormImage,
  getDataJotForm,
  imageTransform,
  deleteUser,
  createUser,
  updateUser,
  setSession,
  initUser,
  getJudgeApplications,
  judgeUpdateApplication,
};
