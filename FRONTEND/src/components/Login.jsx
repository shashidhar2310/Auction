import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App"; // context from App.jsx
import axios from "axios";
import "./Login.css"; // import the CSS we'll define below

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/login", form);
      const { user, token } = res.data;

      login(user, token);
      alert("✅ Logged in successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("❌ Login failed. Check credentials.");
    }
  };

  return (
    <div className="container login-container d-flex align-items-center justify-content-center">
      <div className="card shadow p-4 login-card">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
