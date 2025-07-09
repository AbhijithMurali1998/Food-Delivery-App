import React, { useState, useEffect } from "react";
import API from "../api";
import "./list.css"; // Import the CSS file

const List = ({ onAddToCart }) => {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/foods");
        console.log("✅ Food data:", res.data);
        setFoods(res.data);
      } catch (error) {
        console.error("❌ Error fetching food data:", error);
        setError("Failed to load food items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (food) => {
    const foodItem = {
      id: food._id,
      name: food.name,
      price: food.price,
      image: food.image,
      quantity: 1,
    };

    onAddToCart(foodItem);
    alert(`${food.name} has been added to the cart! 🛒`);
  };

  return (
    <>
      <div className="list-container">
        <h2 className="section-title">FOOD ITEMS</h2>
        {loading ? (
          <p>Loading food items...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <ul className="food-list">
            {foods.length > 0 ? (
              foods.map((food) => (
                <li key={food._id} className="food-item">
                  <img
                    src={
                      food.image?.startsWith("http")
                        ? food.image
                        : `http://localhost:3001/uploads/${food.image}`
                    }
                    alt={food.name}
                    className="food-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/100";
                    }}
                  />
                  <div className="food-details">
                    <strong>{food.name}</strong> - ₹{food.price}
                  </div>
                  <button
                    className="order-button"
                    onClick={() => handleAddToCart(food)}
                  >
                    Add to Cart
                  </button>
                </li>
              ))
            ) : (
              <p>No food items available.</p>
            )}
          </ul>
        )}
      </div>

      <div className="ln">
        <p className="lnp">
          © {new Date().getFullYear()} Feastopia. All rights reserved.
        </p>
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

export default List;
