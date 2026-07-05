import { Link, useNavigate }
from "react-router-dom";

function Sidebar() {

    const navigate =
        useNavigate();

    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "userId"
        );

        localStorage.removeItem(
            "firstLogin"
        );

        navigate("/");
    };

    return (

        <div
            style={{
                width: "220px",
                padding: "20px",
                background: "#f0f0f0",
                minHeight: "100vh"
            }}
        >

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
            <Link to="/role-groups">
             Role Groups
            </Link>
            <p>
                <Link to="/permissions">
                    Permissions
                </Link>
            </p>

            <p>
                <Link to="/role-groups">
                    Role Groups
                </Link>
            </p>

            <p>
                <Link to="/audit">
                    Audit Logs
                </Link>
            </p>
        

            <hr />

            <button
                onClick={logout}
            >
                Logout
            </button>

        </div>
    );
}

export default Sidebar;