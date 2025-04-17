import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminConnectionsPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/connection/all');
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      console.log("hello")
      await axios.put(`http://localhost:5000/api/connection/update/${id}`, { status });
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === id ? { ...user, status } : user
        )
      );
    } catch (err) {
      console.error(`Failed to update status for user ${id}:`, err);
    }
  };

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Contact Submissions</h1>
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full table-auto divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map(user => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.message}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">
                  {user.status || 'pending'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 space-x-2">
                  <button
                    onClick={() => handleStatusUpdate(user._id, 'accepted')}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    disabled={user.status === 'accepted'}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(user._id, 'declined')}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    disabled={user.status === 'declined'}
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminConnectionsPage;
