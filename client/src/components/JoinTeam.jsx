import React, { useState, useEffect } from "react";

function JoinTeam() {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});
  useEffect(()=>{
    const fetchTeam = async()=>{
      try{
        const res = await fetch("http://localhost:3000/team/teams")
        const data = await res.json()
        setTeams(data)
        }catch(err){
          console.error("Error fetching teams:", err);
        }
    }
    fetchTeam()
  },[]);
  const joinTeam = async (teamId) => {
      setUserId(localStorage.getItem("id"));
      setUser(localStorage.getItem("username"));
    try {
      console.log("Joining team");
      const res = await fetch(`http://localhost:3000/team/join-team/${teamId}/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error("Error joining team:", err);
    }
  }
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Join a Team</h1>
      <input
        type="text"
        placeholder="Search Team"
        className="w-full max-w-md p-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="w-full max-w-lg">
        {teams
          .filter((team) =>
            searchTerm === "" ||
            team.teamName.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((team) => (
            <li
              key={team._id}
              className="bg-white p-4 mb-4 rounded-lg shadow-md flex justify-between items-center hover:shadow-lg transition"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-700">{team.teamName}</h2>
                <p className="text-gray-500">Leader: {team.teamLeader}</p>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" onClick={() => joinTeam(team._id)}>
                Join
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default JoinTeam;