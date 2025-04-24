import express from "express";
import { createLink } from "../controllers/callController.js";
const router = express.Router();

router.get("/create_link", (req, res) => {
  res.render("create_link");
});

router.post("/create_link", createLink);

router.get("/edit_call_details", (req, res) => {
  res.render("edit_call_details");
});

export default router;
