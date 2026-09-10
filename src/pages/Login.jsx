import {
    useContext,
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import Navbar from "../components/Navbar";

import {
    AuthContext
} from "../context/AuthContext";


function Login() {

    const navigate = useNavigate();


    // Get login function from context
    const {
        login
    } = useContext(AuthContext);


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");


    // Handle login
    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const user = await login(
                email,
                password
            );


            // Admin goes to dashboard
            if (user.role === "Admin") {

                navigate(
                    "/admin/dashboard"
                );

            } else {

                // Normal user goes to Home
                navigate("/");

            }


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
                        Login
                    </h1>


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <input
                            type="email"
                            placeholder="Email"
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
                            Login
                        </button>

                    </form>


                    {message && (
                        <p className="text-red-600 text-center mt-4">
                            {message}
                        </p>
                    )}


                    <p className="text-center mt-4">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="text-orange-600"
                        >
                            Register
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}


export default Login;