const mongoose = require("mongoose");
const teamSchema = mongoose.Schema(
    {
        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
            required: true,
        },
        teamName: {
            type: String,
            required: true,
        },
        teamMembers:{
            type: Array,
            required: true,
        },
        teamLeader:{
            type: String,
            required: true,
        },
        githubRepo: {
            type: String,
            required: true,
            default: "",
        },
        commits: {
            type: Array,
            default: [],
        },
    }
)
const Team = mongoose.model("Team",teamSchema);
module.exports = Team;