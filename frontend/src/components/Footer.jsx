import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { addToast } = useCart();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      addToast("Please enter a valid email address", "error");
      return;
    }
    addToast("🎉 Subscribed! You'll receive secret chef deals and 20% off coupons.", "success");
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Restaurant Info */}
        <div className="footer-column footer-about">
          <div className="footer-logo">
            <span className="footer-logo-emoji">🍛</span>
            <span>Khana Khazana</span>
          </div>

          <p>
            Authentic culinary excellence delivered to your table. Crafted with traditional
            heritage, handpicked natural ingredients, and royal devotion since 2011.
          </p>

          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram">
              📸
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook">
              📘
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" title="Twitter/X">
              🐦
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube">
              ▶️
            </a>
          </div>

          <div className="footer-newsletter">
            <p className="newsletter-title">Subscribe for Secret Discounts</p>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Join</button>
            </form>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <Link to="/">🏠 Home</Link>
          <Link to="/menu">🍽️ Explore Menu</Link>
          <Link to="/cart">🛒 Shopping Cart</Link>
          <Link to="/contact">📞 Contact Us</Link>
          <Link to="/login">👤 Customer Login</Link>
          <Link to="/register">✨ Create Account</Link>
        </div>

        {/* Contact Info */}
        <div className="footer-column">
          <h3>Contact Us</h3>
          <p className="contact-detail-line">
            <span>📍</span>
            <span>Plot 42, Sector 29, Cyber Hub Road, Gurugram, Haryana 122002, India</span>
          </p>
          <p className="contact-detail-line">
            <span>📞</span>
            <a href="tel:+919876543210" style={{ color: "inherit", textDecoration: "none" }}>
              +91 98765 43210 / 0124-458900
            </a>
          </p>
          <p className="contact-detail-line">
            <span>✉️</span>
            <a href="mailto:support@khanakhazana.com" style={{ color: "inherit", textDecoration: "none" }}>
              support@khanakhazana.com
            </a>
          </p>
          <p className="contact-detail-line">
            <span>💬</span>
            <span>WhatsApp Support: +91 98765 43211</span>
          </p>
        </div>

        {/* Opening Hours */}
        <div className="footer-column">
          <h3>Kitchen Hours</h3>
          <p>
            <strong>Monday - Friday:</strong>
            <br />
            <span>10:30 AM - 11:30 PM</span>
          </p>

          <p>
            <strong>Saturday - Sunday:</strong>
            <br />
            <span>09:30 AM - 12:30 AM (Midnight)</span>
          </p>

          <div className="footer-status">
            <span className="live-pulse-dot"></span>
            <span>Kitchen Open & Accepting Orders</span>
          </div>

          <div className="payment-badges-row">
            <span className="pay-badge">UPI / GPay</span>
            <span className="pay-badge">Paytm</span>
            <span className="pay-badge">Visa / Master</span>
            <span className="pay-badge">COD</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>© 2026 Khana Khazana Culinary Pvt Ltd. All rights reserved.</p>

        <div className="footer-legal-links">
          <Link to="/contact">Privacy Policy</Link>
          <Link to="/contact">Terms of Service</Link>
          <Link to="/contact">FSSAI License #10822001000452</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;