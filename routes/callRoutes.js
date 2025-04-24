import express from "express";
const router = express.Router();

router.get("/create_link", (req, res) => {
  res.render("create_link");
});

export default router;
