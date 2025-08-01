import { Trash} from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { addItem, removeItem } from '../utils/cartSlice'

const CartItemCard = ({ items }) => {
  const dispatch = useDispatch()

  if (!items?.length) return null

  return (
    <div className='max-w-4xl mx-auto space-y-6'>
      {items.map((item) => (
        <div key={item._id} className='flex items-center justify-between gap-4 border-b pb-4'>
          <img
            src={item.images?.[0]?.url}
            alt={item.name}
            className="w-48 h-48 object-contain rounded"
          />

          <div className='flex-1'>
            <h2 className='text-lg font-semibold'>{item.name}</h2>
            <p className='text-sm text-gray-600'>Price: ₹{item.price}</p>

            {/* Quantity Controls */}
            <div className='flex items-center space-x-2 mt-2'>
              <button
                onClick={() => dispatch(removeItem({ _id: item._id }))}
                className='px-2 py-1 bg-gray-200 rounded'
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => dispatch(addItem(item))}
                className='px-2 py-1 bg-gray-200 rounded'
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => dispatch(removeItem({ _id: item._id, forceDelete: true }))}
            title="Remove item"
            className='text-red-500 hover:text-red-700'
          >
            <Trash />
          </button>
        </div>
      ))}
    </div>
  )
}

export default CartItemCard
