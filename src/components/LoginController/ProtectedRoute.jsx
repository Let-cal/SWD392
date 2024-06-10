import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

const ProtectedRoute = ({ element, roles }) => {
  const { isAuthenticated, userRole, loading } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      // Chỉ thực hiện logic khi không loading
      if (!isAuthenticated) {
        navigate("/login");
      } else if (roles && !roles.includes(userRole)) {
        if (!showNotification) {
          enqueueSnackbar("You do not have permission to access this page.", {
            variant: "error",
            anchorOrigin: { horizontal: "right", vertical: "top" },
          });
          setShowNotification(true);
        }
        if (userRole.includes("Admin")) {
          navigate("/AdminPage");
        } else if (userRole.includes("Customer")) {
          navigate("/customer-page");
        } else {
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
  ]);

  if (loading || !isAuthenticated || (roles && !roles.includes(userRole))) {
    return null;
  }

  return element;
};

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
