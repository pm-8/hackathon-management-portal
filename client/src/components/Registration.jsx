import React, { useState } from 'react';

const Registration = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:3000/auth/register',{
        method : "POST",
        body : JSON.stringify({fullName,email,password}),
        headers : {'Content-Type':'application/json'}        
      })
      // localStorage.setItem("isRegistered",true);
      const data = await response.json()
      console.log(data);
      if(response.ok) console.log('Registration Successful');
      // navigate("/login");
    }
    catch(err){
      console.log('Regsitration Failed. Coder Chutiya hai')
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-green-800 p-6 rounded-lg shadow-lg w-full max-w-md z-10">
        <h2 className="text-3xl font-serif font-bold mb-6 text-center text-white tracking-wider">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-green-200 mb-2 font-serif">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full px-4 py-2 border border-green-500 rounded-lg bg-green-700 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-green-200 mb-2 font-serif">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-green-500 rounded-lg bg-green-700 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-green-200 mb-2 font-serif">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-green-500 rounded-lg bg-green-700 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-green-200 mb-2 font-serif">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 border border-green-500 rounded-lg bg-green-700 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg transition transform hover:-translate-y-1 hover:scale-105 duration-300 font-serif"
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center font-serif">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-green-300 hover:underline hover:text-green-200 transition duration-300"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
