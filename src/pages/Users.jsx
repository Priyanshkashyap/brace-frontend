import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Sidebar from "../components/Sidebar";

function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => { loadUsers(); }, []);// Run only once, when the component first mounts.

    const loadUsers = async () => {
        try {
            const response = await api.get("/users");
            setUsers(response.data);
        } 
        catch (error) {

            console.error(error);
            alert("Unable to load users.");

        } finally {
            setLoading(false);
        }
      };

    const deactivateUser = async (id) => {

        const confirmDelete = window.confirm("Deactivate this user?" );
        if (!confirmDelete) return;

        try {
            await api.delete(`/users/${id}`);
            loadUsers();

        } catch (error) {

            console.error(error);
            alert("Unable to deactivate user.");
        }
    };

    const permanentDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Permanently delete this user?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/users/${id}/permanent`);

            loadUsers();

        } catch (error) {

            console.error(error);

            alert("Unable to permanently delete user.");

        }

    };

    return (

        <div
            style={{
                display: "flex"
            }}
        >

            <Sidebar />

            <div
                style={{
                    flex: 1,
                    padding: "25px"
                }}
            >

                <h1>User Management</h1>

                <hr />

                {

                    loading ?

                        <h3>Loading...</h3>

                        :

                        <table
                            border="1"
                            cellPadding="10"
                            style={{
                                borderCollapse: "collapse",
                                width: "100%"
                            }}
                        >

                            <thead>

                            <tr>

                                <th>ID</th>

                                <th>Username</th>

                                <th>Email</th>

                                <th>First Name</th>

                                <th>Last Name</th>

                                <th>Phone</th>

                                <th>Status</th>

                                <th>Theme</th>

                                <th>Actions</th>

                            </tr>

                            </thead>

                            <tbody>

                            {

                                users.map((user) => (

                                    <tr key={user.id}>

                                        <td>{user.id}</td>

                                        <td>{user.username}</td>

                                        <td>{user.email}</td>

                                        <td>{user.firstName}</td>

                                        <td>{user.lastName}</td>

                                        <td>{user.phoneNumber}</td>

                                        <td>

                                            {

                                                user.active ?

                                                    "Active"

                                                    :

                                                    "Inactive"

                                            }

                                        </td>

                                        <td>

                                            {user.profileTheme}

                                        </td>

                                        <td>

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/users/${user.id}`
                                                    )
                                                }
                                            >
                                                View
                                            </button>

                                            {" "}

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/users/edit/${user.id}`
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            {" "}

                                            <button
                                                onClick={() =>
                                                    deactivateUser(user.id)
                                                }
                                            >
                                                Deactivate
                                            </button>

                                            {" "}

                                            <button
                                                onClick={() =>
                                                    permanentDelete(user.id)
                                                }
                                            >
                                                Permanent Delete
                                            </button>
                                                <button
                                                 onClick={() => navigate( `/users/${user.id}/manage-roles`)}>
                                             Manage Roles
                                            </button>
                                        </td>

                                    </tr>

                                ))

                            }

                            </tbody>

                        </table>

                }

            </div>

        </div>

    );

}

export default Users;