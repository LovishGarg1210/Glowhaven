import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dologout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="bg-[#3300d8] text-white shadow-md">
      <div className="flex items-center justify-between px-4 py-4 md:px-10">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <img src="/mark-white.png" alt="Logo" className="h-10 w-10 object-contain" />
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <nav
          className={`${
            isOpen ? 'block' : 'hidden'
          } absolute top-14 left-0 w-full bg-[#3300d8] px-4 pb-4 md:pb-0 md:static md:flex  md:items-center md:gap-6 md:w-auto md:bg-transparent`}
        >
          <Link to="/AdminPanel/" onClick={handleLinkClick} className="block mt-5 w-[20%]  mx-auto md:mt-0 hover:text-gray-300">
            Product
          </Link>
          <Link to="/AdminPanel/Connection" onClick={handleLinkClick} className="block mt-2 w-[20%] md:mr-3  mx-auto md:mt-0 hover:text-gray-300">
            Connections
          </Link>
          <Link to="/AdminPanel/settings" onClick={handleLinkClick} className="block mt-2 w-[20%]  mx-auto md:mt-0 hover:text-gray-300">
            Settings
          </Link>
          <button
            onClick={() => {
              handleLinkClick();
              dologout();
            }}
            className="mt-2 md:mt-0 bg-white text-[#3300d8] ml-34 md:ml-0 font-semibold px-4 py-1 rounded hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
