import { createContext, useContext } from "react";
import type { AuthUser } from "../../features/auth/auth-user";

export interface AuthContextType {
  currentUser: AuthUser | null; // ✅ now accepts null
  token: string | null;
  isAdmin: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
