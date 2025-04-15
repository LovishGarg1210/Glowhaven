import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#3300d8] text-white">
      <div className="text-center py-8">
        <p className="text-lg">© 2023 Glow Haven. All rights reserved.</p>
      </div>

      <div className="flex flex-col md:flex-row justify-center ms-7 md:ms-0 md:items-center space-y-4 md:space-y-0 md:space-x-8 pb-8">
        <div className="flex items-center">
          <img src="./mark-white.png" alt="Logo" className="h-10 object-contain mr-2" />
          <a href="#" className="text-xl hover:text-gray-300">Glowheavenbypallavi</a>
        </div>

        <div className="flex items-center">
          <img src="./icon-fb.png" alt="Facebook" className="w-7 mr-2" />
          <a href="#" className="text-xl hover:text-gray-300">Glowheavenbypallavi</a>
        </div>

        <div className="flex items-center">
          <img src="./icon-insta.png" alt="Instagram" className="w-6 mr-2" />
          <a href="#" className="text-xl hover:text-gray-300">Glowheavenbypallavi</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
