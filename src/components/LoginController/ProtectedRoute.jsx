import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

const ProtectedRoute = ({ element, roles }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(userRole)) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    return <Navigate to="/login" />;
  }

  return element;
};

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
