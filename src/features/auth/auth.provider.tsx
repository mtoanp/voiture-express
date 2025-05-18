import { AuthContext } from "./auth.context";
import { useState } from "react";
import type { ReactNode } from "react";
import type { AuthUser } from "./auth-user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("jwtToken"));

  const login = (userData: AuthUser, accessToken: string) => {
    setCurrentUser(userData);
    setToken(accessToken);
    localStorage.setItem("jwtToken", accessToken);
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("jwtToken");
  };

  return <AuthContext.Provider value={{ currentUser, token, login, logout }}>{children}</AuthContext.Provider>;
};
