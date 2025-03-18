import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./sign.css"; // Import the CSS file

const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", user);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="signup-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="signup-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="signup-input"
        />
        <button type="submit" className="signup-button">
          Signup
        </button>
      </form>
      <div className="sin">
        <p className="sip">
          © {new Date().getFullYear()} Feastopia. All rights reserved.
        </p>
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

export default Signup;
