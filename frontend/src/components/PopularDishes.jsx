import React, { useState } from "react";
import { Link } from "react-router-dom";
import { foodData } from "../data/foodData";
import { useCart } from "../context/CartContext";

const PopularDishes = () => {
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState({});
  const [addedItems, setAddedItems] = useState({});

  // Pick 4 featured dishes
  const featuredDishes = foodData.slice(0, 4);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (dish) => {
    addToCart(dish);
    setAddedItems((prev) => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [dish.id]: false }));
    }, 1200);
  };

  return (
    <section className="popular-section" id="popular">
      <div className="popular-container">
        <div className="popular-heading">
          <div>
            <p className="popular-label">🍽️ HANDPICKED SPECIALS</p>
            <h2>
              Our Most <span>Popular Dishes</span>
            </h2>
            <p className="popular-description">
              Hand-crafted delicacies loved by thousands of food enthusiasts across the city.
              Prepared fresh to order with authentic ingredients.
            </p>
          </div>

          <Link to="/menu" className="view-menu-btn">
            <span>View Full Menu</span>
            <span className="btn-arrow">→</span>
          </Link>
        </div>

        <div className="dish-grid">
          {featuredDishes.map((dish) => (
            <div className="dish-card" key={dish.id}>
              <div className="dish-image-wrapper">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="dish-real-img"
                  loading="lazy"
                />

                <div className="dish-badges-top">
                  <span className={`diet-badge ${dish.isVeg ? "veg" : "non-veg"}`}>
                    <span className="diet-dot"></span>
                    {dish.isVeg ? "Veg" : "Non-Veg"}
                  </span>
                  {dish.tag && <span className="dish-tag-badge">{dish.tag}</span>}
                </div>

                <button
                  className={`favorite-btn ${favorites[dish.id] ? "favorited" : ""}`}
                  onClick={() => toggleFavorite(dish.id)}
                  aria-label="Add to favorites"
                >
                  {favorites[dish.id] ? "❤️" : "🤍"}
                </button>
              </div>

              <div className="dish-content">
                <div className="dish-meta-row">
                  <div className="dish-rating">
                    <span className="rating-star-icon">⭐</span>
                    <strong>{dish.rating}</strong>
                    <span className="rating-count">({dish.reviewsCount})</span>
                  </div>
                  <span className="dish-prep-time">⏱️ {dish.prepTime}</span>
                </div>

                <p className="dish-category">{dish.category}</p>
                <h3 className="dish-title">{dish.name}</h3>
                <p className="dish-desc-short">{dish.description}</p>

                <div className="dish-bottom">
                  <div className="dish-price-wrapper">
                    <span className="currency-symbol">₹</span>
                    <strong className="dish-price">{dish.price}</strong>
                  </div>

                  <button
                    className={`add-btn ${addedItems[dish.id] ? "added-success" : ""}`}
                    onClick={() => handleAddToCart(dish)}
                  >
                    {addedItems[dish.id] ? "✓ Added" : "+ Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDishes;