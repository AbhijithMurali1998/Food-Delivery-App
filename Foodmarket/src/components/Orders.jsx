import React, { useEffect, useState } from "react";
import API from "../api"; // ✅ Make sure this path is correct
import "./orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await API.get("/user/orders"); // ✅ uses token automatically
      setOrders(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Unable to load your orders.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2>📜 My Orders</h2>
      {error && <p className="error">{error}</p>}
      {orders.length === 0 && !error ? (
        <p className="no-orders">You have no previous orders.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-box">
            <p>
              <strong>Status:</strong> {order.status.toUpperCase()}
            </p>
            <p>
              <strong>Total:</strong> ₹{order.total}
            </p>
            <div className="order-items">
              {order.items.map((item, idx) => (
                <div key={idx} className="order-item">
                  <span>{item.name}</span>
                  <span>× {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
