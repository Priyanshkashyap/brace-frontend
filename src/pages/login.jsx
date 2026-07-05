import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // the function
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async () => {
            try {
                const response = await api.post("/users/login",
                        {
                            email,
                            password
                        }
                    );
                login(response.data.token);
                localStorage.setItem("firstLogin",response.data.firstLogin); // only this is not enough as ui as we need to reuse a value e.g jwt at a lot of files and if we remove it from one it should be removed from all automatically. thus we need context(also to avoid prop drilling)
                if ( response.data.firstLogin)
                     {
                        navigate("/complete-profile");

                } else {

                    navigate("/dashboard");
                }
            } catch (err) {

                alert("Login Failed");
            }
        };

    return (
        <div>
            <h1>Login</h1>

            <input
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(
                        e.target.value
                    )
                }
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(
                        e.target.value
                    )
                }
            />

            <button
                onClick={handleLogin}
            >
                Login
            </button>
            <button
    onClick={() =>
        window.location.href =
        "http://localhost:8080/oauth2/authorization/google"
    }
>
    Continue with Google
</button>

<button
    onClick={() =>
        window.location.href =
        "http://localhost:8080/oauth2/authorization/github"
    }
>
    Continue with GitHub
</button>

        </div>
    );
}

export default login;