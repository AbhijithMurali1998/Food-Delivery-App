import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = ({ setIsAuthenticated, setUserRole }) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/login", user);

      const { token, role } = response.data;

      if (role === "admin") {
        localStorage.setItem("adminToken", token);
        setUserRole("admin");
        setIsAuthenticated(true);
        navigate("/admin-dashboard");
      } else {
        localStorage.setItem("userToken", token);
        setUserRole("user");
        setIsAuthenticated(true);
        navigate("/"); // Redirect to home
      }
    } catch (error) {
      alert(error.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="login-input"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="login-input"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="social-icons">
          <a href="#" className="social-icon">
            <i className="fab fa-google"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-facebook"></i>
          </a>
        </div>

        <div className="admin-link">
          <p>
            New user? <a href="/signup" className="sign-link">Sign Up</a>
          </p>
        </div>

        <div className="lon">
          <p className="lonp">Powered by Your Company</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
