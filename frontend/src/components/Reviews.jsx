import React from "react";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Aaditya Singhania",
      role: "Verified Foodie • Gurugram",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      rating: "5.0",
      dish: "Paneer Butter Masala & Garlic Naan",
      review:
        "Easily the best Paneer Butter Masala in town! Rich, buttery, and not overly sweet. Arrived steaming hot in just 26 minutes with superb insulated packaging.",
    },
    {
      id: 2,
      name: "Sneha Mukherjee",
      role: "Regular Customer • Delhi NCR",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      rating: "4.9",
      dish: "Hyderabadi Veg Dum Biryani",
      review:
        "The dum aroma when you open the box is unreal. The basmati grains are long, flavorful and the salan provided on the side complements it to perfection. Highly recommended!",
    },
    {
      id: 3,
      name: "Vikram Malhotra",
      role: "Food Critic & Blogger",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
      rating: "5.0",
      dish: "Choco Lava Cake & Hakka Noodles",
      review:
        "Top-notch quality consistency. From their Chinese wok specials to their molten chocolate lava dessert, Khana Khazana never disappoints our family weekend feasts.",
    },
  ];

  return (
    <section className="reviews-section">
      <div className="reviews-container">
        {/* Header */}
        <div className="reviews-header">
          <p className="reviews-label">⭐ REAL STORIES & EXPERIENCES</p>
          <h2>
            Loved By Over <span>15,000+ Foodies</span>
          </h2>
          <p>
            Don't just take our word for it. Here is what real customers have to say about
            their feasts from Khana Khazana.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div className="review-card" key={review.id}>
              <div className="review-top">
                <div className="customer-info">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="customer-avatar-img"
                  />
                  <div>
                    <h3>{review.name}</h3>
                    <p className="customer-role">{review.role}</p>
                    <span className="customer-dish-tag">Ordered: {review.dish}</span>
                  </div>
                </div>

                <div className="review-rating-chip">
                  <span>⭐</span>
                  <strong>{review.rating}</strong>
                </div>
              </div>

              <div className="quote-mark">“</div>
              <p className="review-text">{review.review}</p>

              <div className="review-stars-row">
                <span className="stars-glow">★★★★★</span>
                <span className="verified-badge">✓ Verified Order</span>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Rating Callout */}
        <div className="overall-rating">
          <div className="rating-number">
            <strong>4.9</strong>
            <span>/ 5.0</span>
          </div>

          <div className="rating-details">
            <div className="big-stars">★★★★★</div>
            <p>Based on 12,450+ verified customer ratings on Google & Zomato</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;