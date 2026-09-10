import {
    useContext,
    useState
} from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
    AuthContext
} from "../context/AuthContext";


function AdminLogin() {

    const navigate = useNavigate();


    // Get login and logout functions
    const {
        login,
        logout
    } = useContext(AuthContext);


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");


    // Handle Admin login
    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const user = await login(
                email,
                password
            );


            // Check Admin role
            if (user.role !== "Admin") {

                // Remove the User session
                logout();

                setMessage(
                    "This account is not an Admin"
                );

                return;
            }


            // Admin successfully logged in
            navigate(
                "/admin/dashboard"
            );


        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                error.message ||
                "Login failed"
            );

        }
    };


    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />


            <div className="max-w-md mx-auto px-6 py-10">

                <div className="bg-white p-6 rounded shadow">

                    <h1 className="text-2xl font-bold mb-6">
                        Admin Login
                    </h1>


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <input
                            type="email"
                            placeholder="Admin Email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="w-full border p-2 rounded"
                            required
                        />


                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="w-full border p-2 rounded"
                            required
                        />


                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white py-2 rounded"
                        >
                            Admin Login
                        </button>

                    </form>


                    {message && (
                        <p className="text-red-600 text-center mt-4">
                            {message}
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
}


export default AdminLogin;