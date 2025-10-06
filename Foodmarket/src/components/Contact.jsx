import React from "react";
import "./footer.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <h2>Contact Us</h2>
        <p>Email: support@feastopia.com</p>
        <p>Phone: +1 234 567 890</p>
        <p>Address: 123 Food Street, Flavor Town</p>

        <div className="follow-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://wa.me/yourwhatsappnumber" target="_blank" rel="noreferrer">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="https://www.threads.net" target="_blank" rel="noreferrer">
              <i className="fab fa-threads"></i>
            </a>
            <a href="https://twitter.com/yourprofile" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Feastopia. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;
