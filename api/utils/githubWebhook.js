const axios = require('axios');

exports.createWebhook = async (repoUrl, teamId) => {
  let [owner, repo] = repoUrl
    .split('github.com/')[1]
    .replace('.git', '')
    .replace(/\/$/, '')
    .split('/');

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/hooks`;
  const webhookUrl = `${process.env.API_URL}/api/github-webhook/${teamId}`;
    console.log("Webhook URL:", webhookUrl);
    console.log('Loaded GitHub token:', process.env.GITHUB_TOKEN ? 'Yes' : 'No');

  try {
    const response = await axios.post(
      apiUrl,
      {
        name: 'web',
        active: true,
        events: ['push', 'pull_request'],
        config: {
          url: webhookUrl,
          content_type: 'json',
        },
      },
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          'User-Agent': 'Hackathon-API',
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("GitHub error:", error.response.data);
    } else {
      console.error("Unexpected error:", error.message);
    }
    throw new Error('Failed to create GitHub webhook');
  }
};
