import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Registration from './components/Registration'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './components/Home'
function App() {
  const [count, setCount] = useState(0)
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Registration />
    },
    {
      path: '/',
      element: <Home />
    }
  ])
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
