import { useContext } from "react";
import { Navigate } from "react-router-dom";

import {
    AuthContext
} from "../context/AuthContext";


function ProtectedRoute({ children }) {

    // Get logged-in user from authentication context
    const { user } = useContext(AuthContext);


    // No logged-in user
    if (!user) {
        return (
            <Navigate
                to="/admin-login"
                replace
            />
        );
    }


    // Logged-in user is not Admin
    if (user.role !== "Admin") {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }


    // Admin is allowed to continue
    return children;
}


export default ProtectedRoute;