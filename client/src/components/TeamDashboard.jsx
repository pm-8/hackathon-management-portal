import React, { useEffect, useState } from 'react';

function TeamDashboard() {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const teamName = localStorage.getItem('teamName');

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/team/teams/${teamName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch team data');
        }
        const data = await response.json();
        setTeamData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (loading) fetchTeamData();
  }, [teamName]);

  if (loading) return <p className="text-center text-lg mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-6">Team Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Team Name:</h2>
        <p className="text-gray-700">{teamData.team.teamName}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Team Leader:</h3>
        <p className="text-gray-700">{teamData.team.teamLeader}</p>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold">Team Members:</h4>
        <ul className="list-disc list-inside text-gray-700">
          {teamData.team.teamMembers?.map((member, index) => (
            <li key={index}>{member.name}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold">GitHub Repository:</h4>
        <p className="text-blue-600 underline break-words">{teamData.githubRepo}</p>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-2">Commits:</h4>
        <ul className="space-y-2">
          {teamData.commits?.map((commit, index) => (
            <li
              key={index}
              className="p-3 bg-gray-100 rounded-lg shadow-sm border border-gray-200"
            >
              <p className="text-gray-800 font-medium">{commit.commitMessage}</p>
              <p className="text-sm text-gray-500">
                {new Date(commit.createdAt).toLocaleDateString()} — {commit.committerName}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TeamDashboard;