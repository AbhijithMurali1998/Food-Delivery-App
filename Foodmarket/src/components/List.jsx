import React, { useState, useEffect } from "react";
import API from "../api";
import "./list.css"; // Import the CSS file
import ab from "../assets/aboutback.jpg";

const List = ({ onAddToCart }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/restaurants");
        setRestaurants(res.data);

        const foodRes = await API.get("/foods");
        setFoods(foodRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (food) => {
    onAddToCart(food);
    alert(`${food.name} has been added to the cart! 🛒`);
  };

  return (
    <>
      <div className="list-container">
        {/* <h2 className="section-title">Restaurants</h2> */}
        <ul className="list">
          {restaurants.map((restaurant) => (
            <li key={restaurant._id} className="list-item">
              <strong>{restaurant.name}</strong> - {restaurant.address}
            </li>
          ))}
        </ul>

        <h2 className="section-title">FOOD ITEMS</h2>
        <ul className="food-list">
          {foods.map((food) => (
            <li key={food._id} className="food-item">
              <img
                src={food.image || "https://via.placeholder.com/100"}
                alt={food.name}
                className="food-image"
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
          ))}
        </ul>
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
