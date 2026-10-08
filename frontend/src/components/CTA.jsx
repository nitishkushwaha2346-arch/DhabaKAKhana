import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-food cta-food-left">🍕</div>

        <div className="cta-content">
          <p className="cta-label">🍽️ CRAVING SOMETHING DELICIOUS?</p>

          <h2>
            Your Royal Feast
            <br />
            <span>Is Just One Click Away!</span>
          </h2>

          <p>
            Experience lightning-fast delivery, freshly cooked meals with premium spices,
            and exclusive 20% savings on your first order today.
          </p>

          <div className="cta-buttons">
            <Link to="/menu" className="cta-order-btn">
              <span>Order Now</span>
              <span>→</span>
            </Link>

            <Link to="/menu" className="cta-menu-btn">
              <span>Browse Full Menu</span>
            </Link>
          </div>
        </div>

        <div className="cta-food cta-food-right">🍔</div>
      </div>
    </section>
  );
};

export default CTA;