import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../../Service/allAPI';
import { toast } from 'react-toastify';

function Login() {
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = userDetails;

        if (!email || !password) {
            toast.warning("Fill the form completely");
            return;
        }

        try {
            const result = await loginAPI({ email, password });
            console.log("Login Response:", result.data);

            if (result.status === 200 && result.data.user) {
                toast.success("Login Successful");

                
                sessionStorage.setItem("user", JSON.stringify(result.data.user));
                sessionStorage.setItem("token", result.data.token);
                window.dispatchEvent(new Event("storage"));
                sessionStorage.setItem("userId", result.data.user._id);
                sessionStorage.setItem("auth", "user");



              
                setUserDetails({ email: "", password: "" });

                // Redirect
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);

            } else {
                toast.error("Unexpected response format");
            }
        } catch (err) {
            if (err.response) {
                toast.warning(err.response.data);
            } else {
                toast.error("Server not responding");
            }

            setUserDetails({ email: "", password: "" });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-emerald-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            value={userDetails.email}
                            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                            type="email"
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            value={userDetails.password}
                            onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                            type="password"
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition-colors"
                    >
                        Login
                    </button>
                </form>

                <Link to="/register">
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Don't have an account? <span className="text-green-600 hover:underline">Register</span>
                    </p>
                </Link>
            </div>
        </div>
    );
}

export default Login;
