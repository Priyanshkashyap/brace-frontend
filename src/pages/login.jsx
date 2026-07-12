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
    const [forgotMode, setForgotMode] = useState(false);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
    const handleForgotPassword = async () => {

    const res = await api.post(
        "/users/forgot-password",
        { email }
    );

    setQuestion(res.data);
};
const handleResetPassword = async () => {
    if (!answer.trim()) {
        alert("Please enter the secret answer");
        return;
    }

    if (!newPassword.trim()) {
        alert("Please enter a new password");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    try {
        await api.post("/users/reset-password", {
            email,
            answer,
            newPassword,
        });

        alert("Password reset successful");

        setForgotMode(false);
        setQuestion("");
        setAnswer("");
        setNewPassword("");
        setConfirmPassword("");

    } catch (err) {
        alert(
            err.response?.data?.message ||
            "Password reset failed"
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

            {!forgotMode ? (

                <>
                    <p className="login-subtitle">
                        Sign in to continue
                    </p>

                    <div className="input-group">
                        <label>Email</label>

                        <input
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) =>
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
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />
                    </div>

                    <div
                        style={{
                            textAlign: "right",
                            marginBottom: "15px",
                            paddingRight:"30px"
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => setForgotMode(true)}
                            style={{
                                background: "none",
                                border: "none",
                                color: "#2563eb",
                                cursor: "pointer"
                            }}
                        >
                            Forgot Password?
                        </button>
                    </div>

                    <div className="captcha-box">
                        <ReCAPTCHA
                            sitekey={
                                import.meta.env
                                    .VITE_RECAPTCHA_SITE_KEY
                            }
                            onChange={setCaptchaToken}
                        />
                    </div>

                    <button
                        className="login-btn"
                        onClick={handleLogin}
                    >
                        Sign In
                    </button>

                    <div className="divider">
                        <span>OR</span>
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
                </>

            ) : (

                <>
                    <p className="login-subtitle">
                        Reset Password
                    </p>

                    {!question ? (

                        <>
                            <div className="input-group">
                                <label>Email</label>

                                <input
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                />
                            </div>

                            <button
                                className="login-btn"
                                onClick={handleForgotPassword}
                            >
                                Continue
                            </button>
                        </>

                    ) : (

                        <>
                            <div
                                style={{
                                    marginBottom: "20px",
                                    fontWeight: "bold"
                                }}
                            >
                                {question}
                            </div>

                            <div className="input-group">
                                <label>Secret Answer</label>

                                <input
                                    value={answer}
                                    onChange={(e) =>
                                        setAnswer(e.target.value)
                                    }
                                />
                            </div>

                            <div className="input-group">
                                <label>New Password</label>

                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                />
                            </div>

                            <div className="input-group">
                                <label>Confirm Password</label>

                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <button
                                className="login-btn"
                                onClick={handleResetPassword}
                            >
                                Reset Password
                            </button>
                        </>

                    )}

                    <button
                        type="button"
                        style={{
                            marginTop: "15px",
                            background: "none",
                            border: "none",
                            color: "#2563eb",
                            cursor: "pointer"
                        }}
                        onClick={() => {
                            setForgotMode(false);
                            setQuestion("");
                            setAnswer("");
                            setNewPassword("");
                            setConfirmPassword("");
                        }}
                    >
                        ← Back to Login
                    </button>

                </>

            )}

        </div>
    </div>
);
}

export default Login;