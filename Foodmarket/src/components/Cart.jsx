import React from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";

const Cart = ({ cartItems }) => {
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    navigate("/checkout"); // ✅ Redirects to checkout page
  };

  return (
    <>
    <div className="cart-container">
      <h2>🛒 Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-food-image" />
                <div className="cart-details">
                  <strong>{item.name}</strong> - ₹{item.price}
                </div>
              </li>
            ))}
          </ul>

          {/* Place Order Button */}
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
     <div className="can">
     <p className="cap">© {new Date().getFullYear()} Feastopia. All rights reserved.</p>
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
   </div></>
  );
};

export default Cart;
