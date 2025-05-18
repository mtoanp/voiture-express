import "./user-create.scss";
// import type { User } from "../user";
import { useAuth } from "../../auth/auth.context";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { userService } from "../user.service";
import FormInput from "../../../shared/form/form-input/form-input";

const NewUser = () => {
  const { currentUser, login } = useAuth();
  const [user, setUser] = useState({
    // name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    server?: string;
  }>({});

  const navigate = useNavigate();

  // ------------------------------------------------------------
  // If the user is already logged in, redirect them to the home page or another page
  // ------------------------------------------------------------
  if (currentUser) {
    return <Navigate to="/" />;
  }

  // ------------------------------------------------------------
  // Validation rules
  // ------------------------------------------------------------
  const validateForm = () => {
    const errors: {
      // name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    // if (!user.name) errors.name = "Name is required";
    if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) errors.email = "Valid email is required";
    if (!user.password || user.password.length < 6) errors.password = "Password must be at least 6 characters";
    if (user.password !== user.confirmPassword) errors.confirmPassword = "Passwords do not match";

    setFormErrors(errors);
    return errors;
  };

  // ------------------------------------------------------------
  // On Events
  // ------------------------------------------------------------
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear the errors
    setError(null);
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: "", // Clear the individual field error
    }));
  };

  // ------------------------------------------------------------
  // On Submit
  // ------------------------------------------------------------
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // Validate the form
    const errors = validateForm();
    if (Object.keys(errors).length !== 0) {
      setLoading(false);
      return;
    }

    try {
      // ✅ Extract only the fields to send
      const payload = {
        email: user.email,
        password: user.password,
      };

      const response = await userService.create(payload);
      const data = await response.json(); // Parse the JSON response

      if (!response.ok) {
        if (response.status === 409) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            email: "Email already exists",
          }));
        }

        throw new Error(data.error || "Failed to create user");
      }

      // Handle successful login (e.g., store tokens, redirect)
      console.warn("User created", data);
      login(data.user, data.access_token);
      navigate("/");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  // ------------------------------------------------------------
  // HTML
  // ------------------------------------------------------------
  return (
    <div className="NewUser max-w-md mx-auto mt-10 bg-white p-8 shadow-lg rounded">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        {error && <div className="bg-red-100 text-red-700 p-2 rounded text-sm">{error}</div>}

        {/* <FormInput name="name" value={user.name} onChange={onChange} error={formErrors.name} placeholder="Name" /> */}

        <FormInput type="email" name="email" value={user.email} onChange={onChange} error={formErrors.email} placeholder="Email" />

        <FormInput type="password" name="password" value={user.password} onChange={onChange} error={formErrors.password} placeholder="Password" />

        <FormInput
          type="password"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={onChange}
          error={formErrors.confirmPassword}
          placeholder="Confirm Password"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50">
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default NewUser;
