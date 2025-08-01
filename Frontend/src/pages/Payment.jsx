import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const Payment = () => {
  const navigate = useNavigate();

  // Get the actual total amount from Redux (or props/state as per your setup)
 const cartItems = useSelector((state) => state.cart.items);
const totalAmount = cartItems.reduce(
  (acc, item) => acc + item.price * (item.quantity || 1),
  0
);




  const makePayment = async () => {
    try {
      // Step 1: Create order on backend
      const { data } = await axiosInstance.post('/payment', {
        amount: totalAmount,
      });

      const { order } = data;

      // Step 2: Get Razorpay key from backend
      const { data: keyData } = await axiosInstance.get('/getKey');

      // Step 3: Launch Razorpay
      const options = {
        key: keyData.key,
        amount: order.amount, // in paise
        currency: 'INR',
        name: ' SK Store',
        description: 'Digital Product Purchase',
        image: '/logo.png',
        order_id: order.id,
        handler: function (response) {
          // Payment success
          console.log('Payment successful', response);
          navigate('/payment-success');
        },
        prefill: {
          name: 'Sudheesh Ravichandran', // dynamically set if available
          email: 'sudheeshvilla5@gmail.com',
          contact: '8778063386',
        },
        notes: {
          app: ' Store',
        },
        theme: {
          color: '#0f172a',
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error('Payment Error:', err);
      alert('Something went wrong during payment. Try again.');
    }
  };

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