/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const Authcontext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userData")));
    setLoading(false);
  }, []);

  const Logout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    setUser(null);
    setLoading(false);
  };
  const autherinfo = {
    user,
    setUser,
    Logout,
    loading,
    setLoading,
  };
  return (
    <Authcontext.Provider value={autherinfo}>{children}</Authcontext.Provider>
  );
};

export default AuthProvider;
