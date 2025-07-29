import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem } from '../utils/cartSlice'

const Itemlist = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)

  const cartItem = cartItems.find((item) => item._id === product?._id)
  const quantity = cartItem ? cartItem.quantity : 0

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/product/${id}`)
        setProduct(res.data.product)
      } catch (error) {
        console.log('failed to fetch product:', error)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddCart = () => {
    dispatch(addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image?.[0]?.url
    }))
  }

  const handleRemoveCart = () => {
    dispatch(removeItem({ _id: product._id }))
  }

  if (!product) return <p className="p-8 text-lg">Loading...</p>

  return (
    <div className="pt-24 pb-16 max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* LEFT: Product Image */}
      <div className='w-full'>
        <img
          src={product?.image?.[0]?.url}
          alt={product?.name}
          className="mt-4 w-full h-[400px] object-cover rounded shadow"
        />
      </div>

      {/* RIGHT: Product Details */}
      <div className='flex flex-col justify-center gap-4 w-full p-2'>
        <h1 className="text-3xl font-bold break-words">{product?.name}</h1>
        <p className="text-green-600 text-lg">Latest trendy design</p>
        <p className="text-xl font-semibold">₹{product?.price}</p>
        <p className="text-gray-700">{product?.description}</p>
        <p className="text-gray-600">{product?.about}</p>

        {quantity === 0 ? (
          <button
            onClick={handleAddCart}
            className="mt-6 bg-pink-600 text-white px-3 py-3 rounded-lg"
          >
            Add to Cart
          </button>
        ) : (
          <div className="mt-6 flex items-center gap-4">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={handleRemoveCart}
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={handleAddCart}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Itemlist