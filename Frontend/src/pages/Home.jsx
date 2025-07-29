import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ImageSlider from '../components/ImageSlider'
import Products from '../components/Products'
import { Link } from 'react-router-dom'

const Home = () =>{
  return (
    <>
    <ImageSlider/>
    <div> 
        <h2 className='font-serif text-2xl font-medium focus-within:text-gray-500 text-center p-5'>Trending Now</h2>
       <Products/>
        <Footer/>
    </div>
    </>
  )
}

export default Home