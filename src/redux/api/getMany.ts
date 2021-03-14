import { db, firebase } from "misc/firebase";

interface IRecord {
  id: string;
}

interface IGetManyParams {
  resource: string;
  lastLoadedAt: number | undefined | null;
  ids: string[];
}

const getMany = async (props: IGetManyParams) => {
  // console.log(`tryFetch ${props.resource} `);

  let res: IRecord[] = [];
  try {
    let query;

    if (props.lastLoadedAt) {
      query = db
        .collection(props.resource)
        .where("id", ">", props.lastLoadedAt);
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

export { getMany };
