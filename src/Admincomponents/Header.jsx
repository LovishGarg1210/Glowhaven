import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-[#3300d8] text-white flex flex-col md:flex-row items-center justify-between px-4 py-4 md:px-10 shadow-md">
      {/* Logo and Title */}
      <div className="flex items-center space-x-4">
        <img src="/mark-white.png" alt="Logo" className="h-10 w-10 object-contain" />
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8 mt-4 md:mt-0 text-lg font-medium">
        <Link to="/admin" className="hover:text-gray-300">Dashboard</Link>
        <Link to="/admin/users" className="hover:text-gray-300">Users</Link>
        <Link to="/admin/settings" className="hover:text-gray-300">Settings</Link>
        <button
          onClick={() => {
            // add logout logic here
            console.log("Logging out...");
          }}
          className="bg-white text-[#3300d8] font-semibold px-4 py-1 rounded hover:bg-gray-200 transition"
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
