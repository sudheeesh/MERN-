import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { useDispatch } from 'react-redux';
import { clearCart } from '../utils/cartSlice'

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // Get the actual total amount from Redux (or props/state as per your setup)
 const cartItems = useSelector((state) => state.cart.items);
const totalAmount = cartItems.reduce(
  (acc, item) => acc + item.price * (item.quantity || 1),
  0
);


  return (
        <div className="flex flex-col items-center justify-center mt-16">
      <h2 className="text-2xl mb-6">Pay ₹{totalAmount} securely</h2>
      <button
        onClick={makePayment}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;