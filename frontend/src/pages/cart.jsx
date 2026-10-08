import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    discountAmount,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    clearCart,
    addToast
  } = useCart();

  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState(
    "Flat 402, Sunshine Residency, Sector 29, Gurugram, Haryana - 122002"
  );
  const [paymentMethod, setPaymentMethod] = useState("upi"); // 'upi', 'cod', 'card'
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(null);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError("");
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput("");
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      addToast("Your cart is empty!", "error");
      return;
    }

    if (!deliveryAddress.trim()) {
      addToast("Please provide a valid delivery address", "error");
      return;
    }

    setIsCheckingOut(true);

    // Simulate instant secure order creation
    setTimeout(() => {
      const newOrder = {
        orderId: "KK-" + Math.floor(100000 + Math.random() * 900000),
        items: [...cart],
        subtotal,
        discount: discountAmount,
        deliveryFee,
        total: grandTotal,
        paymentMethod:
          paymentMethod === "upi"
            ? "UPI / Instant Pay"
            : paymentMethod === "cod"
            ? "Cash on Delivery"
            : "Card Payment",
        address: deliveryAddress,
        customerName: user?.name || "Valued Foodie",
        placedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        estimatedTime: "25-35 Minutes"
      };

      setOrderCompleted(newOrder);
      clearCart();
      setIsCheckingOut(false);
      addToast("🎉 Order placed successfully! Our chefs are preparing your meal.", "success");
    }, 1000);
  };

  return (
    <div className="cart-page">
      {/* Cart Hero Header */}
      <section className="cart-hero">
        <div className="cart-hero-content">
          <p className="cart-hero-badge">🛒 KHANA KHAZANA BASKET</p>
          <h1>
            Your <span>Delicious Cart</span>
          </h1>
          <p className="cart-hero-text">
            Review your selected dishes, customize delivery details, and enjoy royal flavors.
          </p>
        </div>
      </section>

      {/* Cart Body */}
      <section className="cart-section">
        {cart.length > 0 ? (
          <div className="cart-container">
            {/* Left Side: Cart Items Table */}
            <div className="cart-items">
              <div className="cart-heading">
                <h2>Review Your Items</h2>
                <span className="items-count-tag">{cart.length} Dishes</span>
              </div>

              {/* Free Delivery Progress Bar */}
              <div className="free-delivery-bar-box">
                {subtotal < 499 ? (
                  <p className="free-del-text">
                    Add <strong>₹{499 - subtotal}</strong> more to unlock{" "}
                    <span className="highlight-free">FREE Delivery! 🚚</span>
                  </p>
                ) : (
                  <p className="free-del-text unlocked">
                    🎉 You have unlocked <strong>FREE Delivery!</strong>
                  </p>
                )}
                <div className="free-del-progress-track">
                  <div
                    className="free-del-progress-fill"
                    style={{ width: `${Math.min(100, (subtotal / 499) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Cart List */}
              <div className="cart-items-list">
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div className="cart-item-image">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-thumb-img"
                      />
                    </div>

                    <div className="cart-item-info">
                      <div className="cart-item-cat-diet">
                        <span className={`diet-icon-pill ${item.isVeg ? "veg" : "non-veg"}`}>
                          <span className="dot"></span>
                          {item.isVeg ? "Veg" : "Non-Veg"}
                        </span>
                        <span className="cart-category-tag">{item.category}</span>
                      </div>
                      <h3>{item.name}</h3>
                      <div className="item-unit-price">₹{item.price} each</div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="quantity-box">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        title="Decrease quantity"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        title="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="item-total">
                      ₹{item.price * item.quantity}
                    </div>

                    {/* Remove Action */}
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Delivery Address Box */}
              <div className="delivery-address-panel">
                <div className="address-panel-header">
                  <span>📍</span>
                  <h3>Delivery Address</h3>
                </div>
                <textarea
                  className="address-textarea"
                  rows="2"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter full delivery address with house/flat number and landmark..."
                ></textarea>
                <div className="address-note">
                  ⚡ Guaranteed delivery within 30-35 mins to this address.
                </div>
              </div>

              {/* Navigation Back */}
              <div className="cart-actions-row">
                <Link to="/menu" className="continue-shopping">
                  ← Add More Dishes
                </Link>
                <button
                  className="clear-cart-link"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to empty your cart?")) {
                      clearCart();
                    }
                  }}
                >
                  Empty Cart
                </button>
              </div>
            </div>

            {/* Right Side: Order Summary */}
            <div className="order-summary">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                <strong>₹{subtotal}</strong>
              </div>

              <div className="summary-row">
                <span>Delivery Fee</span>
                <strong>
                  {deliveryFee === 0 ? (
                    <span className="free-text">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </strong>
              </div>

              {appliedCoupon && (
                <div className="summary-row discount-row">
                  <span>
                    Coupon Discount ({appliedCoupon.code})
                    <button
                      onClick={removeCoupon}
                      className="remove-coupon-btn"
                      title="Remove coupon"
                    >
                      (remove)
                    </button>
                  </span>
                  <strong className="discount-value">- ₹{discountAmount}</strong>
                </div>
              )}

              <div className="summary-line"></div>

              <div className="summary-total">
                <div>
                  <span>Total Amount</span>
                  <small className="inclusive-text">Inclusive of all taxes</small>
                </div>
                <strong>₹{grandTotal}</strong>
              </div>

              {/* Coupon Box */}
              <div className="coupon-card">
                <label className="coupon-label">Have a promo code?</label>
                <form onSubmit={handleApplyCoupon} className="coupon-form">
                  <input
                    type="text"
                    placeholder="e.g. KHANA20"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                  />
                  <button type="submit">Apply</button>
                </form>
                {couponError && <p className="coupon-error-msg">{couponError}</p>}

                {/* Quick Suggest Coupons */}
                <div className="quick-coupons-wrap">
                  <span className="quick-label">Try:</span>
                  <button
                    type="button"
                    className="quick-coupon-pill"
                    onClick={() => applyCoupon("KHANA20")}
                  >
                    KHANA20 (20% OFF)
                  </button>
                  <button
                    type="button"
                    className="quick-coupon-pill"
                    onClick={() => applyCoupon("TASTY50")}
                  >
                    TASTY50 (₹50 OFF)
                  </button>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="payment-method-selector">
                <label className="payment-label">Select Payment Method</label>
                <div className="payment-options">
                  <label className={`payment-option ${paymentMethod === "upi" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                    />
                    <span>📱 UPI / GPay / PhonePe</span>
                  </label>

                  <label className={`payment-option ${paymentMethod === "cod" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <span>💵 Cash on Delivery (COD)</span>
                  </label>

                  <label className={`payment-option ${paymentMethod === "card" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />
                    <span>💳 Credit / Debit Card</span>
                  </label>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  <span>Placing Order... ⏳</span>
                ) : (
                  <span>Proceed to Checkout (₹{grandTotal}) →</span>
                )}
              </button>

              <div className="secure-payment">
                <span>🔒</span> 100% Encrypted & Safe Payment Guarantee
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <div className="empty-cart-container">
            <div className="empty-cart-plate">
              <span className="plate-emoji">🍽️</span>
            </div>
            <h2>Your Cart is Feeling Empty!</h2>
            <p>
              Good food is meant to be shared. Explore our delicious royal curries,
              fragrant biryanis, wood-fired pizzas and fresh treats now!
            </p>
            <div className="empty-cart-actions">
              <Link to="/menu" className="browse-menu-action-btn">
                <span>Browse Delicious Menu</span>
                <span>→</span>
              </Link>
              <Link to="/" className="home-action-btn">
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Order Confirmation / Live Tracking Modal */}
      {orderCompleted && (
        <div className="order-modal-overlay">
          <div className="order-modal-card animate-scale-up">
            <div className="order-modal-top">
              <div className="celebration-circle">🎉</div>
              <h2>Order Placed Successfully!</h2>
              <p className="order-id-badge">Order ID: {orderCompleted.orderId}</p>
              <p className="estimated-time-text">
                Estimated Delivery in <strong>{orderCompleted.estimatedTime}</strong>
              </p>
            </div>

            {/* Tracking Progress Simulation */}
            <div className="order-tracking-steps">
              <div className="tracking-step completed">
                <div className="step-circle">✓</div>
                <div className="step-label">Order Placed</div>
              </div>
              <div className="tracking-line completed"></div>
              <div className="tracking-step active">
                <div className="step-circle">🍳</div>
                <div className="step-label">Preparing</div>
              </div>
              <div className="tracking-line"></div>
              <div className="tracking-step">
                <div className="step-circle">🛵</div>
                <div className="step-label">On The Way</div>
              </div>
              <div className="tracking-line"></div>
              <div className="tracking-step">
                <div className="step-circle">🏠</div>
                <div className="step-label">Delivered</div>
              </div>
            </div>

            {/* Order Details Brief */}
            <div className="order-summary-box">
              <h4>Order Summary</h4>
              <div className="ordered-dishes-list">
                {orderCompleted.items.map((i) => (
                  <div key={i.id} className="order-item-row">
                    <span>
                      {i.name} <strong>x{i.quantity}</strong>
                    </span>
                    <span>₹{i.price * i.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="order-modal-total-line">
                <span>Total Paid ({orderCompleted.paymentMethod}):</span>
                <strong>₹{orderCompleted.total}</strong>
              </div>
              <p className="order-modal-address">
                <strong>Delivering to:</strong> {orderCompleted.address}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="order-modal-actions">
              <button
                className="order-more-btn"
                onClick={() => {
                  setOrderCompleted(null);
                  navigate("/menu");
                }}
              >
                Order More Food 🍽️
              </button>
              <button
                className="close-receipt-btn"
                onClick={() => {
                  setOrderCompleted(null);
                  navigate("/");
                }}
              >
                Back to Home Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
