import React from 'react'
import Itemlist from '../components/Itemlist'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CartItemCard from '../components/CartItemCard'
import ShippingAddress from '../components/Shipping'

const Cart = () => {

  const cartItems = useSelector((state) => state.cart.items)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  const handleProceedToPayment = () => {
    navigate("/shipping")
  }


  const subtotal = cartItems.reduce((total, item) => {
    const priceInRupees = (Number(item.price) || 0) / 1;
    const quantity = Number(item.quantity) || 1;
    return total + priceInRupees * quantity;
  }, 0);
  const deliveryCharge = subtotal > 0 ? 50 : 0;
  const tax = subtotal * 0.05;
  const totalAmount = subtotal + deliveryCharge + tax;

  return (
    <div className="text-center m-4 p-4 font-serif">
      <h1 className="text-2xl font-bold">Cart</h1>
      <div>
        <button className="p-2 m-2 bg-rose-500 text-white rounded-lg" onClick={handleClearCart}>
          Clear Cart
        </button>
        {cartItems.length === 0 && (
          <h1>Cart is empty! Please add some items</h1>
        )}
        <CartItemCard items={cartItems} />
        <div className="mt-6 w-full max-w-lg mx-auto sm:ml-auto sm:mr-0 border-t pt-4 px-2">
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg text-gray-600">Subtotal:</p>
            <p className="text-lg font-semibold">₹{subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg text-gray-600">Delivery Charge:</p>
            <p className="text-lg font-semibold text-green-600">{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg text-gray-600">Tax (5%):</p>
            <p className="text-lg font-semibold">₹{tax.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center mt-4 border-t pt-4">
            <h2 className="text-xl font-bold font-sans">Total:</h2>
            <h2 className="text-xl font-bold font-sans text-blue-600">₹{totalAmount.toFixed(2)}</h2>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button
            className="w-full sm:w-auto px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-lg"
            onClick={handleProceedToPayment}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart