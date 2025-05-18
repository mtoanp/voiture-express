import "./user-detail.scss";
import type { User } from "../user";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { userService } from "../user.service";
import { useAuth } from "../../auth/auth.context";
import DocumentUpload from "../document-upload/document-upload";

interface UserDetailsProps {
  id?: string;
}

const UserDetails = ({ id: propId }: UserDetailsProps) => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id: paramId } = useParams();
  const id = propId || paramId; // use prop first, fallback to param

  const { state } = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/users");
  };
  const goToUpdate = () => navigate(`/users/${user?.id}/edit`, { state: { user } });

  const getUser = async () => {
    try {
      if (state?.user) {
        setUser(state.user);
      } else if (id) {
        const response = await userService.getById(id);
        if (!response.ok) throw new Error("Failed to fetch user");
        const data = await response.json();
        console.warn("User data fetched", data);
        setUser(data);
      } else {
        throw new Error("No user data available.");
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getUser();
    }
  }, [id, state]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-details h-full overflow-auto p-4 bg-white rounded shadow">
      {user ? (
        <div>
          <div className="user-info card space-y-4 mt-4">
            <h2 className="header text-2xl font-semibold mb-4">Infos</h2>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Tel:</strong> {user.tel}
            </p>

            <div className="flex gap-4">
              <button onClick={goBack} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">
                Back
              </button>
              <button onClick={goToUpdate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Update
              </button>
            </div>
          </div>

          <DocumentUpload user={user} />
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default UserDetails;
