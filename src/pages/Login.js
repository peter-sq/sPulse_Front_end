import React, {useEffect, useState} from 'react'
import LoginPage from '../components/LoginPage'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Login = () => {
    return(
    <div>
    <Navbar/>
    <div className='bg-gray py-1'>
    <LoginPage/>
    </div>
    <Footer/>
    </div>
    )

}

export default Login;


