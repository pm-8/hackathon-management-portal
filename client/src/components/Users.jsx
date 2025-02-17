import React, { useState, useEffect } from "react";

const UserFilter = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

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
      <h1 className="text-3xl font-bold mb-4">Find Users</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full max-w-md px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-green-400"
      />

      {/* User List */}
      <div className="w-full max-w-md bg-white mt-4 rounded-lg shadow-md p-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user._id} className="p-2 border-b border-gray-300">
              <p className="text-lg font-semibold">{user.fullName}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No users found</p>
        )}
      </div>
    </div>
  );
};

export default UserFilter;
