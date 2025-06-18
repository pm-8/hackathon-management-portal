const express = require('express');
const Commit = require('../models/Commit');
const Team = require('../models/Team');
const githubWebhook = require('../utils/githubWebhook');
const linkRepo = async (req,res) => {
    const { repoUrl, teamId } = req.body;
    console.log("Request Body", req.body);
    if (!repoUrl || !teamId) {
        return res.status(400).json({ error: 'Repository URL and Team ID are required.' });
    }

    try {
        const webhookData = await githubWebhook.createWebhook(repoUrl, teamId);
        return res.status(200).json({ message: 'Webhook created successfully', data: webhookData });
    } catch (error) {
        console.error('Error creating webhook:', error);
        return res.status(500).json({ error: 'Failed to create GitHub webhook' });
    }
}
const githubWebhookHandler = async (req, res) => {
    const { teamId } = req.params;
    const eventType = req.headers['x-github-event'];
    const payload = req.body;
    console.log("Received GitHub webhook event:", eventType, "for team:", teamId);
    console.log("Payload:", payload);
    console.log(payload.commits[0].message);
    const commit = await Commit.create({
        teamId: teamId,
        commitId: payload.commits[0].id,
        repoUrl : payload.repository.html_url,
        commitMessage: payload.commits[0].message,
        committerName: payload.commits[0].committer.name,
        committerEmail: payload.commits[0].committer.email,
        commitUrl: payload.commits[0].url,
        committedAt: new Date(payload.commits[0].timestamp)
    });
    console.log("Commit saved:", commit);
    await Team.findByIdAndUpdate(
            teamId,
            { $push: { commits: commit._id } }
        );
    console.log("Team updated with new commit:", teamId);
    res.status(200).send('Webhook received'); 
};

module.exports = {
    linkRepo,
    githubWebhookHandler
};