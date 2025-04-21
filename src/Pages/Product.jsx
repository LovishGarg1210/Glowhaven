import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from 'framer-motion';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const Product = () => {
  const [products, setProducts] = useState([]);
  
  const handleAddToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem("User"));
    if (!user?.email) {
      return alert("Please login to add items to cart.");
    }
  
    try {
      const response = await axios.post('https://glowhavenbackend.onrender.com/api/cart', {
        email: user.email,
        product
      });
  
      const { message, alreadyExists } = response.data;
  
      if (alreadyExists) {
        alert("This product is already in your cart.");
      } else {
        alert("Product added to cart successfully!");
      }
  
    } catch (err) {
      console.error('Add to cart error:', err);
      alert(err.response?.data?.message || "Failed to add to cart");
    }
  };
  

  const images = [
    "./hero-product1.webp",
    "./hero-product2.webp",
    "./hero-product3.webp",
    "./hero-product4.webp"
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://glowhavenbackend.onrender.com/api/products/Get');
        console.log(res) // your backend endpoint
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const skincareProducts = products.filter(p => p.category === "Skincare");
  const dupattaProducts = products.filter(p => p.category === "Dupatta");

  return (
    <div>
      <Helmet>
      <title>Women’s Outfit & Skincare Products- Glow Haven by Pallavi</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Explore our exclusive range of styling options and skincare products at Glow Haven by Pallavi." />
    </Helmet>
      {/* Hero Swiper */}
      <section className="bg-white">
        <div className="w-[100%] mx-auto mt-0">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000 }}
            speed={1000}
            pagination={{ clickable: true }}
            className="overflow-hidden shadow-md"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[250px] md:h-[620px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Skincare Section */}
      <div>
        <h1 className="bg-[#3300d8] text-white w-[40%] md:w-[18%] text-center py-2 md:text-2xl font-semibold mb-2 ms-3 md:ms-20 mt-10">
          Skin Care & Beauty
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-6 md:px-10 border-3 border-[#3300d8] rounded-lg mx-3 md:mx-20 my-10 p-4">
          {skincareProducts.map((product, i) => (
            <motion.div
              key={product._id || i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative bg-white p-4 rounded shadow-md group"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto rounded mb-4 transition-transform duration-300 ease-in-out group-hover:scale-105 hover:brightness-110"
              />
              <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded group-hover:hidden">
                <h2 className="text-lg font-semibold">{product.name}</h2>
              </div>
              <button onClick={(e)=>{handleAddToCart(product)}} className="absolute bottom-10 left-6 bg-[#ff0a5b] text-white px-4 py-2 rounded transition group-hover:bg-[#3300d8] group-hover:scale-105 group-hover:translate-y-1">
                {`Buy now at Rs. ${product.price}`}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Headline */}
      <div>
        <h1 className="text-[#3300d8] text-xl md:text-4xl font-semibold mb-2 ms-3 md:ms-20 mt-10">
          Elevate your glow with impeccable style
        </h1>
      </div>

      {/* Dupatta Section */}
      <div>
        <h1 className="bg-[#3300d8] text-white w-[40%] md:w-[18%] text-center py-2 md:text-2xl font-semibold mb-2 ms-3 md:ms-20 mt-10">
          Luxury Dupattas
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-6 md:px-10 border-3 border-[#3300d8] rounded-lg mx-3 md:mx-20 my-10 p-4">
          {dupattaProducts.map((product, i) => (
            <motion.div
              key={product._id || i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative bg-white p-4 rounded shadow-md group"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto rounded mb-4 transition-transform duration-300 ease-in-out group-hover:scale-105 hover:brightness-110"
              />
              <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded group-hover:hidden">
                <h2 className="text-lg font-semibold">{product.name}</h2>
              </div>
              <button onClick={(e)=>{handleAddToCart(product)}} className="absolute bottom-10 left-6 bg-[#ff0a5b] text-white px-4 py-2 rounded transition group-hover:bg-[#3300d8]">
              {`Buy now at Rs. ${product.price}`}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
