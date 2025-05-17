import { Outlet, useNavigate, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname.includes("login");

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => navigate("/auth/login")}
          className={`px-4 py-2 rounded-md font-semibold ${isLogin ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>
          Login
        </button>
        <button
          onClick={() => navigate("/auth/register")}
          className={`px-4 py-2 rounded-md font-semibold ${!isLogin ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>
          Register
        </button>
      </div>

      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
