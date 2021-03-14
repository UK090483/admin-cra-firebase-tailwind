import { db, firebase } from "misc/firebase";

interface IRecord {
  id: string;
}

interface IGetOneParams {
  resource: string;
  lastLoadedAt: number | undefined | null;
  id: string;
}

const getOne = async (props: IGetOneParams) => {
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

    // console.log(`made ${querySnapshot.size} reads`);
    querySnapshot.forEach((doc) => {
      res.push({ ...doc.data(), id: doc.id });
    });
  } catch (error) {
    console.log(error);
  }
  return res;
};

export { getOne };
