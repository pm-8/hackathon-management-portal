import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Registration from './components/Registration'
import Users from './components/Users'
import JoinTeam from './components/JoinTeam'
import TeamDashboard from './components/TeamDashboard'
import Home from './components/Home'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import CreateTeam from './components/CreateTeam'
function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <><Navbar/><Login/></>
    },
    {
      path: '/register',
      element: <><Navbar/><Registration/></>
    },
    {
      path: '/',
      element: <><Navbar/><Home/></>
    },
    {
      path:'/users',
      element:<><Navbar/><Users/></>
    },
    {
      path:'/create-team',
      element:<><Navbar/><CreateTeam/></>
    },
    {
      path:'/join-team',
      element:<><Navbar/><JoinTeam/></>
    },
    {
      path:'/team-dashboard',
      element:<><Navbar/><TeamDashboard/></>
    }
  ])
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
