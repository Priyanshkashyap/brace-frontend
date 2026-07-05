import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";

function UserDetails() {

    const { id } = useParams();
    const [user, setUser] = useState(null); // will contain an object
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {

        try {

            const response = await api.get(
                `/users/${id}`
            );

            setUser(response.data);

        } catch (error) {

            console.error(error);

            alert("Unable to load user.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div style={{ display: "flex" }}>

            <Sidebar />

            <div
                style={{
                    padding: "25px",
                    flex: 1
                }}
            >

                <h1>User Details</h1>

                <hr />

                {

                    loading ?

                        <h3>Loading...</h3>

                        :

                        user && (

                            <div>

                                <p>
                                    <strong>ID:</strong>
                                    {" "}
                                    {user.id}
                                </p>

                                <p>
                                    <strong>Username:</strong>
                                    {" "}
                                    {user.username}
                                </p>

                                <p>
                                    <strong>Email:</strong>
                                    {" "}
                                    {user.email}
                                </p>

                                <p>
                                    <strong>First Name:</strong>
                                    {" "}
                                    {user.firstName}
                                </p>

                                <p>
                                    <strong>Last Name:</strong>
                                    {" "}
                                    {user.lastName}
                                </p>

                                <p>
                                    <strong>Phone Number:</strong>
                                    {" "}
                                    {user.phoneNumber}
                                </p>

                                <p>
                                    <strong>Theme:</strong>
                                    {" "}
                                    {user.profileTheme}
                                </p>

                                <p>
                                    <strong>Status:</strong>
                                    {" "}
                                    {
                                        user.active
                                            ? "Active"
                                            : "Inactive"
                                    }
                                </p>

                                <p>
                                    <strong>First Login:</strong>
                                    {" "}
                                    {
                                        user.firstLogin
                                            ? "Yes"
                                            : "No"
                                    }
                                </p>

                                <hr />

                                <h2>Roles</h2>

                                {

                                    user.roles?.length === 0 ?

                                        <p>No roles assigned</p>

                                        :

                                        user.roles?.map(role => (

                                            <p key={role.id}>
                                                {role.name}
                                            </p>

                                        ))

                                }

                                <hr />

                                <h2>Role Groups</h2>

                                {

                                    user.roleGroups?.length === 0 ?

                                        <p>No groups assigned</p>

                                        :

                                        user.roleGroups?.map(group => (

                                            <p key={group.id}>
                                                {group.name}
                                            </p>

                                        ))

                                }

                            </div>

                        )

                }

            </div>

        </div>

    );
}

export default UserDetails;