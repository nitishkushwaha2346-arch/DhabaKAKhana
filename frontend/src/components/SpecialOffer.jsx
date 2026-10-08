import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const SpecialOffer = () => {
  const [copied, setCopied] = useState(false);
  const { addToast } = useCart();

  const handleCopy = () => {
    navigator.clipboard?.writeText("KHANA20");
    setCopied(true);
    addToast("Coupon KHANA20 copied to clipboard! Paste at checkout. 🎉", "success");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="special-section">
      <div className="special-container">
        {/* Left Food Image */}
        <div className="special-food">
          <div className="special-food-circle">
            <img
              src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
              alt="Special Dal Makhani"
              className="special-img"
            />
          </div>

          <div className="special-small-food">
            <span className="offer-tag-float">20% OFF</span>
          </div>
        </div>

        {/* Right Content */}
        <div className="special-content">
          <p className="special-label">🔥 TODAY'S SPECIAL OFFER</p>

          <h2>
            Get <span>20% FLAT OFF</span>
            <br />
            On Your Feast Today!
          </h2>

          <p className="special-description">
            Experience our royal chef specials cooked to perfection with pure desi ghee and
            aromatic spices. Apply coupon code at checkout to enjoy an instant 20% discount
            on your entire order!
          </p>

          {/* Coupon Box */}
          <div className="coupon-box">
            <div>
              <p>USE COUPON CODE</p>
              <strong>KHANA20</strong>
            </div>

            <button className="copy-btn" onClick={handleCopy}>
              {copied ? "COPIED! ✓" : "COPY CODE"}
            </button>
          </div>

          <Link to="/menu" className="special-order-btn">
            <span>CLAIM OFFER & ORDER NOW</span>
            <span>🍽️</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;
