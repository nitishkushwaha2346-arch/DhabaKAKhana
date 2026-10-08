import React from "react";
import { Link } from "react-router-dom";

const FoodCategories = () => {
  const categories = [
    {
      id: 1,
      name: "Indian",
      displayName: "Indian Curries & Biryani",
      icon: "🍛",
      items: "25+ Royal Dishes",
      badge: "Signature"
    },
    {
      id: 2,
      name: "Pizza",
      displayName: "Artisan Pizzas",
      icon: "🍕",
      items: "15+ Hand-tossed",
      badge: "Cheesy"
    },
    {
      id: 3,
      name: "Burger",
      displayName: "Gourmet Burgers",
      icon: "🍔",
      items: "12+ Juicy Burgers",
      badge: "Crispy"
    },
    {
      id: 4,
      name: "Chinese",
      displayName: "Chinese & Asian",
      icon: "🍜",
      items: "18+ Wok Specials",
      badge: "Spicy"
    },
    {
      id: 5,
      name: "Desserts",
      displayName: "Sweet Desserts",
      icon: "🍰",
      items: "10+ Traditional Sweets",
      badge: "Sweet"
    },
    {
      id: 6,
      name: "Drinks",
      displayName: "Chilled Beverages",
      icon: "🥤",
      items: "15+ Refreshers",
      badge: "Cool"
    },
  ];

  return (
    <section className="categories-section">
      <div className="categories-container">
        <div className="categories-header">
          <p className="categories-label">🍽️ BROWSE BY CATEGORY</p>
          <h2>
            Choose Your <span>Favorite Cuisine</span>
          </h2>
          <p>
            From rich Mughlai gravies and slow-cooked dum biryanis to wood-fired pizzas
            and artisanal desserts, find whatever you crave in seconds.
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              to={`/menu?category=${category.name}`}
              className="category-card"
              key={category.id}
            >
              <div className="category-badge-small">{category.badge}</div>
              <div className="category-icon">{category.icon}</div>
              <h3>{category.displayName}</h3>
              <p>{category.items}</p>
              <span className="category-explore-link">
                Explore Menu →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodCategories;