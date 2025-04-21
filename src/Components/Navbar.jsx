import React, { useState, useEffect } from 'react';
import { Menu, X, UserCircle, ShoppingCart, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('User'));
    if (storedUser?.email) {
      setUser(storedUser);
    }
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('User');
    setUser(null);
    setDropdownOpen(false);
    navigate('/'); // redirect to home or login page
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
        } md:flex flex-col md:flex-row md:mr-10 md:justify-start items-center gap-4 md:gap-7 text-xl text-[#3300d8] font-semibold relative`}
      >
        <Link to="/" onClick={handleLinkClick}>Home</Link>
        <Link to="/Product" onClick={handleLinkClick}>Products</Link>
        <Link to="/About" onClick={handleLinkClick}>About</Link>
        <Link to="/Contact" onClick={handleLinkClick}>Contact</Link>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-[#3300d8]"
            >
              <UserCircle size={28} />
              <ChevronDown size={16} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">{user.email}</div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/Userlogin" onClick={handleLinkClick}>Login</Link>
            <Link to="/register" onClick={handleLinkClick}>Register</Link>
          
          </>
        )}

        {/* Cart Icon */}
        <Link to="/cart" onClick={handleLinkClick}>
          <ShoppingCart size={28} className="text-[#3300d8]" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
