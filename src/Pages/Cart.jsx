import React, { useEffect, useState } from 'react';
// import Navbar from '../Components/Navbar';
import { IoTrashBin } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });

  // Fetch Cart Data
  const fetchCartData = async () => {
    const user = JSON.parse(localStorage.getItem('User'));
    if (user?.email) {
      try {
        const res = await fetch('https://glowhavenbackend.onrender.com/api/Getcart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: user.email }),
        });
        const data = await res.json();
        const cart = data.cart || [];
        setCartItems(cart);
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
      } catch (err) {
        console.error('Cart fetch error:', err);
      }
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleDelete = async (productId) => {
    const user = JSON.parse(localStorage.getItem('User'));
    if (!user?.email) return;

    try {
      const res = await fetch('https://glowhavenbackend.onrender.com/api/Removecartitem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email, productId }),
      });

      if (res.ok) {
        fetchCartData(); // Refetch after deletion
      } else {
        console.error("Failed to delete item from cart");
      }
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return; // Don't allow negative or zero quantities

    const user = JSON.parse(localStorage.getItem('User'));
    if (!user?.email) return;

    try {
      // Send API request to update the quantity
      const res = await fetch('https://glowhavenbackend.onrender.com/api/updateCartQuantity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email, productId, quantity }),
      });

      if (res.ok) {
        fetchCartData(); // Refetch after updating quantity to reflect the updated cart
      } else {
        console.error("Failed to update quantity");
      }
    } catch (err) {
      console.error("Quantity update error:", err);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    const { name, address, city, zip, country } = shippingInfo;

    if (!name || !address || !city || !zip || !country) {
      alert("Please fill in all shipping fields before proceeding.");
      return;
    }

    const user = JSON.parse(localStorage.getItem('User'));
    if (!user?.email) {
      alert("User not logged in.");
      return;
    }

    const orderPayload = {
      email: user.email,
      cartItems,
      totalPrice,
      shippingInfo,
    };

    try {
      const response = await fetch('https://glowhavenbackend.onrender.com/api/placeorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      if (response.ok) {
        alert("Order placed successfully!");
        setShippingInfo({
          name: '',
          address: '',
          city: '',
          zip: '',
          country: '',
        });
        setCartItems([]);
        setTotalPrice(0);
        navigate("/")
      } else {
        alert("Failed to place order. Try again.");
      }
    } catch (err) {
      console.error("Order submission failed:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* 🛒 Cart Items */}
          <div className="md:col-span-2 bg-white shadow-xl rounded-2xl p-6 overflow-x-auto">
            <h2 className="text-3xl font-bold text-purple-800 mb-6 border-b pb-2">Your Cart</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty. Go grab something!</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="text-left text-gray-700 uppercase text-sm font-semibold">
                    <th className="py-3">Image</th>
                  
                    <th className="py-3">Quantity</th>
                    <th className="py-3">Price</th>
                    <th className="py-3 text-center">Remove</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {cartItems.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="py-4">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-md shadow"
                        />
                      </td>
                     
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 font-semibold">Rs.{(item.price * item.quantity).toFixed(2)}</td>
                      <td className="py-4 text-center">
                        <button
                          onClick={() => handleDelete(item.productId)}
                          className="text-red-500 hover:text-red-700 transition"
                          title="Remove item"
                        >
                          <IoTrashBin className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* 💳 Summary & Shipping */}
          <div className="bg-white shadow-xl rounded-2xl p-6 sticky top-24 h-fit space-y-6">
            {/* Summary */}
            <div>
              <h2 className="text-2xl font-bold text-purple-800 mb-4">Cart Summary</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Total Items:</span>
                  <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-800">
                  <span>Total Price:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Form */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Shipping Address</h3>
              <form className="space-y-3">
                <input
                  type="text"
                  name="name"
                  value={shippingInfo.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full border border-gray-300 p-2 rounded focus:ring-purple-400 focus:border-purple-400"
                />
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  placeholder="Street Address"
                  className="w-full border border-gray-300 p-2 rounded focus:ring-purple-400 focus:border-purple-400"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-1/2 border border-gray-300 p-2 rounded focus:ring-purple-400 focus:border-purple-400"
                  />
                  <input
                    type="text"
                    name="zip"
                    value={shippingInfo.zip}
                    onChange={handleInputChange}
                    placeholder="ZIP Code"
                    className="w-1/2 border border-gray-300 p-2 rounded focus:ring-purple-400 focus:border-purple-400"
                  />
                </div>
                <input
                  type="text"
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleInputChange}
                  placeholder="Country"
                  className="w-full border border-gray-300 p-2 rounded focus:ring-purple-400 focus:border-purple-400"
                />
              </form>
            </div>

            {/* Payment */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Payment Method</h3>
              <select className="w-full border border-gray-300 p-2 rounded focus:ring-purple-400 focus:border-purple-400">
                <option value="">Select Payment Method</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>

            <button
              className="w-full bg-purple-600 hover:bg-purple-700 transition duration-200 text-white font-semibold py-3 rounded shadow-md"
              onClick={handlePayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;