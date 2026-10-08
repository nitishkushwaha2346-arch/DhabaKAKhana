import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, quickDemoLogin } = useAuth();
  const { addToast } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from || "/menu";

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      setIsLoading(false);

      if (result.success) {
        addToast(`Welcome back! Successfully logged in. 👋`, "success");
        navigate(redirectPath);
      } else {
        setErrorMsg(result.message || "Invalid credentials.");
      }
    }, 400);
  };

  const handleDemoLogin = () => {
    quickDemoLogin();
    addToast("Signed in as Demo User (Aarav Sharma) 🎉", "success");
    navigate(redirectPath);
  };

  return (
    <div className="login-page">
      <div className="login-card animate-fade-down">
        {/* Top Icon Badge */}
        <div className="login-icon">
          <span>🍛</span>
        </div>

        <h1>Welcome Back!</h1>
        <p className="login-subtitle">
          Sign in to your Khana Khazana account to track orders and claim royal rewards.
        </p>

        {errorMsg && (
          <div className="login-error-banner">
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              placeholder="e.g. yourname@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <div className="password-label-row">
              <label htmlFor="login-password">Password</label>
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-meta-row">
            <label className="remember-me-label">
              <input type="checkbox" defaultChecked />
              <span>Remember me</span>
            </label>
            <span
              className="forgot-password-link"
              onClick={() => addToast("Password reset link sent to registered email! 📧", "info")}
            >
              Forgot password?
            </span>
          </div>

          {/* Login Submit Button */}
          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Log In to Account →"}
          </button>

          {/* 1-Click Demo Login for testing */}
          <button
            type="button"
            className="demo-login-btn"
            onClick={handleDemoLogin}
          >
            ⚡ Quick Demo Login (1-Click)
          </button>
        </form>

        <div className="login-divider">
          <span>OR</span>
        </div>

        <p className="register-text">
          Don't have an account yet?{" "}
          <Link to="/register" className="register-link-highlight">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;