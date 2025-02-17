import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Home() {
  const { isLoggedIn, username } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to Hackathon Portal</h1>
      {isLoggedIn && (
        <h2 className="text-2xl mt-4">
          Hello {username}, find a team <Link to="/users" className="text-blue-500 underline">here</Link>
        </h2>
      )}
      
      <div className="mt-8 flex space-x-6">
        <Link to="/create-team" className="px-6 py-4 text-xl font-semibold bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700">
          Create Team
        </Link>
        <Link to="/join-team" className="px-6 py-4 text-xl font-semibold bg-green-600 text-white rounded-2xl shadow-lg hover:bg-green-700">
          Join Team
        </Link>
      </div>
    </div>
  );
}

export default Home;
