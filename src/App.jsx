import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


// Public pages
import Home from "./pages/Home";
import MenuDetails from "./pages/MenuDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import PastOrders from "./pages/PastOrders";


// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import MenuItems from "./pages/admin/MenuItems";
import AddMenuItem from "./pages/admin/AddMenuItem";
import EditMenuItem from "./pages/admin/EditMenuItem";
import Users from "./pages/admin/Users";


// Protected route
import ProtectedRoute from "./components/ProtectedRoute";


function App() {

    const { user } = useContext(AuthContext);


    return (
        <BrowserRouter>

            <Routes>

                {/* =========================
                    PUBLIC ROUTES
                ========================= */}

                <Route
                    path="/"
                    element={<Home />}
                />


                <Route
                    path="/menu/:id"
                    element={<MenuDetails />}
                />


                <Route
                    path="/register"
                    element={<Register />}
                />


                <Route
                    path="/login"
                    element={<Login />}
                />


                <Route
                    path="/admin-login"
                    element={<AdminLogin />}
                />


                {/* =========================
                    USER PAST ORDERS
                ========================= */}

                <Route
                    path="/past-orders"
                    element={
                        user && user.role === "User"
                            ? <PastOrders />
                            : <Navigate to="/login" />
                    }
                />


                {/* =========================
                    PROTECTED ADMIN ROUTES
                ========================= */}

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/admin/menu-items"
                    element={
                        <ProtectedRoute>
                            <MenuItems />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/admin/menu-items/add"
                    element={
                        <ProtectedRoute>
                            <AddMenuItem />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/admin/menu-items/edit/:id"
                    element={
                        <ProtectedRoute>
                            <EditMenuItem />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute>
                            <Users />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}


export default App;