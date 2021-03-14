import { db, firebase } from "misc/firebase";
import { FirebaseTimestamp } from "types";
import getCreateData from "./helper/getCreateData";
import { parseAllDatesDoc } from "./helper/timestamp-parser";

interface IRecord {
  id: string;
}

interface ICreateData {
  [field: string]: any;
}

export interface ICreateResourceParams {
  resource: string;
  id: string;
  data: ICreateData;
}

const createOne = async (props: ICreateResourceParams) => {
  const { resource, id, data } = props;
  try {
    const query = db.collection(resource).doc(id);

    await query.set({
      ...data,
      ...getCreateData(),
    });
  } catch (error) {
    console.log(error);
  }
  return true;
};

export { createOne };
