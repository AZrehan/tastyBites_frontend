import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    AuthContext
} from "../context/AuthContext";


function Navbar() {

    // Get authentication data from context
    const {
        user,
        logout
    } = useContext(AuthContext);


    const navigate = useNavigate();


    // Handle logout
    const handleLogout = () => {

        logout();

        navigate("/");
    };


    return (
        <nav className="bg-orange-500 text-white px-6 py-4">

            <div className="max-w-6xl mx-auto flex justify-between items-center">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold"
                >
                    TastyBites
                </Link>


                {/* Navigation */}
                <div className="flex items-center gap-4">

                    <Link to="/">
                        Home
                    </Link>


                    {/* Not logged in */}
                    {!user && (
                        <>
                            <Link to="/login">
                                Login
                            </Link>

                            <Link to="/register">
                                Register
                            </Link>

                            <Link to="/admin-login">
                                Admin
                            </Link>
                        </>
                    )}


                    {/* Normal User */}
                    {user && user.role === "User" && (
                        <>
                            <span>
                                Hi, {user.name}
                            </span>

                            <button
                                onClick={handleLogout}
                                className="bg-white text-orange-500 px-3 py-1 rounded"
                            >
                                Logout
                            </button>
                        </>
                    )}


                    {/* Admin */}
                    {user && user.role === "Admin" && (
                        <>
                            <Link to="/admin/dashboard">
                                Dashboard
                            </Link>

                            <Link to="/admin/menu-items">
                                Menu
                            </Link>

                            <Link to="/admin/users">
                                Users
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="bg-white text-orange-500 px-3 py-1 rounded"
                            >
                                Logout
                            </button>
                        </>
                    )}

                </div>

            </div>

        </nav>
    );
}


export default Navbar;