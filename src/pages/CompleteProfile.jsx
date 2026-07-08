import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/CompleteProfile.css";

function CompleteProfile() {

    const navigate = useNavigate();

    const userId =
        localStorage.getItem("userId");

    const [firstName,setFirstName] =
        useState("");

    const [lastName,setLastName] =
        useState("");

    const [phoneNumber,setPhoneNumber] =
        useState("");

    const [secretQuestion,setSecretQuestion] =
        useState("");

    const [secretAnswer,setSecretAnswer] =
        useState("");

    const [newPassword,setNewPassword] =
        useState("");

    const handleSubmit = async () => {

        try {

            await api.put(

                `/users/${userId}/complete-profile`,

                {
                    firstName,
                    lastName,
                    phoneNumber,
                    secretQuestion,
                    secretAnswer,
                    newPassword
                }

            );

            localStorage.setItem(
                "firstLogin",
                "false"
            );

            navigate("/dashboard");

        }

        catch(error){

            alert("Profile update failed");

        }

    };

    return (

        <div className="complete-page">

            <div className="complete-card">

                <h1 className="complete-title">

                    Complete Profile

                </h1>

                <p className="complete-subtitle">

                    Finish setting up your account before continuing.

                </p>

                <div className="form-group">

                    <label>
                        First Name
                    </label>

                    <input
                        className="form-input"
                        value={firstName}
                        onChange={(e)=>
                            setFirstName(e.target.value)
                        }
                    />

                </div>

                <div className="form-group">

                    <label>
                        Last Name
                    </label>

                    <input
                        className="form-input"
                        value={lastName}
                        onChange={(e)=>
                            setLastName(e.target.value)
                        }
                    />

                </div>

                <div className="form-group">

                    <label>
                        Phone Number
                    </label>

                    <input
                        className="form-input"
                        value={phoneNumber}
                        onChange={(e)=>
                            setPhoneNumber(e.target.value)
                        }
                    />

                </div>

                <div className="form-group">

                    <label>
                        Secret Question
                    </label>

                    <input
                        className="form-input"
                        value={secretQuestion}
                        onChange={(e)=>
                            setSecretQuestion(e.target.value)
                        }
                    />

                </div>

                <div className="form-group">

                    <label>
                        Secret Answer
                    </label>

                    <input
                        className="form-input"
                        value={secretAnswer}
                        onChange={(e)=>
                            setSecretAnswer(e.target.value)
                        }
                    />

                </div>

                <div className="form-group">

                    <label>
                        New Password
                    </label>

                    <input
                        className="form-input"
                        type="password"
                        value={newPassword}
                        onChange={(e)=>
                            setNewPassword(e.target.value)
                        }
                    />

                </div>

                <button
                    className="save-btn"
                    onClick={handleSubmit}
                >

                    Save Profile

                </button>

            </div>

        </div>

    );

}

export default CompleteProfile;