import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: null
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products/Get');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    try {
      if (selectedProduct) {
        await axios.put(`http://localhost:5000/api/products/update/${selectedProduct._id}`, data);
      } else {
        await axios.post('http://localhost:5000/api/products/post', data);
      }
      setSelectedProduct(null);
      setFormData({ name: '', price: '', category: '', description: '', image: null });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = product => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      image: null
    });
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/Delete/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setSelectedProduct(null);
    setFormData({ name: '', price: '', category: '', description: '', image: null });
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6">
      <div className="md:w-2/3 bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map(product => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                    <button onClick={() => handleEdit(product)} className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500">Edit</button>
                    <button onClick={() => handleDelete(product._id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:w-1/3 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">{selectedProduct ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['name', 'price', 'category', 'description'].map(field => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize mb-1">{field}</label>
              {field === 'description' ? (
                <textarea
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <input
                  type={field === 'price' ? 'number' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required={field === 'name' || field === 'price'}
                />
              )}
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 capitalize mb-1">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex space-x-2">
            <button type="submit" className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
              {selectedProduct ? 'Update' : 'Add'}
            </button>
            {selectedProduct && (
              <button type="button" onClick={handleCancel} className="flex-1 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductsPage;
