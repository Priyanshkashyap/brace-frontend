import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";

function Roles() {

    const [roles, setRoles] =
            useState([]);

    const [roleName, setRoleName] =
            useState("");

    useEffect(() => {
        loadRoles();
    }, []);

    const loadRoles = async () => {

        const response =
                await api.get("/roles");

        setRoles(response.data);
    };

    const createRole = async () => {

        await api.post(
                "/roles",
                {
                    name: roleName
                }
        );

        setRoleName("");

        loadRoles();
    };

    const deleteRole = async (
            id
    ) => {

        await api.delete(
                `/roles/${id}`
        );

        loadRoles();
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

                    <h1>
                        Roles
                    </h1>

                    <input
                            value={roleName}
                            onChange={(e)=>
                                    setRoleName(
                                            e.target.value
                                    )
                            }
                            placeholder="Role Name"
                    />

                    <button
                            onClick={
                                createRole
                            }
                    >
                        Create Role
                    </button>

                    <hr/>

                    {
                        roles.map(role => (

                                <div
                                        key={role.id}
                                >

                                    {role.name}

                                    <button
                                            onClick={() =>
                                                    deleteRole(
                                                            role.id
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

export default Roles;