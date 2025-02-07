import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Registration from './components/Registration'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)
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
      element: <><Navbar/><div>HORNY</div></>
    }
  ])
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
