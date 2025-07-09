import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";

import About from "./components/About";
import Contact from "./components/Contact";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import List from "./components/List";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import AdminOrders from "./components/AdminOrders";
import OrderSuccess from "./components/OrderSuccess";
import Orders from "./components/Orders";

const App = () => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!(
      localStorage.getItem("userToken") || localStorage.getItem("adminToken")
    );
  });

  const [userRole, setUserRole] = useState(() => {
    try {
      const token =
        localStorage.getItem("adminToken") || localStorage.getItem("userToken");
      if (!token) return "user";
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded?.role || "user";
    } catch (err) {
      console.error("Token decode error:", err);
      return "user";
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (food) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === food.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...food, quantity: 1 }];
      }
    });
  };

  return (
    <Router>
      <AppContent
        cartItems={cartItems}
        setCartItems={setCartItems}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        userRole={userRole}
        setUserRole={setUserRole}
        handleAddToCart={handleAddToCart}
      />
    </Router>
  );
};

const AppContent = ({
  cartItems,
  setCartItems,
  isAuthenticated,
  setIsAuthenticated,
  userRole,
  setUserRole,
  handleAddToCart,
}) => {
  const location = useLocation();
  const showNav = !location.pathname.startsWith("/admin");

  return (
    <>
      {showNav && <Nav cartCount={cartItems.length} />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={
            <Login
              setIsAuthenticated={setIsAuthenticated}
              setUserRole={setUserRole}
            />
          }
        />
        <Route path="/list" element={<List onAddToCart={handleAddToCart} />} />
        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
        />

        {/* Authenticated User Routes */}
        <Route
          path="/checkout"
          element={
            isAuthenticated ? (
              <Checkout setCartItems={setCartItems} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/orders"
          element={isAuthenticated ? <Orders /> : <Navigate to="/login" />}
        />
        <Route path="/order-success/:orderId" element={<OrderSuccess />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            userRole === "admin" ? (
              <AdminOrders />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/admin/login"
          element={
            <AdminLogin
              setIsAuthenticated={setIsAuthenticated}
              setUserRole={setUserRole}
            />
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            userRole === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
      </Routes>
    </>
  );
};

export default App;
