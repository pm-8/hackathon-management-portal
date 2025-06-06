const express = require('express');
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

    console.log("✅ Received GitHub webhook");
    console.log("📦 Team ID:", teamId);
    console.log("📨 Event Type:", eventType);
    console.log("🔍 Payload:", JSON.stringify(payload, null, 2));
    res.status(200).send("Webhook received");
};

module.exports = {
    linkRepo,
    githubWebhookHandler
};