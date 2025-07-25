import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import image from "../assets/foodm.avif";
import rest from "../assets/rest.jpg";
import rest1 from "../assets/rest1.jpg";
import rest2 from "../assets/rest2.jpg";
import rest3 from "../assets/rest3.jpg";
import rest4 from "../assets/rest4.jpg";
import rest5 from "../assets/rest5.jpg";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Sample hotel data
const hotels = [
  { id: 1, name: "Hotel Paradise", img: rest },
  { id: 2, name: "Urban Dine", img: rest1 },
  { id: 3, name: "Tasty Treats", img: rest2 },
  { id: 4, name: "Royal Feast", img: rest3 },
  { id: 5, name: "Thapan", img: rest4 },
  { id: 6, name: "Royal Palace", img: rest5 },
];

const Home = () => {
  const navigate = useNavigate();
  const [welcomeMessage, setWelcomeMessage] = useState("");

  // Generate a dynamic greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setWelcomeMessage("Good Morning! Ready for a delicious breakfast? ☕🍩");
    } else if (hour < 18) {
      setWelcomeMessage(
        "Good Afternoon! Treat yourself to something tasty! 🍽️"
      );
    } else {
      setWelcomeMessage(
        "Good Evening! End your day with a delightful meal! 🍕🍣"
      );
    }
  }, []);

  const handleClick = () => {
    navigate("/list");
  };

  return (
    <>
      <div className="home">
        <h1 className="head">Feastopia</h1>
        <p className="para">{welcomeMessage}</p>{" "}
        {/* Display dynamic welcome message */}
      </div>

      <div className="hl">
        <marquee behavior="" direction="">
          <h3 className="headlist">
            Discover Your Next Favorite Restaurant! 🍽️
          </h3>
        </marquee>
      </div>

      {/* Hotel List - Horizontal Scrollable Cards */}
      <div className="hotel-list" onClick={handleClick}>
        {hotels.map((hotel) => (
          <div key={hotel.id} className="hotel-card">
            <img src={hotel.img} alt={hotel.name} className="hotel-image" />
            <p className="cpa">{hotel.name}</p>
          </div>
        ))}
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

export default Home;
