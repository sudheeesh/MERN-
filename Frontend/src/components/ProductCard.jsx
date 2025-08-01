import React from 'react'
import Rating from './Rating'

const ProductCard = ({product}) => {
  return (
    <div className='border rounded p-4 shadow'>
     <img
     src={product?.images?.[0]?.url}
     alt=''
     className="w-full h-48 object-contain rounded"
     />
     <h3 className='text-xl font-semibold'>{product?.name}</h3>
     <p className='text-gray-600'>₹{product?.price}</p>
     <Rating Value={product?.ratings} text={`(${product?.numofReviews} reviews)`}/>
    </div>
  )
}

export default ProductCard