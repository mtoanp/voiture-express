import "./auth-layout.scss";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname.includes("login");

  return (
    <div className="auth-layout h-full flex flex-col items-center justify-center mx-auto">
      <div className="auth card relative w-full lg:w-[500px] mx-1">
        {/* background */}
        {/* <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div> */}

        {/* control */}
        <div className="control">
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

        {/* outlet */}
        <div className="outlet mt-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
