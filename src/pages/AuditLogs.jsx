import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";
import "../styles/AuditLogs.css";

function AuditLogs() {

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [usernameFilter, setUsernameFilter] = useState("");
    const [actionFilter, setActionFilter] = useState("");

    useEffect(() => {
        loadLogs();
    }, []);

    const loadLogs = async () => {

        try {

            const response =
                await api.get("/audit");

            setLogs(response.data);

        } catch (error) {

            console.error(error);
            alert("Unable to load audit logs.");

        } finally {

            setLoading(false);

        }

    };

    const filterByUser = async () => {

        if (!usernameFilter.trim()) {
            loadLogs();
            return;
        }

        try {

            const response =
                await api.get(
                    `/audit/user/${usernameFilter}`
                );

            setLogs(response.data);

        } catch (error) {

            console.error(error);
            alert("Unable to filter logs.");

        }

    };

    const filterByAction = async () => {

        if (!actionFilter.trim()) {
            loadLogs();
            return;
        }

        try {

            const response =
                await api.get(
                    `/audit/action/${actionFilter}`
                );

            setLogs(response.data);

        } catch (error) {

            console.error(error);
            alert("Unable to filter logs.");

        }

    };

    return (

        <div
            style={{
                display: "flex"
            }}
        >

            <Sidebar />

            <div className="audit-page">

                <div className="audit-card">

                    <h1 className="audit-title">
                        Audit Logs
                    </h1>

                    <p className="audit-subtitle">
                        Monitor every activity performed inside your RBAC system.
                    </p>

                    <div className="filter-bar">

                        <input
                            className="filter-input"
                            placeholder="Username"
                            value={usernameFilter}
                            onChange={(e) =>
                                setUsernameFilter(e.target.value)
                            }
                        />

                        <button
                            className="audit-button user-btn"
                            onClick={filterByUser}
                        >
                            Filter User
                        </button>

                        <input
                            className="filter-input"
                            placeholder="Action"
                            value={actionFilter}
                            onChange={(e) =>
                                setActionFilter(e.target.value)
                            }
                        />

                        <button
                            className="audit-button action-btn"
                            onClick={filterByAction}
                        >
                            Filter Action
                        </button>

                        <button
                            className="audit-button clear-btn"
                            onClick={loadLogs}
                        >
                            Clear Filters
                        </button>

                    </div>

                    {

                        loading ?

                            <h2 className="loading">
                                Loading...
                            </h2>

                            :

                            <table className="audit-table">

                                <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>Action</th>

                                    <th>User</th>

                                    <th>Timestamp</th>

                                </tr>

                                </thead>

                                <tbody>

                                {

                                    logs.map(log => (

                                        <tr key={log.id}>

                                            <td>
                                                {log.id}
                                            </td>

                                            <td>

                                                <span className="action-badge">

                                                    {log.action}

                                                </span>

                                            </td>

                                            <td>

                                                <div className="user-badge">

                                                    <div className="user-circle">

                                                        {log.username
                                                            ? log.username[0].toUpperCase()
                                                            : "U"}

                                                    </div>

                                                    {log.username}

                                                </div>

                                            </td>

                                            <td>

                                                <span className="time-badge">

                                                    {new Date(
                                                        log.timestamp
                                                    ).toLocaleString()}

                                                </span>

                                            </td>

                                        </tr>

                                    ))

                                }

                                </tbody>

                            </table>

                    }

                </div>

            </div>

        </div>

    );

}

export default AuditLogs;