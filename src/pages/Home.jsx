/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import MenuCard from "../components/MenuCard";
import api from "../services/api";


function Home() {

    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchMenuItems = async () => {

            try {

                const response =
                    await api.get(
                        "/menu-items"
                    );


                setMenuItems(
                    response.data.data
                );


            } catch (error) {

                console.error(
                    "Failed to fetch menu items",
                    error
                );


            } finally {

                setLoading(false);

            }

        };


        fetchMenuItems();

    }, []);


    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />


            {/* Welcome Section */}
            <div className="bg-orange-50 border-b border-orange-100">

                <div className="max-w-6xl mx-auto px-6 py-12 text-center">

                    <h1 className="text-4xl font-bold text-orange-600 mb-4">
                        More Than Just a Meal 🍽️
                    </h1>

                    <p className="max-w-2xl mx-auto text-gray-700 text-lg leading-relaxed">
                        TastyBites welcomes you to a place where great food
                        and good taste come together. From delicious starters
                        to satisfying main courses and tempting desserts,
                        there is something for everyone.
                    </p>

                    <p className="mt-4 text-gray-600">
                        Take a look at our menu and discover your next favorite dish!
                    </p>

                </div>

            </div>


            {/* Menu Section */}
            <div className="max-w-6xl mx-auto px-6 py-10">

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Our Menu
                </h2>


                {loading ? (

                    <p className="text-center text-gray-600">
                        Loading menu...
                    </p>

                ) : menuItems.length === 0 ? (

                    <p className="text-center text-gray-600">
                        No menu items available.
                    </p>

                ) : (

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

                        {menuItems.map((item) => (

                            <MenuCard
                                key={item._id}
                                item={item}
                            />

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}


export default Home;