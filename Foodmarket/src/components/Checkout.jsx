import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./checkout.css";

const Checkout = ({ setCartItems }) => {
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showQRCode, setShowQRCode] = useState(false);
  const [cartItems, setLocalCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("checkoutCart"));
    if (savedCart) {
      setLocalCartItems(savedCart);
      setTotalPrice(
        savedCart.reduce((total, item) => total + item.price * item.quantity, 0)
      );
    }
  }, []);

  const handlePayment = async () => {
    if (
      !customerDetails.name ||
      !customerDetails.address ||
      !customerDetails.phone
    ) {
      alert("⚠️ Please fill in all details.");
      return;
    }

    if (paymentMethod === "upi") {
      setShowQRCode(true);
    } else {
      await placeOrder();
    }
  };

  const placeOrder = async () => {
    setLoading(true);
    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:3001/api";

      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerDetails,       // ✅ fixed field
          items: cartItems,
          total: totalPrice,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("❌ Backend error response:", data);
        throw new Error(data?.error || "Order failed");
      }

      const orderId = data.orderId || data._id;
      if (!orderId) throw new Error("❌ Order ID not returned from server.");

      alert("✅ Order placed successfully!");

      // ✅ Clear both cart storages
      localStorage.removeItem("checkoutCart");
      localStorage.removeItem("cartItems");
      setCartItems && setCartItems([]); // if prop passed, clear in state too

      localStorage.setItem("latestOrderId", orderId);
      navigate(`/order-success/${orderId}`);
    } catch (error) {
      console.error("❌ Error placing order:", error.message);
      alert("❌ Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-form">
        <label>Name:</label>
        <input
          type="text"
          value={customerDetails.name}
          onChange={(e) =>
            setCustomerDetails({ ...customerDetails, name: e.target.value })
          }
        />

        <label>Address:</label>
        <input
          type="text"
          value={customerDetails.address}
          onChange={(e) =>
            setCustomerDetails({ ...customerDetails, address: e.target.value })
          }
        />

        <label>Phone:</label>
        <input
          type="text"
          value={customerDetails.phone}
          onChange={(e) =>
            setCustomerDetails({ ...customerDetails, phone: e.target.value })
          }
        />

        <label>Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="cod">Cash on Delivery</option>
          <option value="upi">UPI</option>
        </select>

        <h3>Total: ₹{totalPrice}</h3>
        <button onClick={handlePayment} disabled={loading}>
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>

      {showQRCode && (
        <div className="qr-code-container">
          <p>Scan the QR Code to Pay:</p>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=merchant@upi&pn=FoodMarket&mc=1234&tid=TXN123456&tr=${totalPrice}`}
            alt="UPI QR Code"
            className="qr-code"
          />
          <button onClick={placeOrder} disabled={loading}>
            ✅ I Have Paid
          </button>
        </div>
      )}
    </div>
    <div className="dn">
        <p className="dnp">
          © {new Date().getFullYear()} Feastopia. All rights reserved.
        </p>

        {/* Social Media Icons */}
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
      </div>
      </>
  );
};

export default Checkout;
