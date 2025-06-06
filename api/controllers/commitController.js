const express = require('express');
const githubWebhook = require('../utils/githubWebhook');
exports.linkRepo = async (req,res) => {
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
// module.exports = linkRepo