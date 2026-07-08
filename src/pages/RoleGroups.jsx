import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/RoleGroups.css";

function RoleGroups() {

    const navigate = useNavigate();

    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState("");

    useEffect(() => {
        loadGroups();
    }, []);

    const loadGroups = async () => {
        try {

            const response = await api.get("/role-groups");

            setGroups(response.data);

        } catch (error) {

            console.error(error);

            alert("Unable to load role groups.");
        }
    };

    const createGroup = async () => {

        if (!groupName.trim()) {
            alert("Enter group name");
            return;
        }

        try {

            await api.post("/role-groups", {
                name: groupName
            });

            setGroupName("");

            loadGroups();

        } catch (error) {

            console.error(error);

            alert("Unable to create role group.");
        }
    };

    const deleteGroup = async (id) => {

        const confirmed =
            window.confirm(
                "Delete this role group?"
            );

        if (!confirmed) return;

        try {

            await api.delete(`/role-groups/${id}`);

            loadGroups();

        } catch (error) {

            console.error(error);

            alert("Unable to delete role group.");
        }
    };

    return (

        <div className="group-page">

            <Sidebar />

            <div className="group-content">

                <div className="group-card">

                    <div className="group-header">

                        <div>

                            <h1>
                                Role Groups
                            </h1>

                            <p>
                                Organize multiple roles into reusable groups.
                            </p>

                        </div>

                        <div className="group-count">

                            {groups.length}

                            <span>Total</span>

                        </div>

                    </div>

                    <div className="group-controls">

                        <input
                            value={groupName}
                            placeholder="Role Group Name"
                            onChange={(e)=>
                                setGroupName(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            className="create-btn"
                            onClick={createGroup}
                        >
                            + Create Group
                        </button>

                    </div>

                    <div className="group-grid">

                        {

                            groups.map(group=>(

                                <div
                                    key={group.id}
                                    className="group-box"
                                >

                                    <div>

                                        <div className="group-icon">
                                            👥
                                        </div>

                                        <h3>
                                            {group.name}
                                        </h3>

                                        <p>
                                            Group #{group.id}
                                        </p>

                                    </div>

                                    <div className="group-actions">

                                        <button
                                            className="manage-btn"
                                            onClick={()=>
                                                navigate(
                                                    `/role-groups/${group.id}/manage-roles`
                                                )
                                            }
                                        >
                                            Manage Roles
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={()=>
                                                deleteGroup(group.id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                </div>

            </div>

        </div>

    );
}

export default RoleGroups;