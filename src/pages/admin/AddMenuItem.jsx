import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import api from "../../services/api";


function AddMenuItem() {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "Starter",
        price: "",
        availability: true
    });


    // Store selected image
    const [image, setImage] = useState(null);


    // Store temporary preview
    const [imagePreview, setImagePreview] = useState("");


    const [message, setMessage] = useState("");


    // Handle form input
    const handleChange = (e) => {

        const { name, value } = e.target;


        setFormData({
            ...formData,
            [name]:
                name === "availability"
                    ? value === "true"
                    : value
        });

    };


    // Handle image selection
    const handleImageChange = (e) => {

        const file = e.target.files[0];


        if (!file) {
            return;
        }


        setImage(file);


        // Create local preview
        setImagePreview(
            URL.createObjectURL(file)
        );

    };


    // Submit form
    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const token =
                localStorage.getItem("token");


            // Create multipart form
            const data = new FormData();


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


            if (image) {

                data.append(
                    "image",
                    image
                );

            }


            await api.post(
                "/menu-items",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            setMessage(
                "Menu item added successfully!"
            );


            setTimeout(() => {

                navigate(
                    "/admin/menu-items"
                );

            }, 700);


        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to add menu item"
            );

        }

    };


    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />


            <div className="max-w-2xl mx-auto px-6 py-10">

                <div className="bg-white p-6 rounded shadow">

                    <h1 className="text-2xl font-bold mb-6">
                        Add Menu Item
                    </h1>


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <input
                            type="text"
                            name="name"
                            placeholder="Item Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />


                        <textarea
                            name="description"
                            placeholder="Description"
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
                            placeholder="Price"
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


                        {/* Image preview before upload */}
                        {imagePreview && (

                            <div>

                                <p className="font-medium mb-2">
                                    Image Preview
                                </p>

                                <img
                                    src={imagePreview}
                                    alt="Selected preview"
                                    className="w-48 h-48 object-cover rounded border"
                                />

                            </div>

                        )}


                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white py-2 rounded"
                        >
                            Add Menu Item
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


export default AddMenuItem;