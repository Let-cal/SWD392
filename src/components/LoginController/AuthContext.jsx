import { jwtDecode } from "jwt-decode";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    localStorage.removeItem("password"); // Remove password on logout
    setIsAuthenticated(false);
    setUserRole(null);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      setIsAuthenticated(true);
    }

    if (role) {
      setUserRole(role);
    }

    setLoading(false); // Mark loading as complete
  }, []);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
          enqueueSnackbar(
            "You are out of time and require to login again to access the page.",
            { variant: "warning" }
          );
          handleLogout();
        }
      }
    };

    const interval = setInterval(checkTokenExpiration, 60000); // Check every minute
    checkTokenExpiration(); // Check initially
    return () => clearInterval(interval); // Clean up interval
  }, [enqueueSnackbar, handleLogout]);

  // Return null while loading to avoid rendering children prematurely
  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userRole,
        setUserRole,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
