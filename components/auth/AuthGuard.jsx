"use client";

import { useUser } from "@/hooks/useUser";
import LoginScreen from "./LoginScreen";

export default function AuthGuard({ children }) {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", background: "var(--navy)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: "16px",
      }}>
        <div style={{ fontSize: "2.5rem" }}>🛡️</div>
        <div style={{
          fontFamily: "var(--font-lora), serif",
          fontSize: "1rem", fontWeight: 600,
          color: "rgba(255,255,255,0.7)",
        }}>Loading your app…</div>
      </div>
    );
  }

  if (!user) return <LoginScreen />;

  return children;
}
