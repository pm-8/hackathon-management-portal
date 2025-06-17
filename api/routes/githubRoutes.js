const express = require("express");
const router = express.Router();
const cors = require("cors");
const {linkRepo, githubWebhookHandler} = require("../controllers/commitController");
router.use(
  cors({
    origin: "http://localhost:5173", // Allow your frontend origin
    credentials: true, // Allow credentials (cookies)
  })
);
router.use(express.json());
router.post("/linkRepo",linkRepo)
router.post("/github-webhook/:teamId", githubWebhookHandler);
module.exports = router;

