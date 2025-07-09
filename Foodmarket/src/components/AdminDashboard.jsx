import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admindash.css";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [menu, setMenu] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "", image: null });
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("orders");
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");
  const authHeader = { Authorization: `Bearer ${token}` };

  const fetchOrders = async () => {
    try {
      if (!token) return navigate("/admin-login");
      const res = await fetch("http://localhost:3001/api/admin/orders", {
        headers: authHeader,
      });
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Could not load orders.");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/admin/users", {
        headers: authHeader,
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchMenu = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/admin/menu", {
        headers: authHeader,
      });
      const data = await res.json();
      setMenu(data);
    } catch (err) {
      console.error("Menu fetch error", err);
    }
  };

  const addItemToMenu = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newItem.name);
      formData.append("price", newItem.price);
      formData.append("image", newItem.image);

      const res = await fetch("http://localhost:3001/api/admin/menu", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Add menu item failed");

      setNewItem({ name: "", price: "", image: null });
      fetchMenu();
    } catch (err) {
      console.error("Menu item add error", err);
    }
  };

  const deleteItemFromMenu = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await fetch(`http://localhost:3001/api/admin/menu/${id}`, {
        method: "DELETE",
        headers: authHeader,
      });
      if (!res.ok) throw new Error("Delete failed");
      fetchMenu();
    } catch (err) {
      console.error("Delete menu item error:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/admin/orders/${id}/${status}`,
        {
          method: "PUT",
          headers: authHeader,
        }
      );
      if (!res.ok) throw new Error("Status update failed");
      const updatedOrder = await res.json();
      if (status === "accepted") {
        alert(`✅ User ${updatedOrder.customer.name}'s order accepted.`);
      }
      fetchOrders();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    alert("🔒 Admin logged out");
    navigate("/admin/login");
  };

  useEffect(() => {
    fetchOrders();
    fetchUsers();
    fetchMenu();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>🛠️ Admin Dashboard</h2>
        <div className="admin-menu">
          <button
            className={activeTab === "orders" ? "active" : ""}
            onClick={() => setActiveTab("orders")}
          >
            📦 Orders
          </button>
          <button
            className={activeTab === "users" ? "active" : ""}
            onClick={() => setActiveTab("users")}
          >
            👥 Users
          </button>
          <button
            className={activeTab === "menu" ? "active" : ""}
            onClick={() => setActiveTab("menu")}
          >
            🍽️ Menu
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      {activeTab === "orders" && (
        <>
          {orders.length === 0 && !error && <p>No orders yet.</p>}
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <h3>👤 Customer: {order.customer?.name}</h3>
              <p><strong>📞 Phone:</strong> {order.customer?.phone}</p>
              <p><strong>🏠 Address:</strong> {order.customer?.address}</p>
              <p><strong>📦 Status:</strong> {order.status.toUpperCase()}</p>
              <p><strong>💰 Total:</strong> ₹{order.total}</p>
              <div>
                <strong>🍽️ Items:</strong>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} × {item.quantity} = ₹{item.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              {order.status === "pending" && (
                <button
                  className="accept-btn"
                  onClick={() => updateStatus(order._id, "accepted")}
                >
                  ✅ Accept
                </button>
              )}
              {order.status === "accepted" && (
                <p className="info-msg">Waiting for user to confirm delivery...</p>
              )}
              {order.status === "delivered" && (
                <p className="delivered-msg">✅ Delivered</p>
              )}
            </div>
          ))}
        </>
      )}

      {activeTab === "users" && (
        <div className="user-list">
          <h2>👥 Registered Users</h2>
          {users.length === 0 ? (
            <p>No users registered.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === "menu" && (
        <div className="menu-section">
          <h2>🍽️ Manage Menu</h2>
          <div className="menu-form">
            <input
              type="text"
              placeholder="Item name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewItem({ ...newItem, image: e.target.files[0] })
              }
            />
            <button onClick={addItemToMenu}>Add</button>
          </div>
          <ul className="menu-list">
            {menu.map((item) => (
              <li key={item._id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                {item.image && (
                  <img
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `http://localhost:3001/uploads/${item.image}`
                    }
                    alt={item.name}
                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px", marginRight: "10px" }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/50";
                    }}
                  />
                )}
                {item.name} - ₹{item.price}
                <button
                  onClick={() => deleteItemFromMenu(item._id)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  🗑️ Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
