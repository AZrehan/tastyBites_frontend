import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";

function MenuDetails() {

    const { id } = useParams();

    const [item, setItem] = useState(null);


    useEffect(() => {

        const fetchMenuItem = async () => {

            try {

                const response = await api.get(
                    `/menu-items/${id}`
                );

                setItem(response.data.data);

            } catch (error) {

                console.error(
                    "Failed to fetch menu item",
                    error
                );

            }
        };

        fetchMenuItem();

    }, [id]);


    if (!item) {

        return (
            <div className="min-h-screen bg-gray-100">

                <Navbar />

                <p className="text-center mt-10">
                    Loading...
                </p>

            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-3xl mx-auto px-6 py-10">

                <div className="bg-white rounded-lg shadow p-6">

                    {item.image && (
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-80 object-cover rounded"
                        />
                    )}


                    <h1 className="text-3xl font-bold mt-6">
                        {item.name}
                    </h1>


                    <p className="text-gray-600 mt-4">
                        {item.description}
                    </p>


                    <p className="mt-4">
                        <strong>Category:</strong>{" "}
                        {item.category}
                    </p>


                    <p className="text-orange-600 font-bold text-xl mt-3">
                        ₹{item.price}
                    </p>


                    <p className="mt-3">
                        <strong>Availability:</strong>{" "}
                        {item.availability
                            ? "In Stock"
                            : "Out of Stock"}
                    </p>


                    <Link
                        to="/"
                        className="inline-block mt-6 bg-orange-500 text-white px-4 py-2 rounded"
                    >
                        Back to Menu
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default MenuDetails;