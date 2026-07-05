import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function RoleGroups() {

    const navigate = useNavigate();

    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState("");

    useEffect(() => {
        loadGroups();
    }, []);

    const loadGroups = async () => {
        try {

            const response = await api.get(
                "/role-groups"
            );

            setGroups(response.data);

        } catch (error) {

            console.error(error);

            alert(
                "Unable to load role groups."
            );
        }
    };

    const createGroup = async () => {

        if (!groupName.trim()) {
            alert("Enter group name");
            return;
        }

        try {

            await api.post(
                "/role-groups",
                {
                    name: groupName
                }
            );

            setGroupName("");

            loadGroups();

        } catch (error) {

            console.error(error);

            alert(
                "Unable to create role group."
            );
        }
    };

    const deleteGroup = async (id) => {

        const confirmed = window.confirm(
            "Delete this role group?"
        );

        if (!confirmed) return;

        try {

            await api.delete(
                `/role-groups/${id}`
            );

            loadGroups();

        } catch (error) {

            console.error(error);

            alert(
                "Unable to delete role group."
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

                <h1>Role Groups</h1>

                <hr />

                <input
                    value={groupName}
                    onChange={(e) =>
                        setGroupName(
                            e.target.value
                        )
                    }
                    placeholder="Role Group Name"
                />

                <button
                    onClick={createGroup}
                >
                    Create Group
                </button>

                <hr />

                {
                    groups.map(group => (

                        <div
                            key={group.id}
                            style={{
                                marginBottom: "15px"
                            }}
                        >

                            <strong>
                                {group.name}
                            </strong>

                            {" "}

                            <button
                                onClick={() =>
                                    deleteGroup(
                                        group.id
                                    )
                                }
                            >
                                Delete
                            </button>

                            <button
                                onClick={() =>
                                    navigate(
                                        `/role-groups/${group.id}/manage-roles`
                                    )
                                }
                            >
                                Manage Roles
                            </button>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default RoleGroups;