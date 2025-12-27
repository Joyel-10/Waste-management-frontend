


import React, { useState } from "react";
import { registerAPI } from "../../Service/allAPI";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [userDetails, setUserDetails] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const { name, username, email, password } = userDetails;

        if (!name || !username || !email || !password) {
            alert("Fill all the fields");
            return;
        }

        try {
            const result = await registerAPI({ name, username, email, password });
            console.log(result);

            if (result.status === 201) {
                alert("Registered Successfully");
                setUserDetails({ name: "", username: "", email: "", password: "" });
                navigate("/login");
            } else if (result.status === 409) {
                alert(result.response?.data?.message || "User already exists");
            } else {
                alert(result.response?.data?.message || "Something went wrong");
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Server error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-emerald-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                <form className="space-y-4" onSubmit={handleRegister}>
                    <div>
                        <label>Name</label>
                        <input
                            value={userDetails.name}
                            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                            type="text"
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    <div>
                        <label>Username</label>
                        <input
                            value={userDetails.username}
                            onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                            type="text"
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    <div>
                        <label>Email</label>
                        <input
                            value={userDetails.email}
                            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                            type="email"
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            value={userDetails.password}
                            onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                            type="password"
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
                    >
                        Register
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-green-600 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;

