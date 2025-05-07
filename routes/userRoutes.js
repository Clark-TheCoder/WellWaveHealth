import express from "express";
const router = express.Router();
import authenticateToken from "../middleware/authenticateToken.js";
import { updateUserProfile } from "../controllers/userController.js";

router.get("/edit_user_details", (req, res) => {
  res.render("edit_user_details");
});

router.patch("/edit_user_details", authenticateToken, updateUserProfile);

export default router;
