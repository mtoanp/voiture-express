import "./login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../auth.service"; // adjust path if needed
import { useAuth } from "../auth.context";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await AuthService.logIn(email, password);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = typeof data.message === "string" ? data.message : data.message?.message || "Login failed";
        setError(msg);
        return;
      }

      const data = await res.json();
      const { user, access_token } = data;
      console.log(data);

      // Save token in service (optional)
      AuthService.setToken(access_token);

      // Save to context
      login(user, access_token);
      navigate("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    }
  };

  return (
    <div className="login">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>
        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
