import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "../styles/Login.css";

function Login() {

    const navigate = useNavigate();

    const {
        login: saveAuth
    } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [captchaToken,setCaptchaToken] = useState(null);

    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {
            if(!captchaToken){
            alert("Please complete captcha");
            return;
            }
            const response =
                await api.post(
                    "/users/login",
                    {
                        email,
                        password,
                        captchaToken
                    }
                );
                console.log(response.data);
            saveAuth(
                response.data.token
            );

            localStorage.setItem(
                "firstLogin",
                response.data.firstLogin
            );

            localStorage.setItem(
                "userId",
                response.data.userId
            );

            if (
                response.data.firstLogin
            ) {

                navigate(
                    "/complete-profile"
                );

            } else {

                navigate(
                    "/dashboard"
                );
            }

        } catch (err) {

            alert(
                "Login Failed"
            );
        }
    };

    return (

<div className="login-page">

    <div className="login-card">

        <div className="login-logo">
            🔐
        </div>

        <h1 className="login-title">
            RBAC System
        </h1>

        <p className="login-subtitle">
            Sign in to continue
        </p>

        <div className="input-group">

            <label>Email</label>

            <input
                placeholder="Enter email"
                value={email}
                onChange={(e)=>
                    setEmail(e.target.value)
                }
            />

        </div>

        <div className="input-group">

            <label>Password</label>

            <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e)=>
                    setPassword(e.target.value)
                }
            />

        </div>

        <div className="captcha-box">

            <ReCAPTCHA
                sitekey={
                    import.meta.env
                        .VITE_RECAPTCHA_SITE_KEY
                }
                onChange={
                    setCaptchaToken
                }
            />

        </div>

        <button
            className="login-btn"
            onClick={handleLogin}
        >
            Sign In
        </button>

        <div className="divider">

            <span>

                OR

            </span>

        </div>

        <button
            className="oauth-btn google"
            onClick={() =>
                window.location.href =
                "http://localhost:8080/oauth2/authorization/google"
            }
        >
            🌐 Continue with Google
        </button>

        <button
            className="oauth-btn github"
            onClick={() =>
                window.location.href =
                "http://localhost:8080/oauth2/authorization/github"
            }
        >
            🐙 Continue with GitHub
        </button>

    </div>

</div>

);
}

export default Login;