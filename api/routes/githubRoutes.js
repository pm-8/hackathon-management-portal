const express = require("express");
const router = express.Router();
const cors = require("cors");
const  commitController = require("../controllers/commitController");

router.use(
  cors({
    origin: "http://localhost:5173", // Allow your frontend origin
    credentials: true, // Allow credentials (cookies)
  })
);
router.use(express.json());
router.post("/github-webhook/:teamId",commitController.linkRepo)
module.exports = router;

