import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./auth.context";

const AuthGuard = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
