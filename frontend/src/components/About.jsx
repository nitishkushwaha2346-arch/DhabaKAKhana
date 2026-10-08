import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        {/* Left Visual Side */}
        <div className="about-visual">
          <div className="about-main-card">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80"
              alt="Master Chef at Khana Khazana"
              className="about-chef-img"
            />
          </div>

          <div className="about-small-card">
            <strong>15+</strong>
            <p>Years of Heritage</p>
          </div>

          <div className="about-food food-one">
            <span>🍛</span>
            <small>Authentic Tadka</small>
          </div>
          <div className="about-food food-two">
            <span>⭐</span>
            <small>Gold Standard Quality</small>
          </div>
        </div>

        {/* Right Content Side */}
        <div className="about-content">
          <p className="about-label">🍽️ OUR PASSION & HERITAGE</p>

          <h2>
            Serving Royalty With
            <span> Pure Love & Spice</span>
          </h2>

          <p className="about-text">
            Khana Khazana began with an unwavering promise — to preserve ancient culinary
            traditions while infusing contemporary culinary flair. Every dish leaving our
            kitchen carries the warmth of homemade goodness combined with 5-star restaurant finesse.
          </p>

          <p className="about-text">
            We partner with local organic farms for our produce, stone-grind our own garam
            masala blends daily, and use pure A2 cow ghee. Whether dining in or ordering from
            your living room, taste the unmatched royal difference in every bite.
          </p>

          <div className="about-features">
            <div className="about-feature">
              <span className="feature-check">✓</span>
              <p>100% Farm-Fresh Ingredients</p>
            </div>

            <div className="about-feature">
              <span className="feature-check">✓</span>
              <p>Master Chefs with 15+ Years Experience</p>
            </div>

            <div className="about-feature">
              <span className="feature-check">✓</span>
              <p>Heritage Recipes & Secret Spices</p>
            </div>

            <div className="about-feature">
              <span className="feature-check">✓</span>
              <p>Hygienic, Contactless Packaging</p>
            </div>
          </div>

          <div className="about-actions-row">
            <Link to="/menu" className="about-btn">
              Explore Our Signature Dishes →
            </Link>
            <Link to="/contact" className="about-secondary-link">
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;