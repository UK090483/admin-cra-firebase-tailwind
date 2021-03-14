import { db, firebase } from "misc/firebase";
import { FirebaseTimestamp } from "types";
import { parseAllDatesDoc } from "./helper/timestamp-parser";

interface IRecord {
  id: string;
}

interface IFetchResourceParams {
  resource: string;
  lastLoadedAt: FirebaseTimestamp | null;
  were?: string[];
}

const getList = async (props: IFetchResourceParams) => {
  let res: IRecord[] = [];
  try {
    let query;
    if (props.lastLoadedAt) {
      query = db
        .collection(props.resource)
        .where("updated_at", ">", props.lastLoadedAt);
    } else {
      query = db.collection(props.resource);
    }

    const querySnapshot = await query.get();

    // console.log(
    //   `made ${querySnapshot.size} reads for ${props.resource} ${
    //     props.lastLoadedAt ? "since " + props.lastLoadedAt : ""
    //   }`
    // );
    querySnapshot.forEach((doc) => {
      if (doc.exists) {
        const data = doc.data();
        parseAllDatesDoc(data);

        res.push({ ...data, id: doc.id });
      }
    });
  } catch (error) {
    console.log(error);
  }
  return res;
};

export { getList };
