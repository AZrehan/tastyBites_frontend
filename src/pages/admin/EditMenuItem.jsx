/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import api from "../../services/api";


function EditMenuItem() {

    const { id } = useParams();
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "Starter",
        price: "",
        availability: true
    });


    // Store new image
    const [image, setImage] = useState(null);


    // Existing or new image preview
    const [imagePreview, setImagePreview] = useState("");


    const [message, setMessage] = useState("");


    // Fetch existing menu item
    useEffect(() => {

        const fetchMenuItem = async () => {

            try {

                const response =
                    await api.get(
                        `/menu-items/${id}`
                    );


                const item =
                    response.data.data;


                setFormData({
                    name: item.name,
                    description: item.description,
                    category: item.category,
                    price: item.price,
                    availability: item.availability
                });


                // Show existing Cloudinary image
                if (item.image) {

                    setImagePreview(
                        item.image
                    );

                }

            } catch (error) {

                console.error(
                    "Failed to fetch menu item",
                    error
                );

            }

        };


        fetchMenuItem();

    }, [id]);


    // Handle form input
    const handleChange = (e) => {

        const { name, value } =
            e.target;


        setFormData({
            ...formData,
            [name]:
                name === "availability"
                    ? value === "true"
                    : value
        });

    };


    // Handle new image
    const handleImageChange = (e) => {

        const file = e.target.files[0];


        if (!file) {
            return;
        }


        setImage(file);


        // Show new image immediately
        setImagePreview(
            URL.createObjectURL(file)
        );

    };


    // Submit changes
    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const token =
                localStorage.getItem("token");


            const data =
                new FormData();


            data.append(
                "name",
                formData.name
            );

            data.append(
                "description",
                formData.description
            );

            data.append(
                "category",
                formData.category
            );

            data.append(
                "price",
                formData.price
            );

            data.append(
                "availability",
                formData.availability
            );


            // Only send a file if a new one was selected
            if (image) {

                data.append(
                    "image",
                    image
                );

            }


            await api.put(
                `/menu-items/${id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            setMessage(
                "Menu item updated successfully!"
            );


            setTimeout(() => {

                navigate(
                    "/admin/menu-items"
                );

            }, 700);


        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to update menu item"
            );

        }

    };


    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />


            <div className="max-w-2xl mx-auto px-6 py-10">

                <div className="bg-white p-6 rounded shadow">

                    <h1 className="text-2xl font-bold mb-6">
                        Edit Menu Item
                    </h1>


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />


                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />


                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        >

                            <option value="Starter">
                                Starter
                            </option>

                            <option value="Main Course">
                                Main Course
                            </option>

                            <option value="Dessert">
                                Dessert
                            </option>

                            <option value="Beverage">
                                Beverage
                            </option>

                        </select>


                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />


                        <select
                            name="availability"
                            value={String(
                                formData.availability
                            )}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        >

                            <option value="true">
                                In Stock
                            </option>

                            <option value="false">
                                Out of Stock
                            </option>

                        </select>


                        <div>

                            <label className="block font-medium mb-2">
                                Item Image
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />

                        </div>


                        {/* Existing/new image preview */}
                        {imagePreview && (

                            <div>

                                <p className="font-medium mb-2">
                                    Image Preview
                                </p>

                                <img
                                    src={imagePreview}
                                    alt="Menu item preview"
                                    className="w-48 h-48 object-cover rounded border"
                                />

                            </div>

                        )}


                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white py-2 rounded"
                        >
                            Update Menu Item
                        </button>

                    </form>


                    {message && (
                        <p className="mt-4 text-center">
                            {message}
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
}


export default EditMenuItem;