import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <div className='bg-gray py-1'>
      <Hero/>
      </div>
      <Footer/>
      </div>

  )
}

export default Home
