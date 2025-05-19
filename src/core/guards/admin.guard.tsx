import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";

const AdminGuard = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (currentUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminGuard;
