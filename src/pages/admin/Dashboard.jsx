import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import api from "../../services/api";


function Dashboard() {

    // Store dashboard statistics
    const [stats, setStats] = useState({
        totalMenuItems: 0,
        totalUsers: 0,
        totalOrders: 0
    });


    // Fetch dashboard statistics
    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const token =
                    localStorage.getItem("token");


                const response = await api.get(
                    "/dashboard",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );


                setStats(response.data.data);

            } catch (error) {

                console.error(
                    "Failed to fetch dashboard",
                    error
                );

            }

        };


        fetchDashboard();

    }, []);


    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />


            <div className="max-w-6xl mx-auto px-6 py-10">

                <h1 className="text-3xl font-bold mb-8">
                    Admin Dashboard
                </h1>


                <div className="grid md:grid-cols-3 gap-6">

                    <div className="bg-white p-6 rounded shadow">

                        <h2 className="text-gray-500">
                            Total Menu Items
                        </h2>

                        <p className="text-3xl font-bold mt-2">
                            {stats.totalMenuItems}
                        </p>

                    </div>


                    <div className="bg-white p-6 rounded shadow">

                        <h2 className="text-gray-500">
                            Total Users
                        </h2>

                        <p className="text-3xl font-bold mt-2">
                            {stats.totalUsers}
                        </p>

                    </div>


                    <div className="bg-white p-6 rounded shadow">

                        <h2 className="text-gray-500">
                            Total Orders
                        </h2>

                        <p className="text-3xl font-bold mt-2">
                            {stats.totalOrders}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}


export default Dashboard;