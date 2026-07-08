import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";
import "../styles/UserDetails.css";

function UserDetails() {

    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {

        try {

            const response =
                await api.get(`/users/${id}`);

            setUser(response.data);

        }

        catch (error) {

            console.error(error);

            alert("Unable to load user.");

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="user-loading">

                Loading User...

            </div>

        );

    }

    return (

        <div className="details-page">

            <Sidebar />

            <div className="details-content">

                {

                    user &&

                    <div className="details-card">

                        <div className="profile-header">

                            <div className="profile-avatar">

                                {

                                    (
                                        user.firstName ||
                                        user.username
                                    )[0].toUpperCase()

                                }

                            </div>

                            <div>

                                <h1>

                                    {

                                        user.firstName

                                            ?

                                            `${user.firstName} ${user.lastName}`

                                            :

                                            user.username

                                    }

                                </h1>

                                <p>

                                    {user.email}

                                </p>

                            </div>

                        </div>

                        <div className="info-grid">

                            <div className="info-box">

                                <h3>Account</h3>

                                <p><strong>ID:</strong> {user.id}</p>

                                <p><strong>Username:</strong> {user.username}</p>

                                <p><strong>Email:</strong> {user.email}</p>

                            </div>

                            <div className="info-box">

                                <h3>Profile</h3>

                                <p><strong>First Name:</strong> {user.firstName || "-"}</p>

                                <p><strong>Last Name:</strong> {user.lastName || "-"}</p>

                                <p><strong>Phone:</strong> {user.phoneNumber || "-"}</p>

                            </div>

                            <div className="info-box">

                                <h3>Preferences</h3>

                                <p>

                                    <strong>Theme:</strong>

                                    <span className={`theme-badge ${user.profileTheme.toLowerCase()}`}>

                                        {user.profileTheme}

                                    </span>

                                </p>

                                <p>

                                    <strong>Status:</strong>

                                    <span className={user.active ? "status-badge active" : "status-badge inactive"}>

                                        {

                                            user.active

                                                ?

                                                "Active"

                                                :

                                                "Inactive"

                                        }

                                    </span>

                                </p>

                                <p>

                                    <strong>First Login:</strong>

                                    {

                                        user.firstLogin

                                            ?

                                            " Yes"

                                            :

                                            " No"

                                    }

                                </p>

                            </div>

                        </div>

                        <div className="bottom-grid">

                            <div className="list-card">

                                <h2>

                                    Assigned Roles

                                </h2>

                                {

                                    user.roles?.length === 0 ?

                                        <p className="empty">

                                            No roles assigned.

                                        </p>

                                        :

                                        user.roles.map(role=>(

                                            <div
                                                key={role.id}
                                                className="chip role-chip"
                                            >

                                                🛡 {role.name}

                                            </div>

                                        ))

                                }

                            </div>

                            <div className="list-card">

                                <h2>

                                    Role Groups

                                </h2>

                                {

                                    user.roleGroups?.length === 0 ?

                                        <p className="empty">

                                            No role groups assigned.

                                        </p>

                                        :

                                        user.roleGroups.map(group=>(

                                            <div
                                                key={group.id}
                                                className="chip group-chip"
                                            >

                                                👥 {group.name}

                                            </div>

                                        ))

                                }

                            </div>

                        </div>

                    </div>

                }

            </div>

        </div>

    );

}

export default UserDetails;