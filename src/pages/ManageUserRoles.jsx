import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";

function ManageUserRoles() {

    const { id } = useParams();

    const [roles, setRoles] = useState([]);
    const [groups, setGroups] = useState([]);

    const [selectedRole, setSelectedRole] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            const roleResponse =
                    await api.get("/roles");

            const groupResponse =
                    await api.get("/role-groups");

            setRoles(roleResponse.data);

            setGroups(groupResponse.data);

        } catch (error) {

            console.error(error);

            alert("Unable to load roles/groups");
        }
    };

    const assignRole = async () => {

        if (!selectedRole) {
            alert("Select role");
            return;
        }

        try {

            await api.put(
                    `/users/${id}/roles/${selectedRole}`
            );

            alert("Role assigned");

        } catch (error) {

            console.error(error);

            alert("Unable to assign role");
        }
    };

    const assignGroup = async () => {

        if (!selectedGroup) {
            alert("Select group");
            return;
        }

        try {

            await api.put(
                    `/users/${id}/groups/${selectedGroup}`
            );

            alert("Group assigned");

        } catch (error) {

            console.error(error);

            alert("Unable to assign group");
        }
    };

    return (

            <div style={{display: "flex"}}>

                <Sidebar/>

                <div
                        style={{
                            padding: "25px",
                            flex: 1
                        }}
                >

                    <h1>Manage Roles</h1>

                    <hr/>

                    <h2>Assign Role</h2>

                    <select
                            value={selectedRole}
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
                                            value={role.name}
                                    >
                                        {role.name}
                                    </option>

                            ))
                        }

                    </select>

                    <button
                            onClick={assignRole}
                    >
                        Assign Role
                    </button>

                    <hr/>

                    <h2>Assign Role Group</h2>

                    <select
                            value={selectedGroup}
                            onChange={(e) =>
                                    setSelectedGroup(
                                            e.target.value
                                    )
                            }
                    >

                        <option value="">
                            Select Group
                        </option>

                        {
                            groups.map(group => (

                                    <option
                                            key={group.id}
                                            value={group.id}
                                    >
                                        {group.name}
                                    </option>

                            ))
                        }

                    </select>

                    <button
                            onClick={assignGroup}
                    >
                        Assign Group
                    </button>

                </div>

            </div>

    );
}

export default ManageUserRoles;