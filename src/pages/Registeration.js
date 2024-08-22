import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RegisterUser from '../components/RegisterUser'

function Registeration() {
  return (
    <div>
    <Navbar/>
    <div className='bg-gray py-1'>
    <RegisterUser/>
    </div>
    <Footer/>
    </div>
  )
}

export default Registeration
