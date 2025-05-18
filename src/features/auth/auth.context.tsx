import { createContext, useContext } from "react";
import type { AuthUser } from "./auth-user";

export interface AuthContextType {
  currentUser: AuthUser | null; // ✅ now accepts null
  token: string | null;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
