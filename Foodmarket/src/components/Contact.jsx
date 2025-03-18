import React from "react";
import "./footer.css";

const Contact = () => {
  return (
    <div className="cu">
      <h2>Contact Us</h2>
      <p>Email: support@feastopia.com</p>
      <p>Phone: +1 234 567 890</p>
      <p>Address: 123 Food Street, Flavor Town</p>

      {/* Follow Us Section */}
      <div className="follow-section">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inst"
          >
            <i className="fab fa-instagram"></i> Instagram
          </a>
          <br />
          <br />
          <a
            href="https://wa.me/yourwhatsappnumber"
            target="_blank"
            rel="noopener noreferrer"
            className="what"
          >
            <i className="fab fa-whatsapp"></i> WhatsApp
          </a>
          <br />
          <br />
          <a
            href="https://www.threads.net"
            target="_blank"
            rel="noopener noreferrer"
            className="thred"
          >
            <i className="fab fa-threads"></i> Threads
          </a>
          <br />
          <br />
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="twit"
          >
            <i className="fab fa-twitter"></i> Twitter
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="cb">
        <p className="par">
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

export default Contact;
