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


            <div className="max-w-6xl mx-auto px-6 py-10">

                <h1 className="text-3xl font-bold text-center mb-8">
                    Our Menu
                </h1>


                {loading ? (

                    <p className="text-center">
                        Loading menu...
                    </p>

                ) : menuItems.length === 0 ? (

                    <p className="text-center">
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