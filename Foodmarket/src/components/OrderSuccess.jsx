import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("pending");
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/admin/orders/${orderId}`);
        if (!res.ok) throw new Error("Failed to fetch order");
        const data = await res.json();

        setStatus(data.status);

        // ✅ Show alert once when order is accepted
        if (data.status === "accepted" && !notified) {
          alert("✅ Your order has been accepted! It will arrive soon.");
          setNotified(true);
        }
      } catch (err) {
        console.error("Polling error:", err.message);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [orderId, notified]);

  const handleConfirm = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/orders/${orderId}/deliver`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (!res.ok) throw new Error("Failed to confirm delivery");

      alert("✅ Thank you! We've received your confirmation.");
      navigate("/");
    } catch (err) {
      console.error("❌ Confirm Error:", err);
      alert("Failed to confirm. Please try again.");
    }
  };

  return (
    <div className="order-success">
      <h2>🎉 Order Placed Successfully!</h2>
      <p>Order ID: <strong>{orderId}</strong></p>
      <p>Current Status: <strong>{status}</strong></p>

      {status === "accepted" && (
        <>
          <p>Please confirm after receiving your food:</p>
          <button onClick={handleConfirm}>I Received My Food</button>
        </>
      )}

      {status === "delivered" && (
        <p>✅ Order marked as delivered. Thank you!</p>
      )}

      {status === "pending" && (
        <p>⌛ Waiting for admin to accept your order...</p>
      )}
    </div>
  );
};

export default OrderSuccess;
