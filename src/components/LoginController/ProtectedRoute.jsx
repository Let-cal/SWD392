import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

const ProtectedRoute = ({ element, roles, allowGuest = false }) => {
  const { isAuthenticated, userRole, loading } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated && !allowGuest) {
        navigate("/login");
      } else if (roles && !roles.includes(userRole) && isAuthenticated) {
        if (!showNotification) {
          enqueueSnackbar("You do not have permission to access this page.", {
            variant: "error",
            anchorOrigin: { horizontal: "right", vertical: "top" },
          });
          setShowNotification(true);
        }
        // Navigate based on userRole
        if (userRole === "Admin") {
          navigate("/AdminPage");
        } else if (userRole === "Customer") {
          navigate("/customer-page");
        } else if (userRole === "Staff") {
          navigate("/StaffPage");
        }
      }
    }
  }, [
    isAuthenticated,
    navigate,
    userRole,
    roles,
    enqueueSnackbar,
    showNotification,
    loading,
    allowGuest,
  ]);

  if (loading) {
    return null; // Or you can return a loading spinner here
  }

  if (!isAuthenticated && !allowGuest) {
    return null;
  }

  return element;
};

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),
  allowGuest: PropTypes.bool,
};

export default ProtectedRoute;
