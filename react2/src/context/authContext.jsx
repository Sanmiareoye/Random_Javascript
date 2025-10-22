import { createContext, useEffect, useState } from "react";

// Create the context
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username);
      setEmail(user.email);
      setIsAuthenticated(true);
    }
  }, []); // Only run on first mount

  // Login function
  const login = () => {
    const user = { username, email };
    localStorage.setItem("user", JSON.stringify(user));
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUsername("");
    setEmail("");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        username,
        email,
        setUsername,
        setEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
