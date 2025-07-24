import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ImageSlider from '../components/ImageSlider'

const Home = () =>{
  return (
    <>
    <Header/>
    <ImageSlider/>
    <div>
         
        <h2 className='font-serif text-2xl font-medium focus-within:text-gray-500 text-center p-5'>Trending Now</h2>
        <Footer/>
    </div>
    </>
  )
}

export default Home