import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { totalCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  // Track scroll position for header glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate("/");
  };

  return (
    <header className={`navbar-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" aria-label="Khana Khazana Home">
          <div className="logo-badge">
            <span className="logo-emoji">🍛</span>
          </div>
          <div className="brand-text">
            <span className="brand-name">
              Khana<span className="brand-accent">Khazana</span>
            </span>
            <span className="brand-tagline">ROYAL TASTE & FLAVORS</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/menu"
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <span>Menu</span>
            <span className="menu-pill-badge">Hot</span>
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <span>Contact</span>
          </NavLink>
        </nav>

        {/* Right Action Icons (Cart, Auth, Mobile Toggle) */}
        <div className="navbar-actions">
          {/* Cart Button */}
          <Link to="/cart" className="cart-action-btn" aria-label="Shopping Cart">
            <div className="cart-icon-wrapper">
              <span className="cart-svg-icon">🛒</span>
              {totalCount > 0 && (
                <span className="cart-badge-counter animate-pop">
                  {totalCount}
                </span>
              )}
            </div>
            <span className="cart-action-text">Cart</span>
          </Link>

          {/* User Profile / Auth Button */}
          {isAuthenticated ? (
            <div className="user-profile-menu">
              <button
                className="user-profile-btn"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                aria-expanded={userDropdownOpen}
              >
                <div className="user-avatar-circle">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="user-greeting-name">{user.name.split(" ")[0]}</span>
                <span className={`dropdown-arrow ${userDropdownOpen ? "open" : ""}`}>
                  ▾
                </span>
              </button>

              {userDropdownOpen && (
                <div className="user-dropdown-panel animate-fade-down">
                  <div className="user-dropdown-header">
                    <p className="dropdown-user-name">{user.name}</p>
                    <p className="dropdown-user-email">{user.email}</p>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link
                    to="/menu"
                    className="dropdown-link"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <span>🍽️</span> Explore Full Menu
                  </Link>
                  <Link
                    to="/cart"
                    className="dropdown-link"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <span>🛍️</span> My Order Cart ({totalCount})
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-logout-btn">
                    <span>🚪</span> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-action-buttons">
              <Link to="/login" className="login-action-btn">
                Log In
              </Link>
              <Link to="/register" className="register-action-btn">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            className={`mobile-toggle-btn ${mobileMenuOpen ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="mobile-nav-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-drawer-header">
              <div className="mobile-brand">
                <span className="mobile-logo-emoji">🍛</span>
                <span className="mobile-logo-title">Khana Khazana</span>
              </div>
              <button
                className="close-drawer-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                ✕
              </button>
            </div>

            <nav className="mobile-nav-list">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? "active" : ""}`
                }
              >
                <span className="mobile-link-icon">🏠</span>
                <span>Home</span>
              </NavLink>

              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? "active" : ""}`
                }
              >
                <span className="mobile-link-icon">🍽️</span>
                <span>Explore Menu</span>
                <span className="mobile-hot-tag">Hot</span>
              </NavLink>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? "active" : ""}`
                }
              >
                <span className="mobile-link-icon">🛒</span>
                <span>View Cart</span>
                {totalCount > 0 && (
                  <span className="mobile-cart-badge">{totalCount}</span>
                )}
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? "active" : ""}`
                }
              >
                <span className="mobile-link-icon">📞</span>
                <span>Contact & Support</span>
              </NavLink>
            </nav>

            <div className="mobile-drawer-footer">
              {isAuthenticated ? (
                <div className="mobile-user-card">
                  <div className="mobile-user-info">
                    <div className="user-avatar-circle">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="mobile-user-name">{user.name}</p>
                      <p className="mobile-user-email">{user.email}</p>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="mobile-logout-btn">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="mobile-auth-grid">
                  <Link to="/login" className="mobile-login-btn">
                    Log In
                  </Link>
                  <Link to="/register" className="mobile-signup-btn">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;