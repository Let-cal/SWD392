import PropTypes from "prop-types"; 
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
