import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    setToken(localStorage.ft_token || "");
  }, [shouldUpdate]);

  const updateAuthStatus = () => setShouldUpdate(!shouldUpdate);

  const logout = () => {
    delete localStorage.ft_token;
    updateAuthStatus();
  };

  const providerValue = {
    token,
    isLoggedIn: !!token,
    updateAuthStatus,
    logout,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}
