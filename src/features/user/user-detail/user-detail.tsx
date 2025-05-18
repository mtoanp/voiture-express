import "./user-detail.scss";
import { useAuth } from "../../../features/auth/auth.context";

const UserDetails = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return null; // or a fallback UI

  return (
    <div className="user-detail flex flex-col py-4 gap-y-2 text-sm text-gray-700">
      <div className="font-semibold">Welcome back 👋</div>
      <div>
        <span className="font-medium">Name:</span> {currentUser.name}
      </div>
      <div>
        <span className="font-medium">Email:</span> {currentUser.email}
      </div>
      {currentUser.role && (
        <div>
          <span className="font-medium">Role:</span> {currentUser.role}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
