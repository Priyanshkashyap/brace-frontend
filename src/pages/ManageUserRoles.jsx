import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";
import "../styles/ManageUserRoles.css";

function ManageUserRoles() {

    const { id } = useParams();

    const [roles, setRoles] = useState([]);
    const [groups, setGroups] = useState([]);

    const [selectedRole, setSelectedRole] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");

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
            const roleResponse = await api.get("/roles");
            const groupResponse = await api.get("/role-groups");

            setRoles(roleResponse.data);
            setGroups(groupResponse.data);
        }
        catch (error) {
            console.error(error);
            alert("Unable to load roles/groups");
        }
    };

    const assignRole = async () => {
        if (!selectedRole) {
            alert("Select a role");
            return;
        }

        try {
            await api.put(`/users/${id}/roles/${selectedRole}`);
            alert("Role assigned successfully");
            setSelectedRole("");
        }
        catch (error) {
            console.error(error);
            alert(getErrorMessage(error, "Unable to assign role"));
        }
    };

    const assignGroup = async () => {
        if (!selectedGroup) {
            alert("Select a group");
            return;
        }

        try {
            await api.put(`/users/${id}/groups/${selectedGroup}`);
            alert("Group assigned successfully");
            setSelectedGroup("");
        }
        catch (error) {
            console.error(error);
            alert(getErrorMessage(error, "Unable to assign group"));
        }
    };

    return (
        <div className="mur-page">
            <Sidebar />

            <div className="mur-content">
                <div className="mur-card">
                    <div className="mur-header">
                        <div>
                            <h1>Manage User Roles</h1>
                            <p>Assign individual roles and role groups.</p>
                        </div>

                        <div className="mur-avatar">
                            👤
                        </div>
                    </div>

                    <div className="mur-grid">
                        <div className="mur-section">
                            <div className="section-icon role-icon">🛡️</div>
                            <h2>Assign Role</h2>
                            <p>Give this user an individual role.</p>

                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                            >
                                <option value="">Select Role</option>
                                {roles.map(role => (
                                    <option key={role.id} value={role.name}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>

                            <button
                                className="assign-btn"
                                onClick={assignRole}
                            >
                                Assign Role
                            </button>
                        </div>

                        <div className="mur-section">
                            <div className="section-icon group-icon">👥</div>
                            <h2>Assign Role Group</h2>
                            <p>Assign multiple roles together.</p>

                            <select
                                value={selectedGroup}
                                onChange={(e) => setSelectedGroup(e.target.value)}
                            >
                                <option value="">Select Group</option>
                                {groups.map(group => (
                                    <option key={group.id} value={group.id}>
                                        {group.name}
                                    </option>
                                ))}
                            </select>

                            <button
                                className="assign-group-btn"
                                onClick={assignGroup}
                            >
                                Assign Group
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageUserRoles;