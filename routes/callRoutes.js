import express from "express";
import { createLink, contactPatient } from "../controllers/callController.js";
import authenticateToken from "../middleware/authenticateToken.js";
const router = express.Router();

router.get("/create_link", (req, res) => {
  res.render("create_link");
});

router.post("/create_link", authenticateToken, createLink);

router.get("/edit_call_details", (req, res) => {
  res.render("edit_call_details");
});

router.post("/contact_patient", authenticateToken, contactPatient);

export default router;
