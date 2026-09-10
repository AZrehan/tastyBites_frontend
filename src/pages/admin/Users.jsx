/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import api from "../../services/api";


function Users() {

    // Store users
    const [users, setUsers] = useState([]);


    // Fetch users
    useEffect(() => {

        const fetchUsers = async () => {

            try {

                const token =
                    localStorage.getItem("token");


                const response =
                    await api.get(
                        "/users",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );


                setUsers(
                    response.data.data
                );


            } catch (error) {

                console.error(
                    "Failed to fetch users",
                    error
                );

            }

        };


        fetchUsers();

    }, []);


    // Delete user
    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this user?"
            );


        if (!confirmDelete) {
            return;
        }


        try {

            const token =
                localStorage.getItem("token");


            await api.delete(
                `/users/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            // Remove deleted user
            setUsers((currentUsers) =>
                currentUsers.filter(
                    (user) => user._id !== id
                )
            );


        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to delete user"
            );

        }

    };


    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />


            <div className="max-w-6xl mx-auto px-6 py-10">

                <h1 className="text-3xl font-bold mb-8">
                    Users
                </h1>


                <div className="bg-white rounded shadow overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-gray-200">

                            <tr>

                                <th className="text-left p-3">
                                    Name
                                </th>

                                <th className="text-left p-3">
                                    Email
                                </th>

                                <th className="text-left p-3">
                                    Role
                                </th>

                                <th className="text-left p-3">
                                    Registration Date
                                </th>

                                <th className="text-left p-3">
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {users.map((user) => (

                                <tr
                                    key={user._id}
                                    className="border-t"
                                >

                                    <td className="p-3">
                                        {user.name}
                                    </td>


                                    <td className="p-3">
                                        {user.email}
                                    </td>


                                    <td className="p-3">
                                        {user.role}
                                    </td>


                                    <td className="p-3">
                                        {new Date(
                                            user.createdAt
                                        ).toLocaleDateString()}
                                    </td>


                                    <td className="p-3">

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    user._id
                                                )
                                            }
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>


                    {users.length === 0 && (
                        <p className="text-center p-6 text-gray-500">
                            No users found.
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
}


export default Users;