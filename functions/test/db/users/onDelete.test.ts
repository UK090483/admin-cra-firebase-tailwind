import { admin, test } from "../../util/config";

import onDelete from "../../../src/db/users/onDelete.function";

describe("onDelete Realtime Database", () => {
  let userRecord: any;

  it("should delete the user from the authentication section", async () => {
    userRecord = await admin.auth().createUser({ email: "user@example.com" });

    const wrapped = test.wrap(onDelete);

    await wrapped(
      {},
      {
        params: {
          uid: userRecord.uid,
        },
      }
    );
    return await chai
      .expect(admin.auth().getUser(userRecord.uid))
      .to.be.rejectedWith(
        Error,
        "There is no user record corresponding to the provided identifier."
      );
  });
});
