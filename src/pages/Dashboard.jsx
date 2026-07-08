import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";

function Dashboard() {

    const theme =
        localStorage.getItem("theme") || "LIGHT";

    const backgroundColor =
        theme === "DARK"
            ? "#111827"
            : theme === "ADMIN"
            ? "#0f172a"
            : "#f4f7fb";

    const textColor =
        theme === "LIGHT"
            ? "#0f172a"
            : "#ffffff";

    const cardColor =
        theme === "LIGHT"
            ? "#ffffff"
            : theme === "DARK"
            ? "#1f2937"
            : "#1e293b";

    return (

        <div
            style={{
                display: "flex",
                background: backgroundColor,
                color: textColor
            }}
        >

            <Sidebar />

            <div
                className="dashboard-page"
            >

                <div
                    className="dashboard-header"
                >

                    <h1
                        className="dashboard-title"
                    >
                        Dashboard
                    </h1>

                    <p
                        className="dashboard-subtitle"
                    >
                        Welcome back. Manage users, permissions and your RBAC system.
                    </p>

                </div>

                <div
                    className="dashboard-grid"
                >

                    <div
                        className="dashboard-card"
                        style={{
                            background: cardColor
                        }}
                    >

                        <div
                            className="dashboard-icon"
                        >
                            👥
                        </div>

                        <h2>
                            Users
                        </h2>

                        <p>
                            Manage all registered users.
                        </p>

                    </div>

                    <div
                        className="dashboard-card"
                        style={{
                            background: cardColor
                        }}
                    >

                        <div
                            className="dashboard-icon"
                        >
                            🛡️
                        </div>

                        <h2>
                            Roles
                        </h2>

                        <p>
                            Create and manage roles.
                        </p>

                    </div>

                    <div
                        className="dashboard-card"
                        style={{
                            background: cardColor
                        }}
                    >

                        <div
                            className="dashboard-icon"
                        >
                            🔑
                        </div>

                        <h2>
                            Permissions
                        </h2>

                        <p>
                            Configure system permissions.
                        </p>

                    </div>

                    <div
                        className="dashboard-card"
                        style={{
                            background: cardColor
                        }}
                    >

                        <div
                            className="dashboard-icon"
                        >
                            📂
                        </div>

                        <h2>
                            Role Groups
                        </h2>

                        <p>
                            Organize roles into groups.
                        </p>

                    </div>

                    <div
                        className="dashboard-card"
                        style={{
                            background: cardColor
                        }}
                    >

                        <div
                            className="dashboard-icon"
                        >
                            📜
                        </div>

                        <h2>
                            Audit Logs
                        </h2>

                        <p>
                            Monitor every action performed.
                        </p>

                    </div>

                    <div
                        className="dashboard-card"
                        style={{
                            background: cardColor
                        }}
                    >

                        <div
                            className="dashboard-icon"
                        >
                            📊
                        </div>

                        <h2>
                            Reports
                        </h2>

                        <p>
                            Export users and analytics.
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;