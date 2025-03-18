import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css"; // Import the CSS file

const Nav = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="nav-container">
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/list" className="nav-link">
          Food List
        </Link>
        <Link to="/cart" className="nav-link">
          Cart
        </Link>
        <Link to="/contact" className="nav-link">
          Contact
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
      </div>
      <div className="nav-auth">
        {token ? (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="login-btn">
              Login
            </Link>
            <Link to="/signup" className="signup-btn">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
