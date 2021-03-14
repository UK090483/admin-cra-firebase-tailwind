//  @jest-environment node
import { db, firebase } from "misc/firebase";

const buildTestCollection = async () => {
  const testArray = new Array(10);
  testArray.fill(1);
  return Promise.all(
    testArray.map((item, index) =>
      db
        .collection("testCollection")
        .doc("item" + index)
        .set({
          name: index,
          updated_at: firebase.firestore.Timestamp.now().toDate(),
        })
    )
  );
};

interface item {
  id: string;
}

const deleteTestCollection = async () => {
  const erasers: any[] = [];
  try {
    const collection = await db.collection("testCollection").get();
    collection.forEach((item: item) => {
      erasers.push(db.collection("testCollection").doc(item.id).delete());
    });
  } catch (error) {
    console.log(error);
  }

  return true;
  return Promise.all(erasers);
};

export { buildTestCollection, deleteTestCollection, db };
