import express from "express";
import { createLink } from "../controllers/callController.js";
import authenticateToken from "../middleware/authenticateToken.js";
const router = express.Router();

router.get("/create_link", (req, res) => {
  res.render("create_link");
});

router.post("/create_link", authenticateToken, createLink);

router.get("/visit_summary", (req, res) => {
  res.render("visit_summary");
});

export default router;
