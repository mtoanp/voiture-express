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
      <NavLink to="/" className="logo">
        Home
      </NavLink>
      <NavLink to="/users">Users</NavLink>

      <div className="nav-right">
        {!currentUser ? (
          <NavLink to="/auth" className="text-gray-700 hover:text-blue-600 transition">
            <FaUser size={20} />
          </NavLink>
        ) : (
          <div className="">
            {/* {currentUser.email} */}
            <button onClick={() => navigate("/profile")} className="cursor-pointer text-gray-700 hover:text-red-600 transition font-medium mr-4">
              <FaUser size={20} />
            </button>

            <button onClick={handleLogout} className="cursor-pointer text-gray-700 hover:text-red-600 transition font-medium">
              <FaPowerOff size={20} color="red" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
