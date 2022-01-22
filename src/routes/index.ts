// routes/index.ts
import { Router } from "express";
import { loginGet, login, home, logout } from "../controllers/authController";

const router = Router();

router.get("/", (req, res) => {
  res.redirect("/home");
});
router.get("/login", loginGet);
router.post("/login", login);
router.get("/home", home);
router.post("/logout", logout);

export default router;
