// scripts/initUser.ts
import { connect, connection } from "mongoose";
import { mongoURL, encrypt } from "../src/utils";
import Auth from "../src/models/auth";

run();

async function run() {
  await connect(mongoURL);
  await initUser();
  await connection.close();
}

async function initUser() {
  const auths = await initAuth();
  console.log(`Initialized ${auths.length} credentials!`);
}

async function initAuth(): Promise<Auth[]> {
  const data: [string, string][] = [["john", "secret"]];

  await Auth.deleteMany();
  const auths = await Promise.all(
    data.map(arr =>
      Auth.create({ username: arr[0], password: encrypt(arr[1]) })
    )
  );
  return auths;
}
