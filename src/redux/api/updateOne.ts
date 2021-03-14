import { db, firebase } from "misc/firebase";
import { FirebaseTimestamp } from "types";
import getCreateData from "./helper/getCreateData";
import { parseAllDatesDoc } from "./helper/timestamp-parser";

interface IRecord {
  id: string;
}

interface IUpdateData {
  [field: string]: any;
}

export interface IUpdateResourceParams {
  resource: string;
  id: string;
  data: IUpdateData;
}

const updateOne = async (props: IUpdateResourceParams) => {
  const { resource, id, data } = props;
  try {
    const query = db.collection(props.resource).doc(id);

    await query.update({
      ...data,
      ...getCreateData(),
    });
  } catch (error) {
    console.log(error);
  }
  return true;
};

export { updateOne };
