import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-green-800 p-8 rounded-lg shadow-lg w-full max-w-md transform transition duration-300 hover:scale-105">
        <h2 className="text-3xl font-sans font-bold mb-6 text-center text-white tracking-wide">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-green-200 mb-2 font-sans">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-green-500 rounded-lg bg-green-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-green-200 mb-2 font-sans">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-green-500 rounded-lg bg-green-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg transition transform hover:-translate-y-1 hover:scale-105 duration-300 font-sans"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center font-sans">
          Don't have an account?{' '}
          <a
            href="/signup"
            className="text-green-300 hover:underline hover:text-green-200 transition duration-300"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
