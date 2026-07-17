import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";
import "../styles/Roles.css";

function Roles() {

    const [roles, setRoles] = useState([]);
    const [conflicts, setConflicts] = useState([]);

    const [roleName, setRoleName] = useState("");

    const [editingRoleId, setEditingRoleId] = useState(null);
    const [editingRoleName, setEditingRoleName] = useState("");

    const [selectedHierarchyRoleId, setSelectedHierarchyRoleId] = useState("");
    const [selectedParentRoleId, setSelectedParentRoleId] = useState("");

    const [conflictRoleOneId, setConflictRoleOneId] = useState("");
    const [conflictRoleTwoId, setConflictRoleTwoId] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const getErrorMessage = (error, fallback) => {
        return (
            error.response?.data?.message ||
            error.response?.data ||
            error.message ||
            fallback
        );
    };

    const loadData = async () => {
        try {
            const [rolesResponse, conflictsResponse] = await Promise.all([
                api.get("/roles"),
                api.get("/role-conflicts")
            ]);

            setRoles(rolesResponse.data);
            setConflicts(conflictsResponse.data);
        } catch (error) {
            console.error(error);
            alert("Unable to load roles or conflicts.");
        }
    };

    const createRole = async () => {
        if (!roleName.trim()) {
            alert("Enter role name");
            return;
        }

        try {
            await api.post("/roles", {
                name: roleName.trim()
            });

            setRoleName("");
            loadData();
        } catch (error) {
            console.error(error);
            alert(getErrorMessage(error, "Unable to create role."));
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
            await api.put(`/roles/${editingRoleId}`, {
                name: editingRoleName.trim()
            });

            setEditingRoleId(null);
            setEditingRoleName("");
            loadData();
        } catch (error) {
            console.error(error);
            alert(getErrorMessage(error, "Unable to update role."));
        }
    };

    const deleteRole = async (id) => {
        const confirmed = window.confirm("Delete this role?");
        if (!confirmed) return;

        try {
            await api.delete(`/roles/${id}`);
            loadData();
        } catch (error) {
            console.error(error);
            alert(getErrorMessage(error, "Unable to delete role."));
        }
    };

    const saveParentRole = async () => {
        if (!selectedHierarchyRoleId) {
            alert("Select a role first.");
            return;
        }

        if (!selectedParentRoleId) {
            alert("Select a parent role.");
            return;
        }

        try {
            await api.put(
                `/roles/${selectedHierarchyRoleId}/parent/${selectedParentRoleId}`
            );

            setSelectedParentRoleId("");
            loadData();
        } catch (error) {
            console.error(error);
            alert(getErrorMessage(error, "Unable to set parent role."));
        }
    };

    const removeParentRole = async () => {
        if (!selectedHierarchyRoleId) {
            alert("Select a role first.");
            return;
        }

        try {
            await api.delete(`/roles/${selectedHierarchyRoleId}/parent`);
            setSelectedParentRoleId("");
            loadData();
        } catch (error) {
            console.error(error);
            alert(getErrorMessage(error, "Unable to remove parent role."));
        }
    };

    const createConflict = async () => {
        if (!conflictRoleOneId || !conflictRoleTwoId) {
            alert("Select both roles.");
            return;
        }

        if (conflictRoleOneId === conflictRoleTwoId) {
            alert("Choose two different roles.");
            return;
        }

        try {
            await api.post("/role-conflicts", {
                roleOneId: conflictRoleOneId,
                roleTwoId: conflictRoleTwoId
            });

            setConflictRoleOneId("");
            setConflictRoleTwoId("");
            loadData();
        } catch (error) {
            console.error(error);
            alert(getErrorMessage(error, "Unable to create conflict."));
        }
    };

    const deleteConflict = async (id) => {
        const confirmed = window.confirm("Delete this role conflict?");
        if (!confirmed) return;

        try {
            await api.delete(`/role-conflicts/${id}`);
            loadData();
        } catch (error) {
            console.error(error);
            alert(getErrorMessage(error, "Unable to delete conflict."));
        }
    };

    const selectedHierarchyRole = useMemo(() => {
        return roles.find(role => String(role.id) === String(selectedHierarchyRoleId));
    }, [roles, selectedHierarchyRoleId]);

    const parentOptions = useMemo(() => {
        if (!selectedHierarchyRoleId) return roles;

        return roles.filter(role => String(role.id) !== String(selectedHierarchyRoleId));
    }, [roles, selectedHierarchyRoleId]);

    const conflictRoleTwoOptions = useMemo(() => {
        if (!conflictRoleOneId) return roles;

        return roles.filter(role => String(role.id) !== String(conflictRoleOneId));
    }, [roles, conflictRoleOneId]);

    return (
        <div className="role-page">
            <Sidebar />

            <div className="role-content">
                <div className="role-card">
                    <div className="role-header">
                        <div>
                            <h1>Roles</h1>
                            <p>Create and manage application roles.</p>
                        </div>

                        <div className="role-count">
                            {roles.length}
                            <span>Total</span>
                        </div>
                    </div>

                    <div className="role-panels">
                        <div className="role-panel">
                            <h2>Role Hierarchy</h2>
                            <p>Choose a parent role so permissions are inherited automatically.</p>

                            <select
                                value={selectedHierarchyRoleId}
                                onChange={(e) => {
                                    setSelectedHierarchyRoleId(e.target.value);
                                    setSelectedParentRoleId("");
                                }}
                            >
                                <option value="">Select Role</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={selectedParentRoleId}
                                onChange={(e) => setSelectedParentRoleId(e.target.value)}
                            >
                                <option value="">Select Parent Role</option>
                                {parentOptions.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>

                            {selectedHierarchyRole && (
                                <div className="role-badge">
                                    Current parent: {selectedHierarchyRole.parentRole?.name || "None"}
                                </div>
                            )}

                            <div className="panel-actions">
                                <button
                                    type="button"
                                    className="parent-save-btn"
                                    onClick={saveParentRole}
                                >
                                    Save Parent
                                </button>

                                <button
                                    type="button"
                                    className="parent-remove-btn"
                                    onClick={removeParentRole}
                                >
                                    Remove Parent
                                </button>
                            </div>
                        </div>

                        <div className="role-panel">
                            <h2>Separation of Duties</h2>
                            <p>Create conflicting roles that must never be assigned together.</p>

                            <select
                                value={conflictRoleOneId}
                                onChange={(e) => {
                                    setConflictRoleOneId(e.target.value);
                                    setConflictRoleTwoId("");
                                }}
                            >
                                <option value="">Select Role 1</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={conflictRoleTwoId}
                                onChange={(e) => setConflictRoleTwoId(e.target.value)}
                            >
                                <option value="">Select Role 2</option>
                                {conflictRoleTwoOptions.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>

                            <div className="panel-actions">
                                <button
                                    type="button"
                                    className="conflict-save-btn"
                                    onClick={createConflict}
                                >
                                    Add Conflict
                                </button>
                            </div>

                            <div className="conflict-list">
                                {conflicts.length === 0 ? (
                                    <div className="empty-box">No conflicts created yet.</div>
                                ) : (
                                    conflicts.map((conflict) => (
                                        <div key={conflict.id} className="conflict-row">
                                            <div>
                                                <strong>{conflict.roleOne.name}</strong> ↔ <strong>{conflict.roleTwo.name}</strong>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => deleteConflict(conflict.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="role-controls">
                        <input
                            value={roleName}
                            placeholder="Role Name"
                            onChange={(e) => setRoleName(e.target.value)}
                        />

                        <button
                            className="create-btn"
                            onClick={createRole}
                        >
                            + Create Role
                        </button>
                    </div>

                    <div className="role-grid">
                        {roles.map((role) => (
                            <div key={role.id} className="role-box">
                                <div>
                                    <div className="role-icon">🛡️</div>

                                    {editingRoleId === role.id ? (
                                        <input
                                            className="edit-role-input"
                                            value={editingRoleName}
                                            onChange={(e) => setEditingRoleName(e.target.value)}
                                        />
                                    ) : (
                                        <h3>{role.name}</h3>
                                    )}

                                    <p>Role #{role.id}</p>

                                    <div className="role-meta">
                                        Parent: {role.parentRole?.name || "None"}
                                    </div>

                                    <div className="role-meta">
                                        Permissions: {role.permissions?.length || 0}
                                    </div>
                                </div>

                                {editingRoleId === role.id ? (
                                    <div className="role-actions">
                                        <button className="save-btn" onClick={updateRole}>
                                            Save
                                        </button>

                                        <button className="cancel-btn" onClick={cancelEditing}>
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div className="role-actions">
                                        <button
                                            className="edit-btn"
                                            onClick={() => startEditing(role)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteRole(role.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Roles;