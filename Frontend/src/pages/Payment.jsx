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


  const makePayment = async () => {
  try {
    const { data } = await axiosInstance.post("/payment", {
      amount: totalAmount,
    });

    const { order } = data;
    const { data: keyData } = await axiosInstance.get("/getKey");

    const options = {
      key: keyData.key,
      amount: order.amount,
      currency: "INR",
      name: "SK Store",
      description: "Digital Product Purchase",
      image: "/logo.png",
      order_id: order.id,
      handler: async function (response) {
        try {
          const orderData = {
            orderItems: cartItems,
            paymentInfo: {
              id: response.razorpay_payment_id,
              status: "succeeded",
            },
            totalPrice: totalAmount,
          };

          const { data } = await axiosInstance.post("/new/order", orderData, {
            withCredentials: true,
          });

          if (data.success) {
            dispatch(clearCart());
            localStorage.removeItem("cartItems");
            navigate("/payment-success");
          }
        } catch (error) {
          console.error("Order saving failed:", error);
          alert("Order completed but not saved.");
        }
      },
      prefill: {
        name: "Sudheesh Ravichandran",
        email: "sudheeshvilla5@gmail.com",
        contact: "8778063386",
      },
      notes: {
        app: "Store",
      },
      theme: {
        color: "#0f172a",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  } catch (err) {
    console.error("Payment Error:", err);
    alert("Something went wrong during payment.");
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