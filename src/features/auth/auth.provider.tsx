import { AuthContext } from "./auth.context";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { AuthUser } from "./auth-user";

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

  // ✅ Validate or refresh token if available
  const checkAndRefreshToken = async () => {
    console.warn("checkAndRefreshToken");
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    try {
      const response = await fetch(`${API}/auth/checkAndRefreshToken`, {
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
    checkAndRefreshToken();
  }, []);

  return <AuthContext.Provider value={{ currentUser, token, login, logout }}>{children}</AuthContext.Provider>;
};
