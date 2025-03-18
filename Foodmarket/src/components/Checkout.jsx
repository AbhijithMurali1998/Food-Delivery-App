import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(""); // New state for phone number
  const [paymentMethod, setPaymentMethod] = useState("");

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in to proceed to checkout!");
      navigate("/login"); // Redirect to login page if not logged in
    }
  }, [navigate]);

  const handlePayment = () => {
    if (!address || !phone || !paymentMethod) {
      alert("Please fill all details, including your phone number!");
      return;
    }

    alert(
      `Payment successful! Your order has been placed. 🎉\nWe will contact you at ${phone} for delivery.`
    );
    navigate("/"); // Redirect to home page after order
  };

  return (
    <div className="checkout-container">
      <h2>📦 Checkout</h2>

      {/* Address Input */}
      <label>🏠 Address:</label>
      <input
        type="text"
        placeholder="Enter delivery address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      {/* Phone Number Input */}
      <label>📞 Contact Number:</label>
      <input
        type="tel"
        placeholder="Enter your phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        pattern="[0-9]{10}" // Ensures only 10-digit phone numbers are entered
        maxLength="10"
      />

      {/* Payment Method Selection */}
      <label>💳 Payment Method:</label>
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="">Select Payment Method</option>
        <option value="Cash on Delivery">Cash on Delivery</option>
        <option value="Credit/Debit Card">Credit/Debit Card</option>
        <option value="UPI">UPI</option>
      </select>

      {/* Pay Now Button */}
      <button className="pay-now-btn" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;
