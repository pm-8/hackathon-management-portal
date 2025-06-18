const { json } = require("express");
const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
    teamName: {
        type: String,
        required: true,
    },
    teamMembers: {
        type: Array,
        required: true,
    },
    teamLeader: {
        type: String,
        required: true,
    },
    githubRepo: {
        type: String,
        required: true,
        default: "",
    },
    commits: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Commit'
        }
    ]
}, { timestamps: true });

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
