import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";
import "../styles/Permissions.css";

function Permissions() {

    const [permissions, setPermissions] = useState([]);
    const [permissionName, setPermissionName] = useState("");

    useEffect(() => {
        loadPermissions();
    }, []);

    const loadPermissions = async () => {
        try {
            const response = await api.get("/permissions");
            setPermissions(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const createPermission = async () => {

        if (!permissionName.trim()) return;

        await api.post("/permissions", {
            name: permissionName
        });

        setPermissionName("");
        loadPermissions();
    };

    const deletePermission = async (id) => {

        if (!window.confirm("Delete this permission?"))
            return;

        await api.delete(`/permissions/${id}`);

        loadPermissions();
    };

    return (

        <div className="permission-page">

            <Sidebar />

            <div className="permission-content">

                <div className="permission-card">

                    <div className="permission-header">

                        <div>

                            <h1>
                                Permissions
                            </h1>

                            <p>
                                Create, manage and organize application permissions.
                            </p>

                        </div>

                        <div className="permission-count">

                            {permissions.length}

                            <span>Total</span>

                        </div>

                    </div>

                    <div className="permission-controls">

                        <input
                            value={permissionName}
                            placeholder="Permission Name"
                            onChange={(e)=>
                                setPermissionName(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            className="create-btn"
                            onClick={createPermission}
                        >
                            + Create Permission
                        </button>

                    </div>

                    <div className="permission-grid">

                        {

                            permissions.map(permission=>(

                                <div
                                    key={permission.id}
                                    className="permission-box"
                                >

                                    <div>

                                        <div className="permission-icon">
                                            🔐
                                        </div>

                                        <h3>
                                            {permission.name}
                                        </h3>

                                        <p>
                                            Permission #{permission.id}
                                        </p>

                                    </div>

                                    <button
                                        className="delete-btn"
                                        onClick={()=>
                                            deletePermission(permission.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            ))

                        }

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Permissions;