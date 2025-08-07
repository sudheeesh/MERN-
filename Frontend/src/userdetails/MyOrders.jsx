import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../utils/orderSlice';
import { format } from 'date-fns';

const MyOrders = () => {
  const dispatch = useDispatch();
  const { myOrders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 mt-20">
      <h2 className="text-3xl font-bold text-center mb-8">🧾 My Orders</h2>

      {loading && (
        <p className="text-center text-blue-600 font-medium">Loading orders...</p>
      )}

      {error && (
        <p className="text-center text-red-500 font-medium">Error: {error}</p>
      )}

      {!loading && myOrders.length === 0 && (
        <p className="text-center text-gray-500">You have no orders yet.</p>
      )}

      {!loading && myOrders.length > 0 && (
        <div className="space-y-6">
          {myOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-6"
            >
              {/* Order Top Info */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                <div className="text-sm text-gray-500 truncate">
                  <span className="font-medium text-gray-700">Order ID:</span> {order._id}
                </div>
                <span
                  className={`text-xs font-semibold mt-2 sm:mt-0 px-3 py-1 rounded-full w-fit ${
                    order.orderStatus === 'processing'
                      ? 'bg-yellow-100 text-yellow-800'
                      : order.orderStatus === 'delivered'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>

              {/* Order Date and Total */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                <p className="text-sm text-gray-600">
                  <strong>Date:</strong> {format(new Date(order.createdAt), 'PPPpp')}
                </p>
                <p className="text-lg font-semibold text-gray-800 mt-2 sm:mt-0">
                  Total: ₹{order.totalPrice?.toLocaleString('en-IN')}
                </p>
              </div>

              {/* Items */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Items:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700">
                  {order.orderItems.map((item, index) => (
                    <li
                      key={index}
                      className="border border-gray-100 rounded-md p-3 bg-gray-50"
                    >
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
