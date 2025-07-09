import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";

const Cart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCart) {
      setCartItems(savedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const increaseQuantity = (index) => {
    const updatedCart = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = cartItems.map((item, i) =>
      i === index && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    localStorage.setItem("checkoutCart", JSON.stringify(cartItems));
    navigate("/checkout");
  };

  const getImageUrl = (image) => {
    return image.startsWith("http")
      ? image
      : `http://localhost:3001/uploads/${image}`;
  };

  return (
    <div className="cart-container">
      <h2>🛒 Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img
                  src={getImageUrl(item.image)}
                  alt={item.name}
                  className="cart-food-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/100";
                  }}
                />
                <div className="cart-details">
                  <strong>{item.name}</strong> - ₹{item.price * item.quantity}
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(index)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(index)}>+</button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveItem(index)}
                  >
                    ❌ Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <h3>Total: ₹{totalPrice}</h3>

          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
