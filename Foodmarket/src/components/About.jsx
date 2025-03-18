import React from "react";
import "./about.css";
import ab from "../assets/aboutback.jpg";

const About = () => {
  return (
    <div className="ab">
      <h2>About Feastopia</h2>
      <p>
        At Feastopia, we believe that food is more than just sustenance—it’s an
        experience, a connection, and a celebration of flavors. Our platform is
        designed to bring food lovers closer to the best restaurants, home
        chefs, and culinary artisans. Whether you're craving a gourmet meal, a
        comforting home-cooked dish, or an exotic delicacy, Feastopia ensures
        you have access to a world of flavors at your fingertips. With a
        seamless ordering experience, carefully curated menus, and a commitment
        to quality, we prioritize taste and convenience. Our platform partners
        with top-rated restaurants and emerging culinary talents to bring you
        diverse cuisines, all delivered fresh and fast. From local favorites to
        international delights, every meal ordered through Feastopia is crafted
        with care. At the heart of our mission is a love for great food and a
        dedication to customer satisfaction. Whether you're dining solo,
        planning a feast with friends, or looking for the perfect meal for a
        special occasion, Feastopia is your ultimate food destination. Join us
        in exploring the joy of food—one delicious bite at a time!
      </p>

      <div className="cb">
        <p className="pa">
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
    </div>
  );
};

export default About;
