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
        <nav
        className={`flex flex-col md:flex-row items-center md:justify-end gap-4 px-4 pb-4 md:pb-0  md:px-10 text-lg font-medium transition-all duration-300 ease-in-out ${
          isOpen ? 'block' : 'hidden md:flex'
        }`}
      >
        <Link to="/AdminPanel/" onClick={handleLinkClick} className="hover:text-gray-300">Product</Link>
        <Link to="/AdminPanel/Connection" onClick={handleLinkClick} className="hover:text-gray-300">Connections</Link>
        <Link to="/AdminPanel/settings" onClick={handleLinkClick} className="hover:text-gray-300">Settings</Link>
        <button
          onClick={() => {
            handleLinkClick();
            dologout();
          }}
          className="bg-white text-[#3300d8] font-semibold px-4 py-1 rounded hover:bg-gray-200 transition"
        >
          Logout
        </button>
      </nav>
      </div>

      {/* Navigation Links */}
    
    </header>
  );
};

export default Header;
