const express = require('express');
const router = express.Router();
const cors = require("cors");
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
// const User = require('../models/User');
const Team = require('../models/Team');
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
    console.log("Request Body",req.body);
    try{
        const teamDoc = await Team.create({
            teamName : req.body.teamname,
            teamMembers: req.body.teamUsers,
            teamLeader: req.body.teamUsers[0].name
        });
        res.send(teamDoc);
    }
    catch(err){
        console.error("Error in creating team",err);
        res.status(400).json(err);
    }
})
router.get('/teams', async (req,res) => {
    try{
        const teamDoc = await Team.find();
        res.send(teamDoc);
    }
    catch(err){
        console.error("Error in fetching teams",err);
        res.status(400).json(err);
    }
}
)
module.exports = router;