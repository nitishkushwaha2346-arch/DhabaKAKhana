import React from "react";
import { Link } from "react-router-dom";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: "🥬",
      title: "Farm-Fresh Produce",
      description: "Locally sourced organic vegetables, dairy and premium grains, inspected daily for exceptional freshness.",
      badge: "Organic"
    },
    {
      id: 2,
      icon: "👨‍🍳",
      title: "Master Culinary Chefs",
      description: "Our veteran chefs bring decades of royal kitchen experience, crafting every dish to gourmet perfection.",
      badge: "Expert"
    },
    {
      id: 3,
      icon: "🚀",
      title: "30-Min Fast Delivery",
      description: "Insulated thermal packaging ensures your food reaches you piping hot, fresh and spill-proof every single time.",
      badge: "Express"
    },
    {
      id: 4,
      icon: "🛡️",
      title: "100% Hygienic Kitchens",
      description: "Strict ISO-certified safety protocols, regular temperature checks, and certified clean kitchen environments.",
      badge: "Certified"
    },
  ];

  return (
    <section className="why-section">
      <div className="why-container">
        <div className="why-header">
          <p className="why-label">❤️ WHY THOUSANDS CHOOSE US</p>
          <h2>
            Crafting Unforgettable <span>Dining Moments</span>
          </h2>
          <p>
            At Khana Khazana, we believe great food isn't just fuel — it's an extraordinary
            experience celebrating tradition, freshness, and shared moments with loved ones.
          </p>
        </div>

        <div className="why-grid">
          {features.map((feature) => (
            <div className="why-card" key={feature.id}>
              <div className="why-card-top">
                <div className="why-icon">{feature.icon}</div>
                <span className="why-tag">{feature.badge}</span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <Link to="/menu" className="why-arrow">
                Order Dishes Now →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;