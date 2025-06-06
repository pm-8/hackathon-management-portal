const mongoose = require('mongoose');
const commitSchema = mongoose.Schema({
    commitId: {
        type: String,
        required: true,
    },
    commitMessage: {
        type: String,
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    authorEmail: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    filesChanged: {
        type: Array,
        default: []
    }
});

const Commit = mongoose.model('Commit', commitSchema);
module.exports = Commit;