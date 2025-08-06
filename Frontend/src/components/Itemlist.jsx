import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../utils/cartSlice';
import VariantSelector from './VariantSelector.jsx';

const Itemlist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [selectedVariants, setSelectedVariants] = useState({});

    const handleVariantChange = (variantName, option) => {
  setSelectedVariants((prev) => {
    const currentSelection = prev[variantName];

    // If clicking the same option again, remove it (deselect)
    if (currentSelection === option) {
      const updated = { ...prev };
      delete updated[variantName];
      return updated;
    }

    // Otherwise, update with the new selection
    return {
      ...prev,
      [variantName]: option,
    };
  });
};



 
  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item._id === product?._id);
  const quantity = cartItem ? cartItem.quantity : 0;


  // Fetch product on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/product/${id}`);
        setProduct(res.data.product);
        
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  // Handlers
  const handleAddCart = () => {
    if (!product) return;
    dispatch(
      addItem({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.url,
      })
    );
  };

  const handleRemoveCart = () => {
    if (!product) return;
    dispatch(removeItem({ _id: product._id }));
  };

  const handleProceedPayment = () => {
    dispatch(addItem({...product, quantity:1}))
    navigate('/shipping');
  };

  // Show loader if product not fetched
  if (!product) {
    return <p className="p-8 text-lg">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 pt-24 pb-16 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Product Image */}
      <div className="flex flex-col items-center">
  <img
    src={product?.images?.[0]?.url}
    alt={product?.name}
    className="rounded-xl w-72 h-96 object-cover hover"
  />

  {/* Move VariantSelector BELOW image */}
  <div className="mt-4  max-w-md">
    <VariantSelector
      variants={product.variants}
      selectedVariants={selectedVariants}
      handleVariantChange={handleVariantChange}
    />
  </div>
</div>

      {/* Product Info */}
      <div className="flex flex-col gap-4 w-full p-2">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-red-300 font-light ">{product.description}</p>
        <p className="text-xl font-semibold">₹{product.price}</p>
        <p className="text-base font-normal">In stock:{product.stock}</p>
        <p className="text-gray-600">{product.about}</p>

        {/* Cart Controls */}
        <div className="flex flex-wrap items-center gap-4 min-h-[56px]">
          {quantity === 0 ? (
            <button
              onClick={handleAddCart}
              className="w-72 bg-pink-600 text-white px-4 py-3 rounded-lg transition hover:bg-pink-700"
            >
              Add to Cart
            </button>
          ) : (
            <>
              <button
                onClick={handleRemoveCart}
                className="bg-red-500 text-white px-3 py-2 rounded-full hover:bg-white hover:text-black"
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={handleAddCart}
                className="bg-green-500 text-white px-3 py-2 rounded-full  hover:bg-white hover:text-black"
              >
                +
              </button>
            </>
          )}
        </div>

        {/* Buy Now */}
        <button
          onClick={handleProceedPayment}
          className="w-72 bg-green-600 text-white px-4 py-3 rounded-lg transition hover:bg-green-700"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Itemlist;
