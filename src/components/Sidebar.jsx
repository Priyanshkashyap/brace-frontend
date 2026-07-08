import { Link, useNavigate } from "react-router-dom";
import ThemeSelector from "./ThemeSelector";
import "../styles/Sidebar.css";

function Sidebar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("firstLogin");

        navigate("/");
    };

    return (

        <div className="sidebar">

            <h2>RBAC</h2>

            <hr />

            <p>
                <Link to="/dashboard">
                    Dashboard
                </Link>
            </p>

            <p>
                <Link to="/users">
                    Users
                </Link>
            </p>

            <p>
                <Link to="/roles">
                    Roles
                </Link>
            </p>

            <p>
                <Link to="/role-groups">
                    Role Groups
                </Link>
            </p>

            <p>
                <Link to="/permissions">
                    Permissions
                </Link>
            </p>

            <p>
                <Link to="/audit">
                    Audit Logs
                </Link>
            </p>

            <hr />

            <button onClick={logout}>
                Logout
            </button>

            <hr />

            <h3>Theme</h3>

            <ThemeSelector />

        </div>

    );
}

export default Sidebar;