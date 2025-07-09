import React, { useEffect, useState } from "react";
import "./admin.css"; // Create this if you want styling

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/admin/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const updatedOrders = await fetch(
      "http://localhost:5000/api/admin/orders"
    ).then((res) => res.json());
    setOrders(updatedOrders);
  };

  return (
    <div className="admin-orders">
      <h2>Admin Panel - Orders</h2>
      {orders.length === 0 && <p>No orders found.</p>}
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <h3>Order ID: {order._id.slice(-6)}</h3>
          <p>
            <strong>Name:</strong> {order.customer.name}
          </p>
          <p>
            <strong>Phone:</strong> {order.customer.phone}
          </p>
          <p>
            <strong>Address:</strong> {order.customer.address}
          </p>
          <p>
            <strong>Total:</strong> ₹{order.total}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} x {item.quantity} - ₹{item.price}
              </li>
            ))}
          </ul>

          {order.status === "pending" && (
            <button onClick={() => updateStatus(order._id, "accepted")}>
              Accept Order
            </button>
          )}
          {order.status === "accepted" && (
            <button onClick={() => updateStatus(order._id, "delivered")}>
              Mark as Delivered
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
