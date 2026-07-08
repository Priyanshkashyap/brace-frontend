import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";
import "../styles/Users.css";

function Users() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadUsers();

    }, []);

    const loadUsers = async () => {

        try {

            const response =
                await api.get("/users");

            setUsers(response.data);

        } catch (error) {

            console.error(error);

            alert("Unable to load users.");

        } finally {

            setLoading(false);

        }

    };

    const deactivateUser = async (id) => {

        const confirmDelete =
            window.confirm(
                "Deactivate this user?"
            );

        if (!confirmDelete)
            return;

        try {

            await api.delete(
                `/users/${id}`
            );

            loadUsers();

        }

        catch (error) {

            console.error(error);

            alert(
                "Unable to deactivate user."
            );

        }

    };

    const permanentDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Permanently delete this user?"
            );

        if (!confirmDelete)
            return;

        try {

            await api.delete(
                `/users/${id}/permanent`
            );

            loadUsers();

        }

        catch (error) {

            console.error(error);

            alert(
                "Unable to permanently delete user."
            );

        }

    };

    const exportUsers = async () => {

        try {

            const response =
                await api.get(
                    "/users/export",
                    {
                        responseType: "blob"
                    }
                );

            const url =
                window.URL.createObjectURL(
                    new Blob([response.data])
                );

            const link =
                document.createElement("a");

            link.href = url;

            link.setAttribute(
                "download",
                "users.xlsx"
            );

            document.body.appendChild(link);

            link.click();

            link.remove();

        }

        catch (error) {

            console.error(error);

            alert(
                "Unable to export users."
            );

        }

    };

    const filteredUsers =
        useMemo(() => {

            return users.filter(user => {

                const value =
                    search.toLowerCase();

                return (

                    user.username
                        ?.toLowerCase()
                        .includes(value)

                    ||

                    user.email
                        ?.toLowerCase()
                        .includes(value)

                    ||

                    user.firstName
                        ?.toLowerCase()
                        .includes(value)

                    ||

                    user.lastName
                        ?.toLowerCase()
                        .includes(value)

                );

            });

        }, [users, search]);

    const totalUsers =
        users.length;

    const activeUsers =
        users.filter(
            u => u.active
        ).length;

    const inactiveUsers =
        users.filter(
            u => !u.active
        ).length;

    return (

        <div className="users-page">

            <Sidebar />

            <div className="users-content">

                <div className="users-card">

                    <div className="users-header">

                        <div>

                            <h1>
                                User Management
                            </h1>

                            <p>

                                Manage every user,
                                role assignment,
                                profile and permissions
                                from one dashboard.

                            </p>

                        </div>

                        <button
                            className="export-btn"
                            onClick={exportUsers}
                        >

                            📤 Export Users

                        </button>

                    </div>

                    <div className="stats-grid">

                        <div className="stat-card">

                            <div>

                                <h3>
                                    Total Users
                                </h3>

                                <h2>

                                    {totalUsers}

                                </h2>

                            </div>

                            <div
                                className="stat-icon total"
                            >

                                👥

                            </div>

                        </div>

                        <div className="stat-card">

                            <div>

                                <h3>
                                    Active Users
                                </h3>

                                <h2>

                                    {activeUsers}

                                </h2>

                            </div>

                            <div
                                className="stat-icon active"
                            >

                                ✅

                            </div>

                        </div>

                        <div className="stat-card">

                            <div>

                                <h3>
                                    Inactive Users
                                </h3>

                                <h2>

                                    {inactiveUsers}

                                </h2>

                            </div>

                            <div
                                className="stat-icon inactive"
                            >

                                🚫

                            </div>

                        </div>

                    </div>

                    <div className="toolbar">

                        <div
                            className="search-box"
                        >

                            <input

                                placeholder="Search users..."

                                value={search}

                                onChange={(e)=>

                                    setSearch(
                                        e.target.value
                                    )

                                }

                            />

                        </div>

                        <button

                            className="create-btn"

                            onClick={()=>

                                navigate(
                                    "/users/create"
                                )

                            }

                        >

                            ➕ Create User

                        </button>

                    </div>

                    {

                        loading ?

                            <div
                                className="loading"
                            >

                                Loading Users...

                            </div>

                        :

                            <div
                                className="table-wrapper"
                            >

                                <table
                                    className="users-table"
                                >

                                    <thead>

                                    <tr>

                                        <th>User</th>

                                        <th>Status</th>

                                        <th>Theme</th>

                                        <th>Phone</th>

                                        <th>Actions</th>

                                    </tr>

                                    </thead>

                                    <tbody>

                                    {

                                        filteredUsers.map(user => (

                                            <tr
                                                key={user.id}
                                            >

                                                <td>

                                                    <div
                                                        className="user-cell"
                                                    >

                                                        <div
                                                            className="avatar"
                                                        >

                                                            {

                                                                (
                                                                    user.firstName ||
                                                                    user.username
                                                                )[0]
                                                                    .toUpperCase()

                                                            }

                                                        </div>

                                                        <div
                                                            className="user-info"
                                                        >

                                                            <h4>

                                                                {

                                                                    user.firstName

                                                                        ?

                                                                        `${user.firstName} ${user.lastName}`

                                                                        :

                                                                        user.username

                                                                }

                                                            </h4>

                                                            <p>

                                                                {

                                                                    user.email

                                                                }

                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>

                                                <td>

                                                    <span

                                                        className={

                                                            user.active

                                                                ?

                                                                "status active"

                                                                :

                                                                "status inactive"

                                                        }

                                                    >

                                                        {

                                                            user.active

                                                                ?

                                                                "Active"

                                                                :

                                                                "Inactive"

                                                        }

                                                    </span>

                                                </td>

                                                <td>

                                                    <span

                                                        className={`theme ${user.profileTheme.toLowerCase()}`}

                                                    >

                                                        {user.profileTheme}

                                                    </span>

                                                </td>

                                                <td>

                                                    {

                                                        user.phoneNumber ||

                                                        "-"

                                                    }

                                                </td>

                                                <td>

                                                    <div
                                                        className="actions"
                                                    >
                                                                                                            <button
                                                            className="view-btn"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/users/${user.id}`
                                                                )
                                                            }
                                                        >
                                                            View
                                                        </button>

                                                        <button
                                                            className="edit-btn"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/users/edit/${user.id}`
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="role-btn"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/users/${user.id}/manage-roles`
                                                                )
                                                            }
                                                        >
                                                            Roles
                                                        </button>

                                                        <button
                                                            className="disable-btn"
                                                            onClick={() =>
                                                                deactivateUser(
                                                                    user.id
                                                                )
                                                            }
                                                        >
                                                            Disable
                                                        </button>

                                                        <button
                                                            className="delete-btn"
                                                            onClick={() =>
                                                                permanentDelete(
                                                                    user.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        ))

                                    }

                                    </tbody>

                                </table>

                            </div>

                    }

                </div>

            </div>

        </div>

    );

}

export default Users;