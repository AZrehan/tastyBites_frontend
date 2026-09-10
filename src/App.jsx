import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


// Public pages
import Home from "./pages/Home";
import MenuDetails from "./pages/MenuDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";


// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import MenuItems from "./pages/admin/MenuItems";
import AddMenuItem from "./pages/admin/AddMenuItem";
import EditMenuItem from "./pages/admin/EditMenuItem";
import Users from "./pages/admin/Users";


// Protected route
import ProtectedRoute from "./components/ProtectedRoute";


function App() {

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