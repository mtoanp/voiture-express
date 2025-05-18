import "./user-list.scss";
import { useEffect, useState } from "react";
import type { User } from "../user";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userService } from "../user.service";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const data = await userService.getUsers(); // ✅ already parsed JSON
      console.warn(data);
      setUsers(data ?? []); // or just `data` if it's array directly
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onDetails = (id?: string) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      navigate(`${id}`, { state: { user } });
    }
  };

  const onEdit = (id?: string) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      navigate(`${id}/edit`, { state: { user } });
    }
  };

  const onDelete = async (id: string) => {
    const success = await userService.delete(id); // ✅ renamed method
    if (success) {
      console.log("User deleted");
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="UserList max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">User List</h2>
        <Link to="/users/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          New User
        </Link>
      </div>

      {users.length > 0 ? (
        <ul className="space-y-3">
          {users.map((user) => (
            <li key={user.id} className="flex justify-between items-center border p-4 rounded hover:bg-gray-50">
              <div onClick={() => onDetails(user.id)} className="cursor-pointer flex-1">
                <p className="font-medium text-gray-700">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => onEdit(user.id)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">
                  Edit
                </button>
                <button onClick={() => onDelete(user.id!)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 italic">No users found.</p>
      )}
    </div>
  );
};

export default UserList;
