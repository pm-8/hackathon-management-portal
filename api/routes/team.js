const express = require('express');
const router = express.Router();
const cors = require("cors");
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));

router.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
router.use(express.json());
router.post('/create-team', async (req,res) => {
    console.log("Hit the server");
    const teamName = req.body.teamName;
    console.log(teamName);
    res.send(req.body);
})
module.exports = router;