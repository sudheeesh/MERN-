import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const images = [
  "/images/b1.jpg",
  "/images/banner4.jpeg",
  "/images/banner3.jpg",
  "/images/banner5.webp"

]
const ImageSlider = () => {

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)

  }, [])
  return (
    <div className="relative w-full aspect-square sm:aspect-video md:h-[400px] lg:h-[500px] overflow-hidden mt-28 md:mt-24">
      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="min-w-full h-full">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-colors duration-300 ${index === currentIndex ? 'bg-white' : 'bg-black hover:bg-white'
              }`}
          ></button>
        ))}
      </div>
    </div>)
}
export default ImageSlider