import express from "express";
import {
  createLink,
  changeCallStatus,
  fetchCurrentCalls,
  addCallNotes,
  fetchPastCalls,
  joinCallAsDoctor,
  getCallNotes,
  validatePatientToken,
} from "../controllers/callController.js";
import authenticateToken from "../middleware/authenticateToken.js";
import { get } from "http";
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
router.post("/visit_summary", authenticateToken, getCallNotes);

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

//join call routes
router.post("/join/doctor", authenticateToken, joinCallAsDoctor);
// router.get("/join/:access_token", (req, res) => {
//   const accessToken = req.params.access_token;

//   // For now, no validation — just render the EJS file
//   res.render("patient_call_view", { accessToken });
// });

router.get("/join/:access_token", validatePatientToken);

//doctor call view
router.get("/doctor_call_view", (req, res) => {
  res.render("doctor_call_view");
});

export default router;
