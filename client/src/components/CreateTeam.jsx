import React, { useEffect, useState } from 'react';
import UserFilter from './Users';

function CreateTeam() {
  const [teamName, setTeamName] = useState('');
  const [githubRepoUrl, setGithubRepoUrl] = useState('');
  const [showModal, setShowModal] = useState(false);

  const postName = async (e) => {
    e.preventDefault();
    console.log("Hit the button");
    try {
      localStorage.setItem('teamName', teamName);
      setShowModal(true);
    } catch (err) {
      console.error("Error in creating team name", err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex border border-gray-400 rounded-lg p-4 shadow-lg">
        <form onSubmit={postName} className="flex w-full space-x-4">
          <input
            type="text"
            className="flex-grow px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-green-400"
            placeholder="Enter Your Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
          <input
            type="text"
            className="flex-grow px-4 py-2 border border-gray-400 rounded-lg
            focus:ring-2 focus:ring-green-400"
            placeholder="Enter Your GitHub Repo URL"
            value={githubRepoUrl}
            onChange={(e) => setGithubRepoUrl(e.target.value)}
            required
          />
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Create
          </button>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] h-[400px] border border-gray-300 flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-center">Select Users</h2>
            <div className="w-full flex-grow overflow-auto px-4">
              <UserFilter />
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Close
            </button>
            {/* <button>Create</button> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateTeam;
