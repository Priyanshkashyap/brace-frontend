import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";

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

            alert(
                "Unable to load audit logs."
            );

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

            alert(
                "Unable to filter logs."
            );
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

            alert(
                "Unable to filter logs."
            );
        }
    };

    return (

        <div
            style={{
                display: "flex"
            }}
        >

            <Sidebar />

            <div
                style={{
                    flex: 1,
                    padding: "25px"
                }}
            >

                <h1>Audit Logs</h1>

                <hr />

                <div>

                    <input
                        placeholder="Username"
                        value={usernameFilter}
                        onChange={(e) =>
                            setUsernameFilter(
                                e.target.value
                            )
                        }
                    />

                    <button
                        onClick={filterByUser}
                    >
                        Filter User
                    </button>

                    {"  "}

                    <input
                        placeholder="Action"
                        value={actionFilter}
                        onChange={(e) =>
                            setActionFilter(
                                e.target.value
                            )
                        }
                    />

                    <button
                        onClick={filterByAction}
                    >
                        Filter Action
                    </button>

                    {"  "}

                    <button
                        onClick={loadLogs}
                    >
                        Clear Filters
                    </button>

                </div>

                <br />

                {

                    loading ?

                        <h3>
                            Loading...
                        </h3>

                        :

                        <table
                            border="1"
                            cellPadding="10"
                            style={{
                                width: "100%",
                                borderCollapse:
                                    "collapse"
                            }}
                        >

                            <thead>

                            <tr>

                                <th>ID</th>

                                <th>Action</th>

                                <th>Username</th>

                                <th>Timestamp</th>

                            </tr>

                            </thead>

                            <tbody>

                            {

                                logs.map(log => (

                                    <tr
                                        key={log.id}
                                    >

                                        <td>
                                            {log.id}
                                        </td>

                                        <td>
                                            {log.action}
                                        </td>

                                        <td>
                                            {log.username}
                                        </td>

                                        <td>
                                            {log.timestamp}
                                        </td>

                                    </tr>

                                ))

                            }

                            </tbody>

                        </table>

                }

            </div>

        </div>

    );
}

export default AuditLogs;