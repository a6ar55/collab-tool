import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
            Collab the ultimate tool for seamless 
            <span className='bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text'>
                {" "} 
                Remote Collaboration
            </span>
        </h1>
        <p className="mt-10 text-lg text-center text-nuetral-500 max-w-4xl">
        Integrating essential tools like real-time document editing, live chat, video conferencing, task management, and version control, our platform ensures your team can work efficiently from anywhere.
        </p>
        <div className="flex justify-center my-10">
            <Link to='/login' className="bg-gradient-to-r from-blue-500 to-blue-800  px-5 py-3 rounded-md">Get Started</Link>
        </div>
    </div>
    
  )
}

export default Hero