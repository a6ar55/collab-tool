import React from 'react';
import logo from "../assets/github-logo.png";
import { dashItems } from "../constants";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSelector } from 'react-redux';

function NavDash() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const currentUser = useSelector(state => state.user);
  console.log("being loaded");
  console.log(currentUser);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
        <div className="container px-4 mx-auto relative lg:text-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center flex-shrink-0">
              <img className="h-10 w-10 mr-2" src={logo} alt="logo" />
              <span className="text-xl tracking-tight">Collab</span>
            </div>
            <ul className="hidden lg:flex ml-14 space-x-12">
              {dashItems.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="text-gray-300 hover:text-white transition-colors duration-200">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="hidden lg:flex justify-right space-x-12 items-center">
              <a href="#">
                <img className="h-10 w-10 rounded-full border-2 border-gray-700 hover:border-gray-500 transition-all duration-200"
                  src={currentUser.profilePicture} // Ensure this points to the correct URL
                  alt="Profile"
                  onError={(e) => { e.target.src = 'fallback-image-url.jpg'; }} // Replace with fallback image URL or handle error
                />
              </a>
            </div>
            <div className="lg:hidden md:flex flex-col justify-end">
              <button onClick={toggleNavbar} className="focus:outline-none">
                {mobileDrawerOpen ? <X className="h-6 w-6 text-gray-300" /> : <Menu className="h-6 w-6 text-gray-300" />}
              </button>
            </div>
          </div>
          {mobileDrawerOpen && (
            <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
              <ul>
                {dashItems.map((item, index) => (
                  <li key={index} className="py-4">
                    <a href={item.href} className="text-gray-300 hover:text-white transition-colors duration-200">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className='flex space-x-6'>
                <a
                  href="/profile"
                  className="py-2 px-3 rounded-md text-gray-300 hover:text-white transition-colors duration-200"
                >
                  User Settings
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavDash;
