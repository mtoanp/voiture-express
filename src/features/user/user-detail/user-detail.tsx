import "./user-detail.scss";
import type { User } from "../user";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { userService } from "../user.service";
import { useAuth } from "../../auth/auth.context";
import DocumentUpload from "../upload/document-upload";

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
  // console.warn(id);

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
    <div className="user-details">
      <h2>User Details</h2>

      {user ? (
        <div className="space-y-2">
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Tel:</strong> {user.tel}
          </p>

          {/* 🖼️ Picture Zone */}
          {user.document && (
            <div className="mt-4">
              <strong>Document:</strong>
              <div className="mt-2 border rounded overflow-hidden w-full flex justify-center">
                {(() => {
                  const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(user.document);
                  const isPDF = /\.pdf$/i.test(user.document);

                  if (isImage) {
                    return <img src={user.document} alt="User document" className="w-[80%] max-h-[500px] object-contain" />;
                  }

                  if (isPDF) {
                    return (
                      <object data={user.document} type="application/pdf" className="w-[80%] h-[600px] border">
                        <p>
                          Your browser does not support PDFs.{" "}
                          <a href={user.document} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                            Download PDF
                          </a>
                        </p>
                      </object>
                    );
                  }

                  return <p className="text-sm text-gray-500">Unsupported file type</p>;
                })()}
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-4">
            <button onClick={goBack} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">
              Back
            </button>
            <button onClick={goToUpdate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Update
            </button>
          </div>

          {user?.id && <DocumentUpload userId={user.id} />}
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default UserDetails;
