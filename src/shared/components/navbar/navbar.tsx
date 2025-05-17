import "./navbar.scss";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  // const { isAuthenticated, logout } = useAuth();
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   authLogOut();
  //   navigate("/");
  // };

  return (
    <nav className="navbar w-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-md px-6 py-1 text-white flex justify-between items-center">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/users">Users</NavLink>
      <div className="nav-right">
        <NavLink to="/auth" className="text-gray-700 hover:text-blue-600 transition">
          Auth
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
