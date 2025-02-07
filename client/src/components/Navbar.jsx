import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-green-900 text-white py-4 px-6 flex justify-between items-center">
      <div className="text-2xl font-bold">Hackathon Portal</div>
      <div className="flex space-x-4">
        <button className="bg-green-700 px-4 py-2 rounded-lg hover:bg-green-600">Login</button>
        <button className="bg-green-700 px-4 py-2 rounded-lg hover:bg-green-600">Register</button>
      </div>
    </nav>
  );
};

export default Navbar;
