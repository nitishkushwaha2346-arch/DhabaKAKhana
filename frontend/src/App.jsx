import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToastContainer from "./components/ToastContainer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/cart";
import Contact from "./pages/contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Automatically scroll to top on page navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ScrollToTop />
        <div className="app-layout">
          {/* Header Navigation */}
          <Navbar />

          {/* Main Route Pages */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Catch-all route fallback */}
            <Route path="*" element={<Home />} />
          </Routes>

          {/* Global Footer */}
          <Footer />

          {/* Global Toast Notifications Container */}
          <ToastContainer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;