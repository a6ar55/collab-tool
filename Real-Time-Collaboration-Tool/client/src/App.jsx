import React, { Children } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeatureSection from './components/FeatureSection'
import Footer from './components/Footer'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'

import { createBrowserRouter,RouterProvider } from "react-router-dom"

const Root = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <Hero />
        <FeatureSection />
        <Footer />
      </div>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      // Define other routes here if needed
    ],
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App