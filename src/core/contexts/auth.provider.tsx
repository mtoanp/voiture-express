import { AuthContext } from "./auth.context";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { AuthUser } from "../../features/auth/auth-user";

const API = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("accessToken"));

  const login = (userData: AuthUser, accessToken: string) => {
    console.warn("login", accessToken);
    setCurrentUser(userData);
    setToken(accessToken);
    localStorage.setItem("accessToken", accessToken);
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("accessToken");
  };

  // Directly define isAdmin as a boolean variable
  const isAdmin = currentUser?.role === "admin";

  // ✅ Validate or refresh token from server if available
  const getCurrentUser = async () => {
    console.warn("getCurrentUser");
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    try {
      const response = await fetch(`${API}/auth/getCurrentUser`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        logout(); // Token invalid
        return;
      }

      const user = await response.json();
      setCurrentUser(user);
      setToken(accessToken);
    } catch (error) {
      console.error("Token check failed:", error);
      logout();
    }
  };

  // ✅ Auto run on app load
  useEffect(() => {
    getCurrentUser();
  }, []);

  return <AuthContext.Provider value={{ currentUser, token, login, logout, isAdmin }}>{children}</AuthContext.Provider>;
};
