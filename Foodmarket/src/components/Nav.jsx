import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";

const Nav = ({ cartCount = 0 }) => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");
  const adminToken = localStorage.getItem("adminToken");

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Feastopia</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/list">Menu</Link>
        </li>

        {userToken && (
          <>
            <li className="cart-link-wrapper">
              <Link to="/cart" className="cart-link">
                Cart
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}

        {adminToken && !userToken && (
          <>
            <li>
              <Link to="/admin-dashboard">Dashboard</Link>
            </li>
            <li>
              <button onClick={handleAdminLogout}>Logout</button>
            </li>
          </>
        )}

        {!userToken && !adminToken && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/admin/login">Admin</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
