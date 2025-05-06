import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          // Verify token with backend
          const response = await fetch("/api/auth/verify", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("authToken");
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          localStorage.removeItem("authToken");
        }
      }
      setIsLoading(false);
    };

    verifyToken();
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("authToken", token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const register = (token, userData) => {
    localStorage.setItem("authToken", token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
