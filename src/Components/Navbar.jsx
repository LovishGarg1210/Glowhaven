import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // optional
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="p-4 flex flex-col md:flex-row items-center justify-between bg-[#eeeeee] relative">
      {/* Logo & Hamburger */}
      <div className="ms-0 mt-1 md:mt-0 md:ms-10 mb-2 md:mb-0 w-1/2 md:w-[15%] flex justify-between items-center w-full md:w-auto">
        <img src="./logoColor.png" alt="Logo" className="h-10 object-contain" />
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Links */}
      <div
        className={`${
          isOpen ? 'flex' : 'hidden'
        } md:flex md:[50%] mx-auto text-center space-x-7 text-xl flex-col md:flex-row items-center md:item-start`}
      >
        <Link to="/" className="text-[#3300d8] font-semibold">Home</Link>
        <Link to="/Product" className="text-[#3300d8] font-semibold">Products</Link>
        <Link to="/About" className="text-[#3300d8] font-semibold">About</Link>
        <Link to="/Contact" className="text-[#3300d8] font-semibold">Contact</Link>
        <Link to="/login" className="text-[#3300d8] font-semibold">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
