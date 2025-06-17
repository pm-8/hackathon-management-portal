import React, { useState, useEffect } from "react";
import { use } from "react";

const UserFilter = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [githubURL, setGithubURL] = useState('');
  const [teamname, setTeamName] = useState();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [teamUsers, setTeamUsers] = useState([]);
  const handle = (id,name,checkbox) => {
    if(checkbox.checked && !teamUsers.some(user => user.id === id)) {
    setTeamUsers([...teamUsers, {id,name}]);
    console.log({id,name});
    console.log("Added");
    }
    if(!checkbox.checked && teamUsers.some(user => user.id === id)) {
      setTeamUsers(teamUsers.filter(user => user.id !== id));
      console.log("Removed");
    }
    teamUsers.forEach(element => {
      console.log(element.name);
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTeamName(localStorage.getItem("teamName"));
    // console.log("hekhakhf",teamname);
    try{
      const response = await fetch("http://localhost:3000/team/create-team",{
        method:"POST",
        body:JSON.stringify({teamname,teamUsers,githubURL}),
        headers:{"Content-Type":"application/json"}
      });
    }
    catch(err){
      console.error("Error in creating team name",err);
    }
  }
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/users");
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const searchQuery = e.target.value.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchQuery) ||
        user.email.toLowerCase().includes(searchQuery)
    );

    setFilteredUsers(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* User List */}
      <div className="w-full max-w-md bg-white mt-4 rounded-lg shadow-md p-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user._id} className="flex items-center justify-between p-2 border-b border-gray-300">
              <div>
                <p className="text-lg font-semibold">{user.fullName}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <input
                type="checkbox"
                className="w-6 h-6 border-2 border-gray-400 rounded-full checked:bg-green-400 focus:outline-none"
                onChange={(e) => handle(user._id, user.fullName, e.target)}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No users found</p>
        )}
      </div>

      {/* Create Button (Moved Below the User List) */}
      <input
            type="text"
            className="flex-grow px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-green-400"
            placeholder="Enter Your GitHub Repo URL"
            value={githubURL}
            onChange={(e) => setGithubURL(e.target.value)}
            required
      />
      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
      >
        Create Team
      </button>
    </div>
  );
};

export default UserFilter;
