import React from 'react';

const Contact = () => {
  return (
    <div className="px-6 md:px-20 py-20">
      <div className="mb-6">
        <h1 className="text-3xl md:text-5xl md:w-[40%] font-bold text-[#3300ff]">
          Something on your mind? Tell us.
        </h1>
      </div>

      <div className="flex flex-col space-y-4 max-w-xl">
        {/* Inputs stack on small screens, side-by-side on medium and up */}
        <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
          <input
            type="text"
            placeholder="Full name"
            className="border border-gray-300 w-full md:w-[45%] placeholder-[#3300ff] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3300ff]"
          />
          <input
            type="email"
            placeholder="Email address"
            className="border border-gray-300 w-full md:w-[45%] placeholder-[#3300ff] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3300ff]"
          />
        </div>

        <textarea
          placeholder="Your message..."
          rows="5"
          className="border border-gray-300 md:md:w-[93%] w-full placeholder-[#3300ff] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3300ff]"
        ></textarea>

        <button className="bg-[#3300ff] w-full md:w-[20%] text-white font-semibold px-6 py-2 rounded hover:bg-blue-800 transition">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Contact;
