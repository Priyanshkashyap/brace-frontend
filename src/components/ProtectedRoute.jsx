import { Navigate } from "react-router-dom";
//ProtectedRoute is basically the frontend equivalent of middleware/filter.

function ProtectedRoute({ children }) {

    const token =
        localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;