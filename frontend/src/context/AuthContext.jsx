import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load authenticated user from localStorage
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("khana_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Load existing registered users
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem("khana_registered_users");
      return saved ? JSON.parse(saved) : [
        {
          name: "Rahul Verma",
          email: "demo@khana.com",
          password: "password123",
          phone: "+91 98765 43210"
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("khana_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("khana_user");
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem("khana_registered_users", JSON.stringify(registeredUsers));
    } catch (e) {
      console.error(e);
    }
  }, [registeredUsers]);

  const login = (email, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    const existing = registeredUsers.find(
      (u) => u.email.toLowerCase() === trimmedEmail && u.password === password
    );

    if (existing) {
      setUser({ name: existing.name, email: existing.email, phone: existing.phone || "+91 98765 00000" });
      return { success: true };
    }

    // Allow flexible test login if any non-empty valid looking credentials provided
    if (trimmedEmail.includes("@") && password.length >= 4) {
      const fallbackName = trimmedEmail.split("@")[0].replace(/[._]/g, " ");
      const formattedName = fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1);
      const newUser = {
        name: formattedName || "Food Lover",
        email: trimmedEmail,
        password: password,
        phone: "+91 98765 12345"
      };
      setRegisteredUsers((prev) => [...prev, newUser]);
      setUser({ name: newUser.name, email: newUser.email, phone: newUser.phone });
      return { success: true };
    }

    return {
      success: false,
      message: "Invalid email or password. Password must be at least 4 characters."
    };
  };

  const register = (name, email, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    const existing = registeredUsers.find(
      (u) => u.email.toLowerCase() === trimmedEmail
    );

    if (existing) {
      return {
        success: false,
        message: "An account with this email already exists! Please login instead."
      };
    }

    const newUser = {
      name: name.trim(),
      email: trimmedEmail,
      password: password,
      phone: "+91 98765 88990"
    };

    setRegisteredUsers((prev) => [...prev, newUser]);
    setUser({ name: newUser.name, email: newUser.email, phone: newUser.phone });
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const quickDemoLogin = () => {
    const demo = {
      name: "Aarav Sharma",
      email: "aarav@khanakhazana.com",
      phone: "+91 98765 43210"
    };
    setUser(demo);
    return demo;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        quickDemoLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
