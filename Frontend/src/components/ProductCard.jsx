import React from 'react'
import Rating from './Rating'

const ProductCard = ({ product }) => {
  return (
    <div className='border rounded-lg p-2 sm:p-4 shadow-sm hover:shadow-md transition-shadow bg-white'>
      <div className="w-full h-32 sm:h-48 mb-2 flex items-center justify-center overflow-hidden">
        <img
          src={product?.images?.[0]?.url}
          alt={product?.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <h3 className='text-sm sm:text-xl font-semibold truncate'>{product?.name}</h3>
      <p className='text-gray-600 text-sm sm:text-base'>₹{product?.price}</p>
      <div className="text-xs sm:text-base">
        <Rating Value={product?.ratings} text={`(${product?.numofReviews})`} />
      </div>
    </div>
  )
}

export default ProductCard