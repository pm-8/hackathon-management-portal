const mongoose = require("mongoose");
const teamSchema = mongoose.Schema(
    {
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
        }
    }
)
const Team = mongoose.model("Team",teamSchema);
module.exports = Team;