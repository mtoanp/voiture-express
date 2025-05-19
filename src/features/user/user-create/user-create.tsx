import "./user-create.scss";
import { useAuth } from "../../auth/auth.context";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { userService } from "../user.service";
import FormInput from "../../../shared/form/form-input/form-input";

const NewUser = () => {
  const { currentUser, login } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const navigate = useNavigate();

  // 🚫 Redirect if already logged in
  if (currentUser) {
    return <Navigate to="/" />;
  }

  // ------------------------------------------------------------
  // Validation rules
  // ------------------------------------------------------------
  const validate = (values: typeof user) => {
    const errors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!values.email || !/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Valid email is required";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,32}$/;
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8 || values.password.length > 32) {
      errors.password = "Password must be between 8 and 32 characters";
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "Password must include at least one uppercase letter, one number, and one special character (!@#$%^&*)";
    }

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  // ✅ Set validation errors to state
  const validateForm = () => {
    const errors = validate(user);
    setFormErrors(errors);
    return errors;
  };

  // ✅ Used for disabling the submit button
  const formIsValid = Object.keys(validate(user)).length === 0;

  // ------------------------------------------------------------
  // On Events
  // ------------------------------------------------------------
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update the field value
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Revalidate that field in the context of the full form
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
        delete newErrors[name as keyof typeof errors]; // ✅ Remove error if fixed
      }

      return newErrors;
    });

    setError(null); // clear generic error
  };

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
        email: user.email,
        password: user.password,
      };

      const response = await userService.create(payload);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            email: "Email already exists",
          }));
        }
        throw new Error(data.error || "Failed to create user");
      }

      login(data.user, data.access_token);
      navigate("/");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------------------
  // HTML
  // ------------------------------------------------------------
  return (
    <div className="user-create p-8 shadow-lg card">
      <h2 className="text-3xl font-bold text-center text-blue-600">Register</h2>

      <form onSubmit={onSubmit} className="form my-4">
        {error && <div className="bg-red-100 text-red-700 p-2 rounded text-sm mb-4">{error}</div>}

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
          disabled={loading || !formIsValid}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50">
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default NewUser;
