import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./pages/login";
import ManageGroupRoles from "./pages/ManageGroupRoles";
import Dashboard from "./pages/Dashboard";
import AuditLogs from "./pages/AuditLogs";
import CompleteProfile from "./pages/CompleteProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleGroups from "./pages/RoleGroups";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
import EditUser from "./pages/EditUser";
import ManageUserRoles from "./pages/ManageUserRoles";
import Roles from "./pages/Roles";
import Permissions from "./pages/Permissions";
import OAuthSuccess from "./pages/OAuthSuccess";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/complete-profile"
                    element={
                        <ProtectedRoute>
                            <CompleteProfile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                     path="/users"
                     element={
                <ProtectedRoute>
                    <Users />
                </ProtectedRoute>
             }
        />
        <Route
            path="/users/:id"
            element={
        <ProtectedRoute>
            <UserDetails />
        </ProtectedRoute>
    }
/>
        <Route
            path="/users/edit/:id"
             element={
        <ProtectedRoute>
            <EditUser />
        </ProtectedRoute>
    }
/>
<Route
        path="/users/:id/manage-roles"
        element={
            <ProtectedRoute>
                <ManageUserRoles/>
            </ProtectedRoute>
        }
/>
<Route
        path="/roles"
        element={
            <ProtectedRoute>
                <Roles />
            </ProtectedRoute>
        }
/>
<Route
        path="/role-groups/:id/manage-roles"
        element={
            <ProtectedRoute>
                <ManageGroupRoles />
            </ProtectedRoute>
        }
/>
<Route
    path="/permissions"
    element={
        <ProtectedRoute>
            <Permissions />
        </ProtectedRoute>
    }
/>
<Route
        path="/role-groups"
        element={
            <ProtectedRoute>
                <RoleGroups />
            </ProtectedRoute>
        }
/>
<Route
    path="/audit"
    element={
        <ProtectedRoute>
            <AuditLogs />
        </ProtectedRoute>
    }
/>
<Route
    path="/oauth-success"
    element={<OAuthSuccess />}
/>
            </Routes>

        </BrowserRouter>
    );
}

export default App;