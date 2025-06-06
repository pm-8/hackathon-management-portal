const mongoose = require('mongoose');

const commitSchema = mongoose.Schema({
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  repoUrl: {
    type: String,
    required: true
  },
  commitMessage: {
    type: String,
    required: true
  },
  committerName: {
    type: String,
    required: true
  },
  committerEmail: {
    type: String
  },
  commitUrl: {
    type: String
  },
  committedAt: {
    type: Date,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Commit', commitSchema);
