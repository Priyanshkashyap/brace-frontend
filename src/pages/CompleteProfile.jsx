import { useState }
from "react";

import { useNavigate }
from "react-router-dom";

import api from "../api/axios";

function CompleteProfile() {

    const navigate =
        useNavigate();

    const userId =
        localStorage.getItem(
            "userId"
        );

    const [
        firstName,
        setFirstName
    ] = useState("");

    const [
        lastName,
        setLastName
    ] = useState("");

    const [
        phoneNumber,
        setPhoneNumber
    ] = useState("");

    const [
        secretQuestion,
        setSecretQuestion
    ] = useState("");

    const [
        secretAnswer,
        setSecretAnswer
    ] = useState("");

    const [
        newPassword,
        setNewPassword
    ] = useState("");

    const handleSubmit =
        async () => {

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

                navigate(
                    "/dashboard"
                );

            } catch (error) {

                alert(
                    "Profile update failed"
                );
            }
        };

    return (

        <div>

            <h1>
                Complete Profile
            </h1>

            <input
                placeholder="First Name"
                value={firstName}
                onChange={(e) =>
                    setFirstName(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <input
                placeholder="Last Name"
                value={lastName}
                onChange={(e) =>
                    setLastName(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <input
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) =>
                    setPhoneNumber(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <input
                placeholder="Secret Question"
                value={secretQuestion}
                onChange={(e) =>
                    setSecretQuestion(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <input
                placeholder="Secret Answer"
                value={secretAnswer}
                onChange={(e) =>
                    setSecretAnswer(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) =>
                    setNewPassword(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <button
                onClick={handleSubmit}
            >
                Save Profile
            </button>

        </div>
    );
}

export default CompleteProfile;