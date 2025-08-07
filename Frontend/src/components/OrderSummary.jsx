import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const OrderSummary = () => {

    const order = useSelector((state) => state.order.orderDetail)
    const navigate = useNavigate()

     if (!order || !order._id) {
    return (
      <div className="p-6 text-center mt-20">
        <h2 className="text-xl font-semibold mb-4">No Order Found</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate('/')}
        >
          Go to Home
        </button>
      </div>
    );
  }
  return (
    
   <div className="max-w-3xl mx-auto mt-24 px-6 py-10 bg-white shadow-md rounded-xl border border-gray-200 ">
  <h2 className="text-2xl font-bold text-center text-green-600 mb-4 flex items-center">
    Order Placed Successfully 🎉
  </h2>
   <div>
  {/* Order Details */}
  <div className="flex justify-between text-sm text-gray-600">
          <span><strong>Order ID:</strong> {order._id}</span>
          <span><strong>Status:</strong> {order.orderStatus}</span>
        </div>

  {/* Shipping Info */}
  <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Shipping Address</h3>
          <div className="text-sm text-gray-600 leading-6">
            {order.shippingInfo?.name}<br />
            {order.shippingInfo?.address}, {order.shippingInfo?.city}, {order.shippingInfo?.state} - {order.shippingInfo?.pincode}<br />
            Phone: {order.shippingInfo?.phone}
          </div>
        </div>

  {/* Items Ordered */}
  <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Ordered Items</h3>
          <div className="space-y-3">
            {order?.orderItems?.map((item, index) => (
              <div key={item._id || index} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-700">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
         <div className="pt-4 border-t">
          <div className="flex justify-between text-lg font-semibold text-gray-800">
            <span>Total Amount</span>
            <span>₹{order.totalPrice}</span>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <Link
          to="/"
          className="inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
        >
          Go to Home
        </Link>
      </div>
    </div>

  )
}

export default OrderSummary