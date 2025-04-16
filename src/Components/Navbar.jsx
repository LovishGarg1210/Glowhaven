import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="p-4 flex flex-col md:flex-row items-center justify-between bg-[#eeeeee] relative">
      {/* Logo & Hamburger */}
      <div className="ms-0 mt-1 md:mt-0 md:ms-10 mb-2 md:mb-0 w-full md:w-auto flex justify-between items-center">
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
        } md:flex flex-col md:flex-row md:mr-79 md:justify-start  items-center gap-4 md:gap-7 text-xl text-[#3300d8] font-semibold`}
      >
        <Link to="/" onClick={handleLinkClick}>Home</Link>
        <Link to="/Product" onClick={handleLinkClick}>Products</Link>
        <Link to="/About" onClick={handleLinkClick}>About</Link>
        <Link to="/Contact" onClick={handleLinkClick}>Contact</Link>
        <Link to="/login" onClick={handleLinkClick}>Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
