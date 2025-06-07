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
    const commit = new Commit({
        teamId : teamId,
        commitId: payload.head_commit.id,
        commitMessage: payload.head_commit.message,
        committerName: payload.head_commit.author.name,
        committerEmail: payload.head_commit.author.email,
        commitUrl: payload.head_commit.url,
        committedAt: new Date(payload.head_commit.timestamp),
        repoUrl: payload.repository.html_url
    });
    try{
        await commit.save();
        console.log("Commit saved successfully:", commit);
        const team = await Team.findById(teamId);
        if (!team) {
            console.error("Team not found for ID:", teamId);
            return res.status(404).json({ error: 'Team not found' });
        }
        team.commits.push(commit._id);
        await team.save();
        console.log("Team updated with new commit:", team);
    }
    catch (error) {
        console.error('Error saving commit:', error);
        return res.status(500).json({ error: 'Failed to save commit' });
    }
    res.status(200).send('Webhook received'); 
};

module.exports = {
    linkRepo,
    githubWebhookHandler
};