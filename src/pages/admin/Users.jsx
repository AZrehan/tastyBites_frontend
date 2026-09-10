import { useEffect, useState } from "react";
import api from "../../services/api";

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUsers(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteUser = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await api.delete(`/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            fetchUsers();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to delete user");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                Users
            </h1>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Role</th>
                            <th className="p-3 text-left">Registration Date</th>
                            <th className="p-3 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-t">
                                <td className="p-3">{user.name}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">{user.role}</td>
                                <td className="p-3">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>

                                <td className="p-3">
                                    {/* NEW: Do not show delete button for Admin */}
                                    {user.role !== "Admin" && (
                                        <button
                                            onClick={() => deleteUser(user._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;