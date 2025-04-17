import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';

// import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import axios from 'axios';




function Home() {
    const [products, setProducts] = useState([]);
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
  


  const testimonials = [
    {
      name: "Tanya R.",
      text: "Glow Haven changed my routine — my skin has never felt this fresh. Love the gentle formulas!",
      image: "./profile-tanya.webp", // Replace with your actual image
    },
    {
      name: "Neha S.",
      text: "Obsessed! the texture is so light, and the results are visible. Highly recommend!",
      image: "./profile-neha.webp",
    },
    {
      name: "Aarav T.",
      text: "finaly found a skincare that works for my sensitive skin. Simple,effective,and feels amazing!",
      image: "./profile-aarav.webp",
    },
  ];
  

  return (
    <>
    <div>
       <div
      style={{
        backgroundImage: "url('./hero.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '90vh',
      }}
      className="flex items-center justify-center px-6 md:px-10"
    >
      <div className="mb-15 ms:[10%] md:ms-[23%] w-full md:w-[60%] text-white">
        <h1 className=" text-5xl  md:text-5xl font-bold mb-6">
          <Typewriter
            words={[
              'Unleash Your Radiance With Every Product',
              'Glow Like Never Before',
              'Your Beauty, Your Power'
            ]}
            loop={true}
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
            cursor
            cursorStyle="|"
          />
        </h1>

        <p className="  md:w-[75%]  text-2xl md:text-md md:text-2xl mb-8 leading-none">
          Explore our range of skincare products and expert styling tips to achieve your best self.
        </p>

        <button className="bg-[#3300d8] text-white py-4 md:py-2  text-xl px-6 hover:bg-indigo-700 transition">
          Shop Now
        </button>
      </div>
    </div>


    </div>
    {/* feature proucts */}
    
<div>
  <h1 className="bg-[#3300d8] text-white w-[40%] md:w-[18%] text-center py-2 md:text-2xl font-semibold mb-2 ms-5 md:ms-20 mt-10">
    Skin Care & Beauty
  </h1>

  {/* First Grid */}
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
               <button className="absolute bottom-10 left-6 bg-[#ff0a5b] text-white px-4 py-2 rounded transition group-hover:bg-[#3300d8] group-hover:scale-105 group-hover:translate-y-1">
                 Buy Now
               </button>
             </motion.div>
           ))}
         </div>

  {/* Second Grid */}
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
               <button className="absolute bottom-10 left-6 bg-[#ff0a5b] text-white px-4 py-2 rounded transition group-hover:bg-[#3300d8]">
                 Buy Now
               </button>
             </motion.div>
           ))}
         </div>
</div>
    <div>
       
       
       

    </div>
  {/* why buy our products */}
  <section className="bg-gray-100 py-10 px-4">
  <h2 className="text-3xl font-bold text-center text-purple-800 mb-8">Why Buy Our Products</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
    {/* Card 1 */}
    <div className="flex items-start bg-blue-50 p-4 rounded-lg shadow-md h-[25vh]">
      <div className="w-[84%] h-[100%] bg-pink-600 rounded mr-4">
        <h1 className='w-[100%] h-[100%] font-bold text-9xl text-center text-white '>1</h1>
      </div>
      <div className='ms-4'>
        <h3 className=" w-[70%]  text-[#3300d8] text-xl font-bold mt-1 leading-none">Clean, Skin-Loving Ingredients</h3>
        <p className=" w-[70%]  text-[#3300d8] text-md mt-1 leading-none">
        We use only gentle, effective ingredients—no harsh chemicals, just glow-boosting goodness.
        </p>
      </div>
    </div>
 

    {/* Card 2 */}
    <div className="flex items-start bg-blue-50 p-4 rounded-lg shadow-md h-[25vh]">
      <div className="w-[70%] h-[100%] bg-pink-600 rounded mr-4">
      <h1 className='w-[100%] h-[100%] font-bold text-9xl text-center text-white '>2</h1>
      </div>
      <div className='ms-4'>
        <h3 className="w-[80%]  text-[#3300d8] text-xl font-bold  mt-1 leading-none">Expert-Backed Skincare Tips</h3>
        <p className="w-[70%]  text-[#3300d8] text-md mt-1 leading-none">
          Every product is backed by 7+ years of skincare + styling expertise you can trust.
        </p>
      </div>
    </div>

    {/* Card 3 */}
    <div className="flex items-start bg-blue-50 p-4 rounded-lg shadow-md h-[25vh]">
      <div className="w-[70%] h-[100%] bg-pink-600 rounded mr-4">
      <h1 className='w-[100%] h-[100%] font-bold text-9xl text-center text-white '>3</h1>
      </div>
      <div className='ms-4'>
        <h3 className="w-[80%]  text-[#3300d8] text-xl font-bold  mt-1 leading-none">Fast & Reliable Shipping</h3>
        <p className="w-[70%]  text-[#3300d8] text-md mt-1 leading-none">
          Get your glow goodies delivered quickly and safely, right to your doorstep.
        </p>
      </div>
    </div>

    {/* Card 4 */}
    <div className="flex items-start bg-blue-50 p-4 rounded-lg shadow-md h-[25vh]">
      <div className="w-[70%] h-[100%] bg-pink-600 rounded mr-4">
      <h1 className='w-[100%] h-[100%] font-bold text-9xl text-center text-white '>4</h1>
      </div>
      <div className='ms-4'>
        <h3 className="w-[80%]  text-[#3300d8] text-xl font-bold  mt-1 leading-none">Loved by Our Community</h3>
        <p className="w-[70%]  text-[#3300d8] text-md mt-1 leading-none">
          Our products are trusted and loved by real people with real results — just like you!
        </p>
      </div>
    </div>
  </div>
</section>

    <section className=" bg-gray-100 ">
      <h2 className="text-3xl font-bold text-center text-purple-800 mb-8">
        See What Our Clients Say
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
   
        className="w-[98%] mx-auto px-4"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className=" flex flex-col md:flex-row  bg-gray-100 rounded-lg  p-6 md:p-10  ">
           
              <h2 className=" hidden md:block w-[20%] text-3xl text-[#3300d8] font-bold  ">
               See What Our Clients Say
              </h2>
            
              {/* Image */}
              <div className="flex-shrink-0 mb-6 md:mb-0  ">
              
                
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-[100%] h-[70vh] "
                />
            
              </div>

              {/* Text */}
              <div className="text-center md:mt-30 md:text-left">
                <div className="text-4xl text-purple-700 font-bold md:mb-15">“</div>
                <p className="text-2xl text-[#3300d8] leading-none  max-w-md">
                  {testimonial.text}
                </p>
                <p className="mt-6 font-bold mb-3 md:mb-0  text-[#3300d8]">
                  {testimonial.name}
                </p>
                <span className=" hidden md:block w-8 h-1 bg-pink-500 mt-2 mb-2"></span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>






    </>
  );
}

export default Home;
