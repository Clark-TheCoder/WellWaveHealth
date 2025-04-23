import express, { application } from "express";
import { createUser, authenicateUser } from "../controllers/userController.js";
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", authenicateUser);

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", createUser);

export default router;
