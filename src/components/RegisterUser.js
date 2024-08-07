import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ErrorAlert from '../shared/Modals/errorAlert';
import SuccessAlert from '../shared/Modals/sucessAlert';
import { ClipLoader } from 'react-spinners';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

// Define base URL
const BASE_URL = process.env.REACT_APP_API_URL;

function RegisterUser() {
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'basic'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false); 
    const navigate = useNavigate(); 

    // Handle onChange function
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value 
        }));
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Handle submit 
    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); 

        try {
            const response = await axios.post(`${BASE_URL}/api/v1/user/auth/register`, data);
            console.log(response);
            setData({ username: '', email: '', password: '', role: 'basic' });
            setAlertMessage('User Created successfully!');
            setShowAlert(true);
            navigate('/login');
        } catch (error) {
            console.log('There was an error submitting this form', error);
            setAlertMessage(error.response.data.message || 'Error creating account');
       
            setShowAlert(true);
        } finally {
            setLoading(false);
            
        }
    };

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
            <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
                <div className="text-center">
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Create an account</h3>
                        <p className="">Already have an account? <a href="/login" className="font-medium text-indigo-600 hover:text-blue-500">Log in</a></p>
                    </div>
                </div>
                <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
                    <form onSubmit={submit} className="space-y-5">
                        {error && <p className="text-red-500">{error}</p>}
                        <div>
                            <label className="font-medium">Name</label>
                            <input
                                type="text"
                                name="username"
                                value={data.username}
                                onChange={handleOnChange}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleOnChange}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                        <label className="font-medium">Password</label>
                        <div className="relative">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                name="password"
                                value={data.password}
                                onChange={handleOnChange}
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            >
                                 {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                        <button
                            type="submit"
                            disabled={loading} 
                            className="w-full px-4 py-2 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-indigo-600 rounded-lg duration-150 flex justify-center items-center"
                        >
                            {loading ? <ClipLoader size={20} color={"#fff"} /> : "Create account"}
                        </button>
                    </form>
                    {showAlert && (
                        <div className="fixed bottom-4 right-4 z-50">
                            {alertMessage === 'User Created successfully!' ? (
                                <SuccessAlert message={alertMessage} onClose={() => setShowAlert(false)} />
                            ) : (
                                <ErrorAlert message={alertMessage} onClose={() => setShowAlert(false)} />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default RegisterUser;
