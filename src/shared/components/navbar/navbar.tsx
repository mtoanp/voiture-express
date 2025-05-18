import "./navbar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { FaPowerOff, FaUser } from "react-icons/fa"; // FontAwesome
import { useAuth } from "../../../features/auth/auth.context";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar w-full px-4 text-white flex justify-between items-center">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/users">Users</NavLink>

      <div className="nav-right">
        {!currentUser ? (
          <NavLink to="/auth" className="text-gray-700 hover:text-blue-600 transition">
            <FaUser size={20} />
          </NavLink>
        ) : (
          <button onClick={handleLogout} className="text-gray-700 hover:text-red-600 transition font-medium">
            <FaPowerOff size={20} color="red" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
