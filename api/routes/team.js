const express = require('express');
const router = express.Router();
const cors = require("cors");
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const Team = require('../models/Team');
const createWebhook = require('../utils/githubWebhook').createWebhook;
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
            teamLeader: req.body.teamUsers[0].name,
            githubRepo: req.body.githubURL,
        });

        // Call /api/linkRepo to create webhook
        const axios = require('axios');
        try {
            const webhookRes = await axios.post(
                `${process.env.API_URL}/api/linkRepo`,
                {
                    repoUrl: req.body.githubURL,
                    teamId: teamDoc._id
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log('Webhook created:', webhookRes.data);
        } catch (webhookErr) {
            console.error('Failed to create webhook:', webhookErr.response ? webhookErr.response.data : webhookErr.message);
        }

        res.send(teamDoc);
    }
    catch(err){
        console.error("Error in creating team",err);
        res.status(400).json(err);
    }
})
router.post('/join-team/:teamId/:userId', async (req, res) => {
    try {
        // console.log(req.body);
        console.log("Request Body",req.params);
        const teamDoc = await Team.findById(req.params.teamId);
        const user = await User.findById(req.params.userId);
        console.log("Team Doc",teamDoc);
        if (!teamDoc) {
            console.log("Team not found");
            return res.status(404).json({ error: "Team not found" });
        }
        if(user){
            teamDoc.teamMembers.push({id:user._id,name:user.fullName});
            await teamDoc.save(); // Save changes
        }
        res.send(teamDoc);
    } catch (err) {
        console.error("Error in joining team", err);
        res.status(400).json(err);
    }
});

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