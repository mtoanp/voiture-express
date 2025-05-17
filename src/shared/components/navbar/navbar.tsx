import "./navbar.scss";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa"; // FontAwesome

const Navbar = () => {
  // const { isAuthenticated, logout } = useAuth();
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   authLogOut();
  //   navigate("/");
  // };

  return (
    <nav className="navbar w-full px-4 text-white flex justify-between items-center">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/users">Users</NavLink>
      <div className="nav-right">
        <NavLink to="/auth" className="text-gray-700 hover:text-blue-600 transition">
          <FaUser size={20} />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
