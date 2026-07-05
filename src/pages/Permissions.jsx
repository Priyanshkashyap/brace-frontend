import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";

function Permissions() {

    const [permissions, setPermissions] =
        useState([]);

    const [permissionName, setPermissionName] =
        useState("");

    useEffect(() => {
        loadPermissions();
    }, []);

    const loadPermissions = async () => {

        const response =
            await api.get("/permissions");

        setPermissions(response.data);
    };

    const createPermission = async () => {

        await api.post(
            "/permissions",
            {
                name: permissionName
            }
        );

        setPermissionName("");

        loadPermissions();
    };

    const deletePermission = async (
            id
    ) => {

        await api.delete(
            `/permissions/${id}`
        );

        loadPermissions();
    };

    return (

        <div style={{
            display: "flex"
        }}>

            <Sidebar />

            <div style={{
                flex: 1,
                padding: "20px"
            }}>

                <h1>Permissions</h1>

                <input
                    value={permissionName}
                    onChange={(e) =>
                        setPermissionName(
                            e.target.value
                        )
                    }
                    placeholder="Permission Name"
                />

                <button
                    onClick={
                        createPermission
                    }
                >
                    Create Permission
                </button>

                <hr />

                {
                    permissions.map(permission => (

                        <div
                            key={permission.id}
                        >

                            {permission.name}

                            <button
                                onClick={() =>
                                    deletePermission(
                                        permission.id
                                    )
                                }
                            >
                                Delete
                            </button>

                        </div>

                    ))
                }

            </div>

        </div>

    );
}

export default Permissions;