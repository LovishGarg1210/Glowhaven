import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      // Update the URL to your backend connection page endpoint
      const res = await axios.post('http://localhost:5000/api/connection/add', formData);
      setStatus('Message sent successfully!');
      setFormData({ fullName: '', email: '', message: '' });
    } catch (err) {
      setStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="px-6 md:px-20 py-20">
      <div className="mb-6">
        <h1 className="text-3xl md:text-5xl md:w-[40%] font-bold text-[#3300ff]">
          Something on your mind? Tell us.
        </h1>
      </div>

      {/* Display Status Message */}
      {status && <p className="mb-4 text-green-600 font-medium">{status}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-xl">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <input
            type="text"
            name="fullName"
            placeholder="Full name"
            value={formData.fullName}
            onChange={handleChange}
            className="border border-gray-300 w-full md:w-[45%] placeholder-[#3300ff] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3300ff]"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 w-full md:w-[45%] placeholder-[#3300ff] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3300ff]"
            required
          />
        </div>

        <textarea
          name="message"
          placeholder="Your message..."
          rows="5"
          value={formData.message}
          onChange={handleChange}
          className="border border-gray-300 md:w-[93%] w-full placeholder-[#3300ff] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3300ff]"
          required
        ></textarea>

        <button
          type="submit"
          className="bg-[#3300ff] w-full md:w-[20%] text-white font-semibold px-6 py-2 rounded hover:bg-blue-800 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
