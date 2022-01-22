// models/auth.spec.ts
import { connect, connection } from "mongoose";
import { testMongoURL, encrypt } from "../utils";
import Auth from "./auth";

describe("test Auth model", () => {
  test("valid auth info", () => {
    const auth = new Auth({ username: "john", password: encrypt("secret") });

    expect(auth.validateSync()).toBeUndefined();
  });

  test("invalid auth info", () => {
    const auth = new Auth();
    const errors = auth.validateSync()?.errors ?? {};

    expect(Object.keys(errors).length).toBe(2);
    expect(errors.username.message).toBe("Path `username` is required.");
    expect(errors.password.message).toBe("Path `password` is required.");

    const auth2 = new Auth({ username: "foo", password: "bar" });
    const errors2 = auth2.validateSync()?.errors ?? {};

    expect(Object.keys(errors2).length).toBe(2);
    expect(errors2.username.message).toBe(
      "Path `username` (`" +
        auth2.username +
        "`) is shorter than the minimum allowed length (4)."
    );
    expect(errors2.password.message).toBe(
      "Path `password` (`" +
        auth2.password +
        "`) is shorter than the minimum allowed length (128)."
    );

    const auth3 = new Auth({
      username: Array(100).join("a"),
      password: Array(200).join("b"),
    });
    const errors3 = auth3.validateSync()?.errors ?? {};

    expect(Object.keys(errors3).length).toBe(2);
    expect(errors3.username.message).toBe(
      "Path `username` (`" +
        auth3.username +
        "`) is longer than the maximum allowed length (8)."
    );
    expect(errors3.password.message).toBe(
      "Path `password` (`" +
        auth3.password +
        "`) is longer than the maximum allowed length (128)."
    );
  });
});

describe("test DB interactions", () => {
  beforeAll(async () => {
    await connect(testMongoURL);
  });

  beforeEach(async () => {
    await Auth.deleteMany();
  });

  afterAll(async () => {
    await Auth.deleteMany();
    await connection.close();
  });

  test("can read and write", async () => {
    const auth = await Auth.create({
      username: "john",
      password: encrypt("secret"),
    });
    const auths = await Auth.find();

    expect(auths.length).toBe(1);
    expect(auths[0]._id).toStrictEqual(auth._id);
  });

  test("does not save to DB if validation failed", async () => {
    await Auth.create().catch(err => err);
    const auths = await Auth.find();

    expect(auths.length).toBe(0);
  });
});
