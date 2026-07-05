import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";

function ManageGroupRoles() {

    const { id } = useParams();

    const [roles, setRoles] = useState([]);

    const [selectedRole, setSelectedRole] = useState("");

    const [group, setGroup] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            const roleResponse =
                    await api.get("/roles");

            const groupResponse =
                    await api.get(
                            `/role-groups/${id}`
                    );

            setRoles(
                    roleResponse.data
            );

            setGroup(
                    groupResponse.data
            );

        } catch (error) {

            console.error(error);

            alert(
                    "Unable to load data."
            );
        }
    };

    const assignRole = async () => {

        if (!selectedRole) {

            alert(
                    "Select a role first."
            );

            return;
        }

        try {

            await api.put(
                    `/role-groups/${id}/roles/${selectedRole}`
            );

            alert(
                    "Role assigned successfully."
            );

            loadData();

        } catch (error) {

            console.error(error);

            alert(
                    "Unable to assign role."
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

                    <h1>
                        Manage Group Roles
                    </h1>

                    <hr />

                    {
                        group && (

                                <>
                                    <h2>
                                        Group:
                                        {" "}
                                        {group.name}
                                    </h2>

                                    <h3>
                                        Existing Roles
                                    </h3>

                                    {
                                        group.roles?.length === 0 ?

                                                <p>
                                                    No roles assigned.
                                                </p>

                                                :

                                                group.roles.map(role => (

                                                        <p
                                                                key={role.id}
                                                        >
                                                            {role.name}
                                                        </p>

                                                ))
                                    }

                                    <hr />

                                    <h3>
                                        Assign New Role
                                    </h3>

                                    <select
                                            value={
                                                selectedRole
                                            }
                                            onChange={(e) =>
                                                    setSelectedRole(
                                                            e.target.value
                                                    )
                                            }
                                    >

                                        <option value="">
                                            Select Role
                                        </option>

                                        {
                                            roles.map(role => (

                                                    <option
                                                            key={role.id}
                                                            value={role.id}
                                                    >
                                                        {role.name}
                                                    </option>

                                            ))
                                        }

                                    </select>

                                    {" "}

                                    <button
                                            onClick={
                                                assignRole
                                            }
                                    >
                                        Assign Role
                                    </button>
                                </>

                        )
                    }

                </div>

            </div>

    );
}

export default ManageGroupRoles;