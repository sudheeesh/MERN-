import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductImageSlider = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  // Optional: Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden">
      {/* Image */}
      <img
        src={images[current]}
        alt={`Product ${current}`}
        className="w-full h-full object-contain transition duration-300 ease-in-out"
      />

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 rounded-full p-2 hover:bg-white transition"
      >
        <ChevronLeft />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 rounded-full p-2 hover:bg-white transition"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default ProductImageSlider;
