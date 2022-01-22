// apis/authApi.ts
import { Response, Request } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { encrypt } from "../utils";
import Auth from "../models/auth";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const auth = await Auth.findOne({ username, password: encrypt(password) });
    if (auth === null) {
      return done(null, false);
    }
    return done(null, auth);
  })
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const auth = (await Auth.findById(id))!;
  const user = { id: auth._id.toString(), username: auth.username };
  return done(null, user);
});

export const loginApi = passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: "/home",
});

export const homeApi = (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  const { username } = req.user;
  return res.json({ username });
};

export const logoutApi = (req: Request, res: Response) => {
  req.logout();
  return res.redirect("/login");
};
