import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";

function EditUser() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [active, setActive] = useState(true);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {

        try {

            const response = await api.get(
                `/users/${id}`
            );

            const user = response.data;

            setUsername(user.username || "");
            setEmail(user.email || "");
            setFirstName(user.firstName || "");
            setLastName(user.lastName || "");
            setPhoneNumber(user.phoneNumber || "");
            setActive(user.active);

        } catch (error) {

            console.error(error);

            alert("Unable to load user.");

        } finally {

            setLoading(false);

        }
    };

    const updateUser = async () => {

        try {

            await api.put(
                `/users/${id}`,
                {
                    username,
                    email,
                    firstName,
                    lastName,
                    phoneNumber,
                    active
                }
            );

            alert("User updated successfully");

            navigate("/users");

        } catch (error) {

            console.error(error);

            alert("Unable to update user.");
        }
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (

        <div style={{ display: "flex" }}>

            <Sidebar />

            <div
                style={{
                    padding: "25px",
                    flex: 1
                }}
            >

                <h1>Edit User</h1>

                <hr />

                <div>

                    <label>Username</label>

                    <br />

                    <input
                        value={username}
                        onChange={(e) =>
                            setUsername(
                                e.target.value
                            )
                        }
                    />

                    <br /><br />

                    <label>Email</label>

                    <br />

                    <input
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                    />

                    <br /><br />

                    <label>First Name</label>

                    <br />

                    <input
                        value={firstName}
                        onChange={(e) =>
                            setFirstName(
                                e.target.value
                            )
                        }
                    />

                    <br /><br />

                    <label>Last Name</label>

                    <br />

                    <input
                        value={lastName}
                        onChange={(e) =>
                            setLastName(
                                e.target.value
                            )
                        }
                    />

                    <br /><br />

                    <label>Phone Number</label>

                    <br />

                    <input
                        value={phoneNumber}
                        onChange={(e) =>
                            setPhoneNumber(
                                e.target.value
                            )
                        }
                    />

                    <br /><br />

                    <label>Active</label>

                    <input
                        type="checkbox"
                        checked={active}
                        onChange={(e) =>
                            setActive(
                                e.target.checked
                            )
                        }
                    />

                    <br /><br />

                    <button
                        onClick={updateUser}
                    >
                        Save Changes
                    </button>

                </div>

            </div>

        </div>
    );
}

export default EditUser;