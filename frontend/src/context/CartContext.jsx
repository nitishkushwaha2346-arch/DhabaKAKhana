import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load initial cart from localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("khana_cart");
      return savedCart ? JSON.parse(savedCart) : [
        {
          id: 1,
          name: "Paneer Butter Masala",
          category: "Indian",
          price: 240,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80",
          isVeg: true
        },
        {
          id: 3,
          name: "Farmhouse Cheese Burst Pizza",
          category: "Pizza",
          price: 299,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80",
          isVeg: true
        }
      ];
    } catch (e) {
      return [];
    }
  });

  // Coupons
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem("khana_coupon");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Save cart on change
  useEffect(() => {
    try {
      localStorage.setItem("khana_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  // Save coupon on change
  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem("khana_coupon", JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem("khana_coupon");
      }
    } catch (e) {
      console.error(e);
    }
  }, [appliedCoupon]);

  // Cart operations
  const addToCart = (item, qty = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty
        };
        return updated;
      } else {
        return [...prevCart, { ...item, quantity: qty }];
      }
    });

    addToast(`Added "${item.name}" to cart! 🛒`, "success");
  };

  const removeFromCart = (id) => {
    const item = cart.find((i) => i.id === id);
    setCart((prevCart) => prevCart.filter((i) => i.id !== id));
    if (item) {
      addToast(`Removed "${item.name}" from cart`, "info");
    }
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal === 0 || subtotal >= 499 ? 0 : 40;

  let discountAmount = 0;
  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.type === "percent") {
      discountAmount = Math.round((subtotal * appliedCoupon.value) / 100);
      if (appliedCoupon.maxDiscount) {
        discountAmount = Math.min(discountAmount, appliedCoupon.maxDiscount);
      }
    } else if (appliedCoupon.type === "flat") {
      discountAmount = appliedCoupon.value;
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Apply Coupon
  const applyCoupon = (codeRaw) => {
    const code = codeRaw.trim().toUpperCase();
    if (!code) {
      return { success: false, message: "Please enter a valid coupon code" };
    }

    if (subtotal === 0) {
      return { success: false, message: "Add items to your cart before applying a coupon" };
    }

    if (code === "KHANA20") {
      const couponObj = {
        code: "KHANA20",
        type: "percent",
        value: 20,
        maxDiscount: 150,
        description: "20% OFF (Up to ₹150)"
      };
      setAppliedCoupon(couponObj);
      addToast("Coupon KHANA20 applied! Saved 20% 🎉", "success");
      return { success: true, message: "20% OFF coupon applied successfully!" };
    }

    if (code === "TASTY50") {
      if (subtotal < 200) {
        return { success: false, message: "TASTY50 requires a minimum order of ₹200" };
      }
      const couponObj = {
        code: "TASTY50",
        type: "flat",
        value: 50,
        description: "Flat ₹50 OFF"
      };
      setAppliedCoupon(couponObj);
      addToast("Coupon TASTY50 applied! Saved ₹50 💸", "success");
      return { success: true, message: "Flat ₹50 discount applied!" };
    }

    if (code === "WELCOME100") {
      if (subtotal < 399) {
        return { success: false, message: "WELCOME100 requires a minimum order of ₹399" };
      }
      const couponObj = {
        code: "WELCOME100",
        type: "flat",
        value: 100,
        description: "Flat ₹100 OFF on First Order"
      };
      setAppliedCoupon(couponObj);
      addToast("Welcome coupon applied! Saved ₹100 🌟", "success");
      return { success: true, message: "₹100 discount applied!" };
    }

    return {
      success: false,
      message: "Invalid coupon code. Try KHANA20, TASTY50, or WELCOME100"
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast("Coupon removed", "info");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        deliveryFee,
        appliedCoupon,
        discountAmount,
        grandTotal,
        totalCount,
        applyCoupon,
        removeCoupon,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
