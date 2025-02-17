// src/context/AuthContext.js
import React, { createContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
// const navigate = useNavigate();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("isLoggedIn"));
  const [username, setUsername] = useState(localStorage.getItem("username") || "");

  const login = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("Username", username);
  };

  const logout = () => {
    // navigate("/");
    setIsLoggedIn(false);
    setUsername("");
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};