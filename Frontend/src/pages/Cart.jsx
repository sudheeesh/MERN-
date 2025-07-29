  import React from 'react'
  import Itemlist from '../components/Itemlist'
  import { useSelector, useDispatch } from 'react-redux'

  const Cart = () => {
    
      const cartItems = useSelector((state) => state.cart.items)
      console.log(cartItems);
      //  const navigate = useNavigate()
      const dispatch = useDispatch()

      const handleClearCart = () => {
            dispatch(clearCart())
      }

      // const handleProceedToPayment = () => {
      // navigate("/payment");
    
      
      const subtotal = cartItems.reduce((total, item) => {
    const priceInRupees = (Number(item.price) || 0) / 1;
    const quantity = Number(item.quantity) || 1;
    return total + priceInRupees * quantity;
  }, 0);
      const deliveryCharge = subtotal > 0 ? 50 : 0;
    const tax = subtotal * 0.05;
    const totalAmount = subtotal + deliveryCharge + tax;

      return(
          <div className="text-center m-4 p-4">
          <h1 className="text-2xl font-bold">Cart</h1>
          <div>
              <button className="p-2 m-2 bg-rose-500 text-white rounded-lg" onClick={handleClearCart}>
                  Clear Cart
              </button>
              {cartItems.length === 0 && (
                  <h1>Cart is empty! Please add some items</h1>
              )}
              <Itemlist item={cartItems}/>
              <div className="mt-6 text-right mr-4 max-w-xl mx-auto border-t pt-4">
                <p className="text-lg">Subtotal: ₹{subtotal.toFixed(2)}</p>
                <p className="text-lg">Delivery Charge: ₹{deliveryCharge.toFixed(2)}</p>
                <p className="text-lg">Tax (5%): ₹{tax.toFixed(2)}</p>
                <h2 className="text-xl font-bold mt-2">
                  Total: ₹{totalAmount.toFixed(2)}
                </h2>
              </div>
            <div className="mt-4">
              {/* <button
                className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                onClick={handleProceedToPayment}
              >
                Proceed to Payment
              </button> */}
            </div>
          </div>
          </div>
      )
  }

  export default Cart