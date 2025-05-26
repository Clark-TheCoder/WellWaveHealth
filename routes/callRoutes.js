import express from "express";
import {
  createLink,
  changeCallStatus,
  fetchCurrentCalls,
  addCallNotes,
} from "../controllers/callController.js";
import authenticateToken from "../middleware/authenticateToken.js";
import { get } from "http";
const router = express.Router();

router.get("/create_link", (req, res) => {
  res.render("create_link");
});

router.post("/create_link", authenticateToken, createLink);

router.get("/visit_summary", (req, res) => {
  res.render("visit_summary");
});

router.patch("/visit_summary", authenticateToken, addCallNotes);

router.get("/scheduled_calls", (req, res) => {
  res.render("scheduled_calls");
});

router.get("/scheduled_calls/loadCalls", authenticateToken, fetchCurrentCalls);

router.patch("/change_call_status", authenticateToken, changeCallStatus);

export default router;
