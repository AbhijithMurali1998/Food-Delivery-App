import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <section>
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About Feastopia</h2>
          <p>
            Feastopia is your go-to platform for discovering and ordering the
            most delicious meals from top restaurants. Experience taste like
            never before!
          </p>
        </div>
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>Email: support@feastopia.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 Food Street, Flavor Town</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Feastopia. All rights reserved.</p>
      </div>
    </footer>
    </section>
  );
};

export default Footer;
