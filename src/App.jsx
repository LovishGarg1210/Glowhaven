import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Product from './Pages/Product';
import Footer from './Components/Footer';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Adminlogin from './Pages/Adminlogin';
import AdminPanel from './Pages/AdminPanel';
import ProtectedRoute from './Pages/ProtectedRoutes';
import usePageTracking from './usePageTracking';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Cart from './Pages/Cart';

const App = () => {
  usePageTracking();
  const location = useLocation();
  // normalize to lowercase
  const path = location.pathname.toLowerCase();
  const isAdmin = path.startsWith('/adminpanel');

  return (
    <div>
      {!isAdmin && <Navbar />}
   

      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Adminlogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Userlogin" element={<Login />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/adminpanel/*" element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!isAdmin && <Footer />}
    </div>
  );
};

export default App;
