import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthSuccess() {

    const navigate = useNavigate();

    useEffect(() => {

        const params =
            new URLSearchParams(
                window.location.search
            );

        const token =
            params.get("token");

        const userId =
            params.get("userId");

        if (token) {

            localStorage.setItem(
                "token",
                token
            );

            localStorage.setItem(
                "userId",
                userId
            );

            localStorage.setItem(
                "firstLogin",
                false
            );

            navigate(
                "/dashboard"
            );
        }

    }, [navigate]);

    return (
        <h1>
            Logging in...
        </h1>
    );
}

export default OAuthSuccess;