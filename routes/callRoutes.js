import express from "express";
import {
  createLink,
  changeCallStatus,
  fetchCurrentCalls,
  addCallNotes,
  fetchPastCalls,
} from "../controllers/callController.js";
import authenticateToken from "../middleware/authenticateToken.js";
import { get } from "http";
import { updateCallStatus } from "../models/callModel.js";
const router = express.Router();

//create link routes
router.get("/create_link", (req, res) => {
  res.render("create_link");
});
router.post("/create_link", authenticateToken, createLink);

//visit summary routes
router.get("/visit_summary", (req, res) => {
  res.render("visit_summary");
});
router.patch("/visit_summary", authenticateToken, addCallNotes);

//scheduled calls routes
router.get("/scheduled_calls", (req, res) => {
  res.render("scheduled_calls");
});
router.get("/scheduled_calls/loadCalls", authenticateToken, fetchCurrentCalls);

//call history routes
router.get("/call_history", (req, res) => {
  res.render("call_history");
});
router.post("/call_history", authenticateToken, fetchPastCalls);

router.patch("/change_call_status", authenticateToken, changeCallStatus);

export default router;
