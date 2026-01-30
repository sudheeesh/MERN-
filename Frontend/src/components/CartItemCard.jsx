import { Trash } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { addItem, removeItem } from '../utils/cartSlice'

const CartItemCard = ({ items }) => {
  const dispatch = useDispatch()

  if (!items?.length) return null

  return (
    <div className='max-w-4xl mx-auto space-y-6'>
      {items?.map((item) => (
        <div key={item._id} className='flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 border-b pb-4 bg-white p-4 rounded-lg shadow-sm'>
          <img
            src={item.images?.[0]?.url || item.image} // Fallback to item.image if images array not present (normalization)
            alt={item.name}
            className="w-full h-48 sm:w-32 sm:h-32 object-contain rounded bg-gray-50"
          />

          <div className='flex-1 w-full text-center sm:text-left'>
            <h2 className='text-lg font-semibold text-gray-800'>{item.name}</h2>
            <p className='text-sm text-gray-600 font-medium'>Price: ₹{item.price}</p>

            {/* Quantity Controls */}
            <div className='flex items-center justify-center sm:justify-start space-x-3 mt-3'>
              <button
                onClick={() => dispatch(removeItem({ _id: item._id }))}
                className='px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-lg font-bold text-gray-600 transition'
              >
                −
              </button>
              <span className="text-lg font-semibold">{item.quantity}</span>
              <button
                onClick={() => dispatch(addItem(item))}
                className='px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-lg font-bold text-gray-600 transition'
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => dispatch(removeItem({ _id: item._id, forceDelete: true }))}
            title="Remove item"
            className='text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition self-center sm:self-start'
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default CartItemCard
