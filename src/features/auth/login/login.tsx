import "./login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../auth.service";
import { useAuth } from "../auth.context";
import FormInput from "../../../shared/form/form-input/form-input";

const LogIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

  const navigate = useNavigate();
  const { login } = useAuth();

  // ------------------------------------------------------------
  // Validation rules
  // ------------------------------------------------------------
  const validate = (values: { email: string; password: string }) => {
    const errors: { email?: string; password?: string } = {};

    if (!values.email || !/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Valid email is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  // ✅ Used to set errors during submission
  const validateForm = () => {
    const errors = validate(user);
    setFormErrors(errors);
    return errors;
  };

  // ✅ Used to enable/disable the button
  const formIsValid = Object.keys(validate(user)).length === 0;

  // ------------------------------------------------------------
  // On Events
  // ------------------------------------------------------------
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update user input
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Revalidate the updated field
    const updatedValues = {
      ...user,
      [name]: value,
    };

    const errors = validate(updatedValues);

    setFormErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      if (errors[name as keyof typeof errors]) {
        newErrors[name as keyof typeof errors] = errors[name as keyof typeof errors];
      } else {
        delete newErrors[name as keyof typeof errors];
      }

      return newErrors;
    });

    setError(null); // Clear global/server error
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      const res = await AuthService.logIn(user.email, user.password);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = typeof data.message === "string" ? data.message : data.message?.message || "Login failed";
        setError(msg);
        return;
      }

      const data = await res.json();
      AuthService.setToken(data.access_token);
      login(data.user, data.access_token);
      navigate("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------------------
  // HTML
  // ------------------------------------------------------------
  return (
    <div className="login w-full shadow-lg p-8 card">
      <h2 className="text-3xl font-bold text-center text-blue-600">Login</h2>

      <form onSubmit={handleSubmit} className="form my-4">
        {error && <div className="bg-red-100 text-red-700 p-2 rounded text-sm mb-4">{error}</div>}

        <FormInput type="email" name="email" value={user.email} onChange={onChange} error={formErrors.email} placeholder="Email" />

        <FormInput type="password" name="password" value={user.password} onChange={onChange} error={formErrors.password} placeholder="Password" />

        <button
          type="submit"
          disabled={loading || !formIsValid}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50">
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default LogIn;
