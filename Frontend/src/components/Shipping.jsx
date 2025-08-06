import React, { useState, useEffect } from "react";
import AddAddressForm from "./AddAddressForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { clearCart } from "../utils/cartSlice";

const ShippingPage = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user)

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const gst = subtotal * 0.05;
  const totalAmount = subtotal + deliveryCharge + gst;

  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState(() => {
    const data = localStorage.getItem("savedAddresses");
    return data ? JSON.parse(data) : [];
  });

  const handleSaveAddress = (address) => {
    const updatedAddresses = [...savedAddresses, address];
    setSavedAddresses(updatedAddresses);
    localStorage.setItem("savedAddresses", JSON.stringify(updatedAddresses));
    setSelectedAddress(address);
    setShowNewAddressForm(false);
  };

  const handleSelectSaved = (address) => {
    setSelectedAddress(address);
  };
console.log("✅ user from Redux:", user);
console.log("✅ Token from user:", user?.token);
console.log("✅ LocalStorage:", localStorage.getItem("userInfo"));
  const handleProceed = async () => {
  if (!selectedAddress) {
    alert("Please select or add an address.");
    return;
  }

  try {
    // 1. Get Razorpay Key
    const { data: keyData } = await axiosInstance.get("/getKey");

    // 2. Create Order on backend
    const { data: orderData } = await axiosInstance.post("/payment", {
      amount: totalAmount,
    });

    // 3. Razorpay checkout options
    const options = {
      key: keyData.key,
      amount: orderData.order.amount,
      currency: "INR",
      name: "SK Store",
      description: "Order Payment",
      image: "/logo.png",
      order_id: orderData.order.id,
      handler: async function (response) {
  try {

  const orderData = {
  shippingInfo: {
    address: selectedAddress.address,
    city: selectedAddress.city.name,
    state: selectedAddress.state.name,
    country: selectedAddress.country.name,
    phoneNo: selectedAddress.phone || '',
    pincode: selectedAddress.pincode,
    landmark: selectedAddress.landmark,
  },
  
  orderItems: cartItems.map((item) => ({
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    product: item._id || item.product,
  })),
  
  paymentInfo: {
    id: response.razorpay_payment_id,
    status: "succeeded",
  },
  itemPrice: subtotal,
  taxPrice: gst,
  shippingPrice: deliveryCharge,
  totalPrice: totalAmount,
};
    console.log("📦 Order Items:", cartItems.map((item) => ({
  name: item.name,
  price: item.price,
  quantity: item.quantity,
  product: item._id || item.product,
})));
    console.log("Order Data:", orderData);
    const localUserInfo = JSON.parse(localStorage.getItem("userInfo"));
console.log("🔥 Token from localStorage:", localUserInfo?.token);
console.log("🧪 Sending token:", localStorage.getItem('authToken'))
   const token = localStorage.getItem('authToken')
   console.log("Token sent to backend:", token);
const { data } = await axiosInstance.post("/new/order", orderData, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
      withCredentials: true,
    });
    console.log(userInfo?.token)
      console.log("Order Save Response 👉", data);
    if (data.success) {
      dispatch(clearCart());
      setTimeout(() => {
        navigate("/payment-success");
      }, 100);
    }
  } catch (error) {
    console.error("Order saving failed:",(error.response.data));
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
    <div className="mt-20 p-4 max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
      {/* LEFT: Address Selection + Form */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

        {savedAddresses.length > 0 && (
          <div className="mb-4 space-y-2">
            {savedAddresses.map((addr, i) => (
              <div
                key={i}
                className={`border p-3 rounded cursor-pointer ${
                  selectedAddress === addr ? "border-blue-500" : ""
                }`}
                onClick={() => handleSelectSaved(addr)}
              >
                <p className="font-medium">{addr.name}, {addr.phone}</p>
                <p className="text-sm text-gray-600">
                  {addr.address}, {addr.city.name}, {addr.state.name},{" "}
                  {addr.country.name} - {addr.pincode}
                </p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => setShowNewAddressForm(!showNewAddressForm)}
          className="mb-4 bg-gray-200 px-3 py-2 rounded hover:bg-gray-300"
        >
          {showNewAddressForm ? "Cancel" : "➕ Add New Address"}
        </button>

        {showNewAddressForm && <AddAddressForm onSave={handleSaveAddress} />}
      </div>

      {/* RIGHT: Order Summary */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {cartItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between border p-3 rounded-md"
            >
              <img
                src={item.images?.[0]?.url || "/placeholder.jpg"}
                alt={item.name}
                className="w-12 h-16 object-cover rounded"
              />
              <div className="flex-1 ml-4">
                <p className="font-medium font-serif">{item.name}</p>
                <p className="text-sm text-gray-600">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
              <p className="font-semibold font-mono">
                ₹{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charges</span>
            <span>₹{deliveryCharge.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (0.08)</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-4 text-lg font-bold flex justify-between border-t pt-2">
          <span>Total:</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>

        <button
          onClick={handleProceed}
          className="font-serif mt-6 bg-yellow-400 text-black w-72 py-2 rounded-lg hover:bg-black hover:text-white "
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default ShippingPage;
