import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";
import "../styles/ManageGroupRoles.css";

function ManageGroupRoles() {

    const { id } = useParams();

    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState("");
    const [group, setGroup] = useState(null);

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
            const groupResponse = await api.get(`/role-groups/${id}`);

            setRoles(roleResponse.data);
            setGroup(groupResponse.data);
        } catch (error) {
            console.error(error);
            alert("Unable to load data.");
        }
    };

    const assignRole = async () => {
        if (!selectedRole) {
            alert("Select a role first.");
            return;
        }

        try {
            await api.put(`/role-groups/${id}/roles/${selectedRole}`);

            alert("Role assigned successfully.");
            setSelectedRole("");
            loadData();
        } catch (error) {
            console.error(error);
            alert(getErrorMessage(error, "Unable to assign role."));
        }
    };

    return (
        <div className="mgr-page">
            <Sidebar />

            <div className="mgr-content">
                <div className="mgr-card">
                    <div className="mgr-header">
                        <div>
                            <h1>Manage Group Roles</h1>
                            <p>Assign roles to this role group.</p>
                        </div>

                        {group && (
                            <div className="mgr-count">
                                {group.roles.length}
                                <span>Roles</span>
                            </div>
                        )}
                    </div>

                    {group && (
                        <>
                            <div className="group-info">
                                👥 {group.name}
                            </div>

                            <h3 className="section-title">Existing Roles</h3>

                            <div className="role-list">
                                {group.roles?.length === 0 ? (
                                    <div className="empty-box">
                                        No roles assigned yet.
                                    </div>
                                ) : (
                                    group.roles.map(role => (
                                        <div
                                            key={role.id}
                                            className="role-chip"
                                        >
                                            🛡 {role.name}
                                        </div>
                                    ))
                                )}
                            </div>

                            <hr />

                            <h3 className="section-title">Assign New Role</h3>

                            <div className="assign-row">
                                <select
                                    value={selectedRole}
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                >
                                    <option value="">Select Role</option>
                                    {roles.map(role => (
                                        <option key={role.id} value={role.id}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>

                                <button onClick={assignRole}>
                                    ➕ Assign Role
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ManageGroupRoles;