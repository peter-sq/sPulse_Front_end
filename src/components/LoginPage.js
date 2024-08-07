import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ErrorAlert from '../shared/Modals/errorAlert';
import SuccessAlert from '../shared/Modals/sucessAlert';
import { ClipLoader } from 'react-spinners';
import { FaEyeSlash, FaEye } from "react-icons/fa";

// Define base URL
const BASE_URL = process.env.REACT_APP_API_URL;

function LoginPage() {
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
    const navigate = useNavigate(); // Initialize navigate

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

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try {
            const response = await axios.post(`${BASE_URL}/api/v1/user/auth/login`, data, {
                withCredentials: true
            });
            console.log("Login response:", response);
    
            setData({ email: '', password: '' });
            setAlertMessage('Login successful!');
            setShowAlert(true);
    
            // Navigate to dashboard after successful login
            navigate('/dashboard');
        } catch (error) {
            console.log('There was an error submitting this form', error);
    
            const errorMessage = error.response ? error.response.data.message : 'Error logging in';
            setAlertMessage(errorMessage);
            setShowAlert(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full text-gray-600">
                <div className="text-center">
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                        <p className="">Don't have an account? <a href="javascript:void(0)" className="font-medium text-blue-600 hover:text-blue-500">Sign up</a></p>
                    </div>
                </div>
                <form onSubmit={submit} className="mt-8 space-y-5">
                    {error && <p className="text-red-500">{error}</p>}
                    <div>
                        <label className="font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleOnChange}
                            required
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
                        disabled={loading} // Disable the button when loading
                        className="w-full px-4 py-2 text-white font-medium bg-blue-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 flex justify-center items-center"
                    >
                        {loading ? <ClipLoader size={20} color={"#fff"} /> : "Sign in"}
                    </button>
                    <div className="text-center">
                        <a href="javascript:void(0)" className="hover:text-blue-600">Forgot password?</a>
                    </div>
                </form>
                {showAlert && (
                    <div className="fixed bottom-4 right-4 z-50">
                        {alertMessage === 'Login successful!' ? (
                            <SuccessAlert message={alertMessage} onClose={() => setShowAlert(false)} />
                        ) : (
                            <ErrorAlert message={alertMessage} onClose={() => setShowAlert(false)} />
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}

export default LoginPage;
