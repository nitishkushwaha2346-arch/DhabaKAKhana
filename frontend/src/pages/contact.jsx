import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const Contact = () => {
  const { addToast } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Order Inquiry",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "How fast is your home delivery?",
      a: "Our average preparation and delivery time is 25-35 minutes. All dishes are packed in thermal, spill-proof insulated containers to guarantee your meal arrives steaming hot."
    },
    {
      q: "Do you offer pure vegetarian food?",
      a: "Yes! Over 80% of our menu consists of authentic pure vegetarian specialties. Our vegetarian kitchen section is completely separated with dedicated cookware and certified prep counters."
    },
    {
      q: "How do I apply coupon codes for discounts?",
      a: "You can apply coupon codes directly in your shopping cart before checkout. Use code 'KHANA20' for 20% off or 'TASTY50' for flat ₹50 off on eligible orders."
    },
    {
      q: "Do you accept large party catering or bulk corporate orders?",
      a: "Absolutely! We cater weddings, corporate lunches, and family gatherings of 20 to 500+ guests. Call our special catering hotline at +91 98765 43210 for tailored packages."
    }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      addToast("Please fill in all required fields", "error");
      return;
    }

    setSubmitted(true);
    addToast("🎉 Message received! Our support team will get in touch within 2 hours.", "success");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "Order Inquiry",
      message: ""
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <p className="contact-hero-badge">📞 24/7 CUSTOMER CARE & SUPPORT</p>
          <h1>
            We Are Always <span>Here For You</span>
          </h1>
          <p className="contact-hero-text">
            Have questions about your order, special dietary requirements, or catering?
            Reach out through the form below or connect with our support line directly.
          </p>
        </div>
      </section>

      {/* Main Contact Content */}
      <section className="contact-section">
        <div className="contact-container">
          {/* Left Side: Info Cards */}
          <div className="contact-info">
            <p className="contact-label">📍 GET IN TOUCH</p>

            <h2>
              Let's Start A <span>Conversation</span>
            </h2>

            <p className="contact-description">
              Our culinary concierge team is available 7 days a week to ensure your
              dining experience is nothing short of exceptional.
            </p>

            <div className="contact-details">
              <div className="contact-card">
                <div className="contact-icon">📍</div>
                <div>
                  <h3>Main Restaurant & Cloud Kitchen</h3>
                  <p>
                    Plot 42, Sector 29, Cyber Hub Road,
                    <br />
                    Gurugram, Haryana - 122002, India
                  </p>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-icon">📞</div>
                <div>
                  <h3>Direct Phone & Orders</h3>
                  <p>
                    <a href="tel:+919876543210" className="contact-link-highlight">
                      +91 98765 43210
                    </a>
                    <br />
                    Toll-Free: 1800-456-KHAZANA
                  </p>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-icon">✉️</div>
                <div>
                  <h3>Official Email Address</h3>
                  <p>
                    <a href="mailto:support@khanakhazana.com" className="contact-link-highlight">
                      support@khanakhazana.com
                    </a>
                    <br />
                    partnerships@khanakhazana.com
                  </p>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-icon">🕐</div>
                <div>
                  <h3>Kitchen Service Hours</h3>
                  <p>
                    Monday – Friday: 10:30 AM – 11:30 PM
                    <br />
                    Saturday – Sunday: 09:30 AM – 12:30 AM
                  </p>
                </div>
              </div>
            </div>

            {/* Live WhatsApp Callout */}
            <div className="whatsapp-help-box">
              <span className="wa-icon">💬</span>
              <div>
                <strong>Need instant help with an existing order?</strong>
                <p>Chat directly with our live kitchen manager on WhatsApp</p>
              </div>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="wa-chat-btn"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="contact-form-box">
            <h2>Send Us A Message</h2>
            <p>
              Fill out this form and our support team will get back to you promptly.
            </p>

            {submitted && (
              <div className="contact-success-banner">
                <span>✓</span>
                <span>Thank you! Your message has been sent successfully.</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cnt-name">Your Full Name *</label>
                  <input
                    id="cnt-name"
                    name="name"
                    type="text"
                    placeholder="e.g. Ramesh Gupta"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cnt-email">Email Address *</label>
                  <input
                    id="cnt-email"
                    name="email"
                    type="email"
                    placeholder="e.g. ramesh@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cnt-phone">Phone Number (Optional)</label>
                  <input
                    id="cnt-phone"
                    name="phone"
                    type="tel"
                    placeholder="e.g. +91 98765 00000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cnt-subject">Inquiry Subject</label>
                  <select
                    id="cnt-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="subject-select"
                  >
                    <option value="Order Inquiry">Order Inquiry / Delivery Status</option>
                    <option value="Party Catering">Bulk / Party Catering</option>
                    <option value="Feedback">Feedback / Suggestions</option>
                    <option value="Franchise">Franchise & Business Partnership</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="cnt-message">Your Message *</label>
                <textarea
                  id="cnt-message"
                  name="message"
                  rows="5"
                  placeholder="How can we help you? Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="send-message-btn">
                <span>Send Message Now</span>
                <span>→</span>
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="faq-section-container">
          <div className="faq-header">
            <p className="faq-badge">❓ FREQUENTLY ASKED QUESTIONS</p>
            <h2>Got Questions? We Have Answers</h2>
          </div>

          <div className="faq-accordion-list">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-item-card ${activeFaq === idx ? "active" : ""}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="faq-question-row">
                  <h3>{faq.q}</h3>
                  <span className="faq-expand-icon">
                    {activeFaq === idx ? "−" : "+"}
                  </span>
                </div>
                {activeFaq === idx && (
                  <div className="faq-answer-body animate-fade-down">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;