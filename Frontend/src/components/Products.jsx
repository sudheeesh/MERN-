import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import ProductCard from './ProductCard'
import { Link } from 'react-router-dom'

const Products = () => {
   const [products,setProducts] = useState([])

   useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get('/products')
        setProducts(res.data.products)
      } catch (error) {
        console.log('failed to fetch products:',error)
      }
    }
    fetchProducts()
},[])


  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>ALL Products</h2>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
     {products.map((product) => (
    <Link to={`/product/${product._id}`} key={product._id}>  <ProductCard  product={product}/> </Link>
     ))}
    </div>
    </div>
  )
}

export default Products
