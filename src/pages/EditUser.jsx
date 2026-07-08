import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";
import "../styles/EditUser.css";

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

            const response =
                await api.get(`/users/${id}`);

            const user = response.data;

            setUsername(user.username || "");
            setEmail(user.email || "");
            setFirstName(user.firstName || "");
            setLastName(user.lastName || "");
            setPhoneNumber(user.phoneNumber || "");
            setActive(user.active);

        }

        catch (error) {

            console.error(error);

            alert("Unable to load user.");

        }

        finally {

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

        }

        catch (error) {

            console.error(error);

            alert("Unable to update user.");

        }

    };

    if (loading) {

        return (

            <div className="edit-loading">

                Loading User...

            </div>

        );

    }

    return (

        <div className="edit-page">

            <Sidebar />

            <div className="edit-content">

                <div className="edit-card">

                    <div className="edit-header">

                        <div>

                            <h1>

                                Edit User

                            </h1>

                            <p>

                                Update user profile information.

                            </p>

                        </div>

                        <div className="profile-avatar">

                            {

                                (
                                    firstName ||
                                    username
                                )[0].toUpperCase()

                            }

                        </div>

                    </div>

                    <div className="form-grid">

                        <div className="input-group">

                            <label>

                                Username

                            </label>

                            <input
                                value={username}
                                onChange={(e)=>
                                    setUsername(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="input-group">

                            <label>

                                Email

                            </label>

                            <input
                                value={email}
                                onChange={(e)=>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="input-group">

                            <label>

                                First Name

                            </label>

                            <input
                                value={firstName}
                                onChange={(e)=>
                                    setFirstName(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="input-group">

                            <label>

                                Last Name

                            </label>

                            <input
                                value={lastName}
                                onChange={(e)=>
                                    setLastName(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="input-group">

                            <label>

                                Phone Number

                            </label>

                            <input
                                value={phoneNumber}
                                onChange={(e)=>
                                    setPhoneNumber(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="input-group">

                            <label>

                                Account Status

                            </label>

                            <div className="switch-row">

                                <input

                                    type="checkbox"

                                    checked={active}

                                    onChange={(e)=>

                                        setActive(
                                            e.target.checked
                                        )

                                    }

                                />

                                <span>

                                    {

                                        active ?

                                        "Active"

                                        :

                                        "Inactive"

                                    }

                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="button-row">

                        <button
                            className="cancel-btn"
                            onClick={()=>
                                navigate("/users")
                            }
                        >

                            Cancel

                        </button>

                        <button
                            className="save-btn"
                            onClick={updateUser}
                        >

                            Save Changes

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default EditUser;