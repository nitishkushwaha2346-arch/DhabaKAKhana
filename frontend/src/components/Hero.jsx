import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">
      {/* Left Content */}
      <div className="hero-content">
        <div className="hero-badge">
          <span>🔥</span>
          <span>#1 Rated Culinary Destination & Delivery</span>
        </div>

        <p className="hero-subtitle">WELCOME TO KHANA KHAZANA</p>

        <h1>
          Royal Flavors,
          <br />
          <span>Crafted For Every Mood.</span>
        </h1>

        <p className="hero-description">
          Experience the authentic heritage of traditional Indian cuisine alongside
          global gourmet favorites. Slow-cooked with hand-picked spices, farm-fresh ingredients,
          and delivered piping hot right to your doorstep.
        </p>

        {/* Action Buttons */}
        <div className="hero-buttons">
          <Link to="/menu" className="hero-order-btn">
            <span>Order Now</span>
            <span className="btn-arrow">→</span>
          </Link>

          <Link to="/menu" className="hero-menu-btn">
            <span>Explore Menu</span>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="hero-info">
          <div className="info-item">
            <span className="info-icon">🍛</span>
            <div>
              <strong>50+</strong>
              <p>Authentic Dishes</p>
            </div>
          </div>

          <div className="info-item">
            <span className="info-icon">⭐</span>
            <div>
              <strong>4.9 / 5</strong>
              <p>Over 12,000+ Reviews</p>
            </div>
          </div>

          <div className="info-item">
            <span className="info-icon">⚡</span>
            <div>
              <strong>30 Mins</strong>
              <p>Superfast Delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Food Visual */}
      <div className="hero-visual">
        <div className="food-background"></div>

        {/* Main Center Dish with Real Photography */}
        <div className="main-food-card">
          <img
            src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80"
            alt="Royal Biryani & Curries"
            className="main-hero-image"
          />
          <div className="dish-floating-badge">
            <span className="chef-badge-star">👑</span>
            <span>Chef's Masterpiece</span>
          </div>
        </div>

        {/* Floating Dish 1 */}
        <div className="floating-card floating-pizza">
          <span className="floating-icon">🍕</span>
          <div className="floating-meta">
            <strong>Cheesy Pizza</strong>
            <small>₹299 • Freshly Baked</small>
          </div>
        </div>

        {/* Floating Dish 2 */}
        <div className="floating-card floating-burger">
          <span className="floating-icon">🍔</span>
          <div className="floating-meta">
            <strong>Gourmet Burger</strong>
            <small>₹169 • Loaded Cheddar</small>
          </div>
        </div>

        {/* Rating Card */}
        <div className="rating-card">
          <div className="rating-star">⭐</div>
          <div>
            <strong>4.9 Rating</strong>
            <p>10,000+ Happy Foodies</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
