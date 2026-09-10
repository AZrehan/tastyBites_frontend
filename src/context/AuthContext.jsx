import { createContext, useState } from "react";
import api from "../services/api";

// Create authentication context
export const AuthContext = createContext();


function AuthContextProvider({ children }) {

    // Store currently logged-in user
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );


    // Login user
    const login = async (email, password) => {

        const response = await api.post(
            "/auth/login",
            {
                email,
                password
            }
        );


        // Get JWT token and user from backend
        const { token, user } = response.data;


        // Save token in browser
        localStorage.setItem(
            "token",
            token
        );


        // Save user in browser
        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );


        // Update React state
        setUser(user);


        return user;
    };


    // Logout user
    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export default AuthContextProvider;