import React, { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const phone = localStorage.getItem("userPhone"); // Store after placing order

  const fetchUserOrders = async () => {
    const res = await fetch(`http://localhost:5000/api/orders/user/${phone}`);
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <div className="order-history">
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <p>
            <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Total:</strong> ₹{order.total}
          </p>
          <ul>
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.name} x {item.quantity} = ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
