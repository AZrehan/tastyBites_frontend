import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState("");


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                "/auth/register",
                formData
            );

            setMessage(
                "Registration successful!"
            );

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };


    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-md mx-auto px-6 py-10">

                <div className="bg-white p-6 rounded shadow">

                    <h1 className="text-2xl font-bold mb-6">
                        Create Account
                    </h1>


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />


                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />


                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />


                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />


                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white py-2 rounded"
                        >
                            Register
                        </button>

                    </form>


                    {message && (
                        <p className="text-center mt-4">
                            {message}
                        </p>
                    )}


                    <p className="text-center mt-4">
                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="text-orange-600"
                        >
                            Login
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Register;