import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";

import AuthContextProvider
    from "./context/AuthContext.jsx";


createRoot(
    document.getElementById("root")
).render(

    <StrictMode>

        {/* Makes authentication available to all components */}
        <AuthContextProvider>

            <App />

        </AuthContextProvider>

    </StrictMode>
);