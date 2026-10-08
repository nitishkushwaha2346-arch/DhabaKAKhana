import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const { addToast } = useCart();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (password.length < 4) {
      setErrorMsg("Password must be at least 4 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please verify.");
      return;
    }

    if (!agreedTerms) {
      setErrorMsg("Please accept the Terms & Conditions to proceed.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const result = register(name, email, password);
      setIsLoading(false);

      if (result.success) {
        addToast(`Welcome to Khana Khazana, ${name}! Your account is ready. 🎉`, "success");
        navigate("/menu");
      } else {
        setErrorMsg(result.message || "Failed to register account.");
      }
    }, 400);
  };

  return (
    <div className="register-page">
      {/* Left Side Presentation */}
      <div className="register-left">
        <div className="register-food">🍛</div>

        <h1>
          Join The <span>Khana Khazana Family</span>
        </h1>

        <p>
          Unlock royal dining perks, lightning-quick reorders, live delivery tracking,
          and exclusive 20% savings on your very first gourmet order.
        </p>

        <div className="register-features">
          <div>✓ Free Home Delivery on orders above ₹499</div>
          <div>✓ Exclusive 20% Welcome Discount code: KHANA20</div>
          <div>✓ Priority Preparation & Real-time Live Order Tracking</div>
          <div>✓ Easy 1-click reorders of your favorite feasts</div>
        </div>

        <div className="register-trust-badge">
          <span>👑</span>
          <p>Over 15,000+ food lovers registered</p>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="register-right">
        <div className="register-box animate-fade-down">
          <div className="register-logo">🍽️</div>

          <h2>Create Your Account</h2>
          <p className="register-subtitle">
            Sign up in seconds to start your royal flavor journey
          </p>

          {errorMsg && (
            <div className="login-error-banner">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="register-input-group">
              <label htmlFor="reg-name">Full Name</label>
              <input
                id="reg-name"
                type="text"
                placeholder="e.g. Priya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="register-input-group">
              <label htmlFor="reg-email">Email Address</label>
              <input
                id="reg-email"
                type="email"
                placeholder="e.g. priya@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="register-input-group">
              <div className="password-label-row">
                <label htmlFor="reg-password">Password</label>
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <input
                id="reg-password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a secure password (min 4 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="register-input-group">
              <label htmlFor="reg-confirm-password">Confirm Password</label>
              <input
                id="reg-confirm-password"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <label className="terms-check">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
              />
              <span>
                I agree to the <Link to="/contact">Terms & Conditions</Link> and{" "}
                <Link to="/contact">Privacy Policy</Link>
              </span>
            </label>

            <button
              type="submit"
              className="register-submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account →"}
            </button>
          </form>

          <div className="register-divider">
            <span>or</span>
          </div>

          <p className="login-text">
            Already have an account?{" "}
            <Link to="/login" className="login-link-highlight">
              Log In here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;