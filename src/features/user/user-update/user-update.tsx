import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { userService } from "../user.service";
import { useAuth } from "../../../core/contexts/auth.context";
import FormInput from "../../../shared/form/form-input/form-input";
import type { User } from "../user";

const UpdateUser = () => {
  const { currentUser, login } = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const initialUserData = (location.state?.user || {}) as User;

  const [user, setUser] = useState({
    name: initialUserData.name || "",
    email: initialUserData.email || "",
    tel: initialUserData.tel || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    tel?: string;
    server?: string;
  }>({});

  // -------------------------------
  // Fetch user if not provided via state
  // -------------------------------
  useEffect(() => {
    if (!location.state?.user && id) {
      setLoading(true);
      userService.getById(id).then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setUser({
            name: data.name || "",
            email: data.email || "",
            tel: data.tel || "",
          });
        } else {
          setError(data.error || "User not found");
        }
        setLoading(false);
      });
    }
  }, [id, location.state]);

  // -------------------------------
  // Form Validation
  // -------------------------------
  const validateForm = () => {
    const errors: { name?: string; email?: string; tel?: string } = {};
    if (!user.name.trim()) errors.name = "Name is required";
    if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) errors.email = "Valid email is required";
    if (user.tel && !/^[0-9+()\s-]+$/.test(user.tel)) errors.tel = "Invalid phone number";
    setFormErrors(errors);
    return errors;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // -------------------------------
  // ON SUBMIT
  // -------------------------------
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const errors = validateForm();
    if (Object.keys(errors).length !== 0) {
      setLoading(false);
      return;
    }

    try {
      const payload = {
        name: user.name,
        email: user.email,
        tel: user.tel,
      };

      const response = await userService.update(id ?? currentUser!.id, payload);
      const data = await response.json();
      console.warn(data);
      if (!response.ok) {
        if (response.status === 409) {
          setFormErrors((prev) => ({ ...prev, email: "Email already in use" }));
        }
        throw new Error(data.error || "Failed to update user");
      }

      login(data.user, data.access_token); // update context if needed
      navigate("/profile");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Render
  // -------------------------------
  if (!currentUser) {
    return <p className="text-center mt-10">Please log in to update your profile.</p>;
  }

  return (
    <div className="UpdateUser max-w-md mx-auto mt-10 bg-white p-8 shadow-lg rounded">
      <h2 className="text-2xl font-bold text-center mb-6">Update User</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        {error && <div className="bg-red-100 text-red-700 p-2 rounded text-sm">{error}</div>}

        <FormInput name="name" value={user.name} onChange={onChange} error={formErrors.name} placeholder="Name" />
        <FormInput type="email" name="email" value={user.email} onChange={onChange} error={formErrors.email} placeholder="Email" />
        <FormInput name="tel" value={user.tel} onChange={onChange} error={formErrors.tel} placeholder="Phone Number" />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50">
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
