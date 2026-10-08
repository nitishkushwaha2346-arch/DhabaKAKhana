import React from "react";
import { useCart } from "../context/CartContext";

const ToastContainer = () => {
  const { toasts, removeToast } = useCart();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" style={{
      position: "fixed",
      bottom: "28px",
      right: "28px",
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      pointerEvents: "none"
    }}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast-item toast-${toast.type}`}
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: toast.type === "success" ? "#1e3a1e" : toast.type === "error" ? "#3a1e1e" : "#1e243a",
            color: "#ffffff",
            padding: "14px 20px",
            borderRadius: "14px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
            backdropFilter: "blur(8px)",
            border: `1px solid ${
              toast.type === "success" ? "#4caf50" : toast.type === "error" ? "#f44336" : "#2196f3"
            }`,
            animation: "slideInToast 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            maxWidth: "380px",
            fontSize: "14.5px",
            fontWeight: 500,
            lineHeight: 1.4
          }}
        >
          <span style={{ fontSize: "18px" }}>
            {toast.type === "success" ? "✓" : toast.type === "error" ? "⚠️" : "ℹ️"}
          </span>
          <span style={{ flex: 1 }}>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(255,255,255,0.7)",
              cursor: "pointer",
              fontSize: "16px",
              padding: "0 4px",
              transition: "color 0.2s"
            }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
