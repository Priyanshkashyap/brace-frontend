import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";
import "../styles/Roles.css";

function Roles() {

    const [roles, setRoles] = useState([]);
    const [roleName, setRoleName] = useState("");

    const [editingRoleId, setEditingRoleId] = useState(null);
    const [editingRoleName, setEditingRoleName] = useState("");

    useEffect(() => {
        loadRoles();
    }, []);

    const loadRoles = async () => {

        try {

            const response =
                await api.get("/roles");

            setRoles(response.data);

        } catch (error) {

            console.error(error);

            alert("Unable to load roles.");

        }

    };

    const createRole = async () => {

        if (!roleName.trim()) {

            alert("Enter role name");

            return;

        }

        try {

            await api.post(
                "/roles",
                {
                    name: roleName
                }
            );

            setRoleName("");

            loadRoles();

        } catch (error) {

            console.error(error);

            alert("Unable to create role.");

        }

    };

    const startEditing = (role) => {

        setEditingRoleId(role.id);

        setEditingRoleName(role.name);

    };

    const cancelEditing = () => {

        setEditingRoleId(null);

        setEditingRoleName("");

    };

    const updateRole = async () => {

        if (!editingRoleName.trim()) {

            alert("Role name cannot be empty.");

            return;

        }

        try {

            await api.put(

                `/roles/${editingRoleId}`,

                {
                    name: editingRoleName
                }

            );

            setEditingRoleId(null);

            setEditingRoleName("");

            loadRoles();

        } catch (error) {

            console.error(error);

            alert("Unable to update role.");

        }

    };

    const deleteRole = async (id) => {

        const confirmed =
            window.confirm(
                "Delete this role?"
            );

        if (!confirmed) return;

        try {

            await api.delete(
                `/roles/${id}`
            );

            loadRoles();

        } catch (error) {

            console.error(error);

            alert("Unable to delete role.");

        }

    };

    return (

        <div className="role-page">

            <Sidebar />

            <div className="role-content">

                <div className="role-card">

                    <div className="role-header">

                        <div>

                            <h1>
                                Roles
                            </h1>

                            <p>
                                Create and manage application roles.
                            </p>

                        </div>

                        <div className="role-count">

                            {roles.length}

                            <span>Total</span>

                        </div>

                    </div>

                    <div className="role-controls">

                        <input
                            value={roleName}
                            placeholder="Role Name"
                            onChange={(e) =>
                                setRoleName(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            className="create-btn"
                            onClick={createRole}
                        >
                            + Create Role
                        </button>

                    </div>

                    <div className="role-grid">

                        {

                            roles.map(role => (

                                <div
                                    key={role.id}
                                    className="role-box"
                                >

                                    <div>

                                        <div className="role-icon">

                                            🛡️

                                        </div>

                                        {

                                            editingRoleId === role.id ?

                                                <input

                                                    className="edit-role-input"

                                                    value={editingRoleName}

                                                    onChange={(e) =>
                                                        setEditingRoleName(
                                                            e.target.value
                                                        )
                                                    }

                                                />

                                            :

                                                <h3>

                                                    {role.name}

                                                </h3>

                                        }

                                        <p>

                                            Role #{role.id}

                                        </p>

                                    </div>

                                    {

                                        editingRoleId === role.id ?

                                            <div className="role-actions">

                                                <button
                                                    className="save-btn"
                                                    onClick={updateRole}
                                                >

                                                    Save

                                                </button>

                                                <button
                                                    className="cancel-btn"
                                                    onClick={cancelEditing}
                                                >

                                                    Cancel

                                                </button>

                                            </div>

                                        :

                                            <div className="role-actions">

                                                <button
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        startEditing(role)
                                                    }
                                                >

                                                    Edit

                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        deleteRole(role.id)
                                                    }
                                                >

                                                    Delete

                                                </button>

                                            </div>

                                    }

                                </div>

                            ))

                        }

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Roles;