// apis/authApi.spec.ts
import express from "express";
import { connect, connection } from "mongoose";
import session from "express-session";
import passport from "passport";
import request from "supertest";
import { testMongoURL, encrypt } from "../utils";
import Auth from "../models/auth";
import { loginApi, homeApi, logoutApi } from "./authApi";

describe("test auth APIs", () => {
  const app = express();
  app.use(express.json());
  app.use(
    session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.post("/login", loginApi);
  app.get("/home", homeApi);
  app.post("/logout", logoutApi);

  beforeAll(async () => {
    await connect(testMongoURL);
  });

  beforeEach(async () => {
    await Auth.deleteMany();
    await Auth.create({ username: "john", password: encrypt("secret") });
  });

  afterAll(async () => {
    await Auth.deleteMany();
    await connection.close();
  });

  test("POST /login", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "john", password: "secret" });

    expect(res.status).toBe(302);
    expect(res.text).toBe("Found. Redirecting to /home");

    const res2 = await request(app).post("/login");

    expect(res2.status).toBe(302);
    expect(res2.text).toBe("Found. Redirecting to /login");

    const res3 = await request(app)
      .post("/login")
      .send({ username: "admin", password: "badpass" });

    expect(res3.status).toBe(302);
    expect(res3.text).toBe("Found. Redirecting to /login");
  });

  test("GET /home", async () => {
    const agent = request.agent(app);
    const res = await agent.get("/home");

    expect(res.status).toBe(302);
    expect(res.text).toBe("Found. Redirecting to /login");

    await agent.post("/login").send({ username: "john", password: "secret" });
    const res2 = await agent.get("/home");

    expect(res2.status).toBe(200);
    expect(res2.body.username).toBe("john");
  });

  test("POST /logout", async () => {
    const agent = request.agent(app);
    await agent.post("/login").send({ username: "john", password: "secret" });
    const res = await agent.get("/home");

    expect(res.status).toBe(200);
    expect(res.body.username).toBe("john");

    const res2 = await agent.post("/logout");

    expect(res2.status).toBe(302);
    expect(res2.text).toBe("Found. Redirecting to /login");

    const res3 = await agent.get("/home");

    expect(res3.status).toBe(302);
    expect(res3.text).toBe("Found. Redirecting to /login");
  });
});
