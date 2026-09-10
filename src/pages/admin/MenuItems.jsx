/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import api from "../../services/api";


function MenuItems() {

    // Store all menu items
    const [menuItems, setMenuItems] = useState([]);


    // Store search text
    const [search, setSearch] = useState("");


    // Fetch menu items
    useEffect(() => {

        const fetchMenuItems = async () => {

            try {

                const response =
                    await api.get("/menu-items");


                setMenuItems(
                    response.data.data
                );


            } catch (error) {

                console.error(
                    "Failed to fetch menu items",
                    error
                );

            }

        };


        fetchMenuItems();

    }, []);


    // Delete menu item
    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this item?"
            );


        if (!confirmDelete) {
            return;
        }


        try {

            const token =
                localStorage.getItem("token");


            await api.delete(
                `/menu-items/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            // Remove deleted item
            setMenuItems((currentItems) =>
                currentItems.filter(
                    (item) => item._id !== id
                )
            );


        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to delete menu item"
            );

        }

    };


    // Filter items based on search text
    const filteredItems =
        menuItems.filter((item) =>
            item.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );


    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />


            <div className="max-w-6xl mx-auto px-6 py-10">

                <div className="flex justify-between items-center mb-6">

                    <h1 className="text-3xl font-bold">
                        Menu Items
                    </h1>


                    <Link
                        to="/admin/menu-items/add"
                        className="bg-orange-500 text-white px-4 py-2 rounded"
                    >
                        Add Menu Item
                    </Link>

                </div>


                {/* Search */}
                <input
                    type="text"
                    placeholder="Search menu item..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="w-full border p-3 rounded bg-white mb-6"
                />


                <div className="bg-white rounded shadow overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-gray-200">

                            <tr>

                                <th className="text-left p-3">
                                    Image
                                </th>

                                <th className="text-left p-3">
                                    Name
                                </th>

                                <th className="text-left p-3">
                                    Category
                                </th>

                                <th className="text-left p-3">
                                    Price
                                </th>

                                <th className="text-left p-3">
                                    Availability
                                </th>

                                <th className="text-left p-3">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredItems.map((item) => (

                                <tr
                                    key={item._id}
                                    className="border-t"
                                >

                                    <td className="p-3">

                                        {item.image ? (

                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />

                                        ) : (

                                            "No image"

                                        )}

                                    </td>


                                    <td className="p-3">
                                        {item.name}
                                    </td>


                                    <td className="p-3">
                                        {item.category}
                                    </td>


                                    <td className="p-3">
                                        ₹{item.price}
                                    </td>


                                    <td className="p-3">
                                        {item.availability
                                            ? "In Stock"
                                            : "Out of Stock"}
                                    </td>


                                    <td className="p-3">

                                        <div className="flex gap-2">

                                            <Link
                                                to={`/admin/menu-items/edit/${item._id}`}
                                                className="bg-blue-500 text-white px-3 py-1 rounded"
                                            >
                                                Edit
                                            </Link>


                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        item._id
                                                    )
                                                }
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>


                    {filteredItems.length === 0 && (
                        <p className="text-center p-6 text-gray-500">
                            No menu items found.
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
}


export default MenuItems;