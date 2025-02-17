import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn, username, logout } = useContext(AuthContext);

  return (
    <nav className="bg-green-900 text-white py-4 px-6 flex justify-between items-center">
      <Link to = "/"><div className="text-2xl font-bold">Hackathon Portal</div></Link>
      <div className="flex items-center space-x-6"> 
        {isLoggedIn ? (
          <>
            <span className="font-semibold">{username}</span>
            <button
              onClick={logout}
              className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500 transition ml-4"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="bg-green-700 px-4 py-2 rounded-lg hover:bg-green-600">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-green-700 px-4 py-2 rounded-lg hover:bg-green-600">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
