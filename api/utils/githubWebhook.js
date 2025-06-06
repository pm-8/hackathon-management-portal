const axios = require('axios');
const { act } = require('react');
const createWebhook =  async (repoUrl, teamId) => {
    const [owner,repo] = repoUrl.split('github.com/')[1].split('/');
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/hooks`;
    const webhookUrl = `${process.env.API_URL}/api/github-webhook/${teamId}`;
    try{
        const response = await axios.post(apiUrl, {
            name: 'web',
            active : true,
            events : ['push','pull_request'],
            config: {
                url: webhookUrl,
                content_type: 'json',
            },
        }, {
            headers:{
                Authorization: `token ${process.env.GITHUB_TOKEN}`,
                'User-Agent': 'Hackathon-API',
                Accept: 'application/vnd.github.v3+json',
            }
        })
        return response.data;
    }
    catch (error) {
        console.error('Error creating webhook:', error);
        throw new Error('Failed to create GitHub webhook');
    }

}
