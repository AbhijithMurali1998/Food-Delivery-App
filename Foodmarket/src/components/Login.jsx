import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Import the CSS file

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", user);
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div className="lon">
        <p className="lonp">© {new Date().getFullYear()} Feastopia. All rights reserved.</p>
        <div className="social-icons">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://wa.me/yourwhatsappnumber"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
          <a
            href="https://www.threads.net"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-threads"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
