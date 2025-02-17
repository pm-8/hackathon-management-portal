import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

function Home() {
  const { isLoggedIn, username } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to Hackathon Portal</h1>
      {isLoggedIn && <h2 className="text-2xl mt-4">Hello {username} find a team <Link to="/users">here</Link></h2>}
    </div>
  )
}

export default Home