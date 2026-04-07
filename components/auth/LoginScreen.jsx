"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const supabase = createClient();

  async function handleSendLink(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false }, // only allow existing users (you create them)
    });
    setLoading(false);
    if (error) {
      setError("We couldn't find that email. Please contact your care coordinator.");
    } else {
      setSent(true);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--cream)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 24px",
      maxWidth: "480px",
      margin: "0 auto",
    }}>
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <div style={{
          width: "72px", height: "72px", borderRadius: "50%",
          background: "var(--navy)", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: "2rem", margin: "0 auto 16px",
        }}>🛡️</div>
        <div style={{
          fontFamily: "var(--font-lora), serif",
          fontSize: "1.3rem", fontWeight: 600,
          color: "var(--navy)", marginBottom: "4px",
        }}>Pampered Companion Care</div>
        <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
          Safety &amp; Wellness Companion
        </div>
      </div>

      {!sent ? (
        <div style={{
          background: "white", borderRadius: "20px",
          border: "1.5px solid var(--border)",
          boxShadow: "var(--shadow)",
          padding: "28px 24px", width: "100%",
        }}>
          <div style={{
            fontFamily: "var(--font-lora), serif",
            fontSize: "1.1rem", fontWeight: 600,
            color: "var(--navy)", marginBottom: "8px",
          }}>Welcome back 👋</div>
          <div style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "24px", lineHeight: 1.6 }}>
            Enter the email address your care coordinator set up for you. We&apos;ll send you a secure sign-in link — no password needed.
          </div>

          <form onSubmit={handleSendLink}>
            <label style={{
              fontSize: "0.75rem", fontWeight: 800,
              textTransform: "uppercase", letterSpacing: "0.08em",
              color: "var(--navy)", display: "block", marginBottom: "8px",
            }}>Your Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={{
                width: "100%", padding: "14px 16px",
                borderRadius: "12px", border: "1.5px solid var(--border)",
                fontSize: "1rem", fontFamily: "inherit",
                background: "var(--cream)", color: "var(--text)",
                marginBottom: "16px", outline: "none",
              }}
            />
            {error && (
              <div style={{
                background: "#FDECEA", color: "var(--red)",
                borderRadius: "10px", padding: "12px 14px",
                fontSize: "0.85rem", fontWeight: 700,
                marginBottom: "16px",
              }}>{error}</div>
            )}
            <button
              type="submit"
              disabled={loading || !email}
              style={{
                width: "100%", padding: "16px",
                borderRadius: "14px", border: "none",
                background: loading || !email ? "var(--border)" : "var(--navy)",
                color: "white", fontSize: "1rem", fontWeight: 900,
                fontFamily: "inherit", cursor: loading || !email ? "default" : "pointer",
                transition: "background 0.2s",
              }}
            >
              {loading ? "Sending…" : "📧 Send My Sign-In Link"}
            </button>
          </form>

          <div style={{
            marginTop: "20px", textAlign: "center",
            fontSize: "0.78rem", color: "var(--muted)",
          }}>
            Need help? Call your coordinator at Pampered Companion Care.
          </div>
        </div>
      ) : (
        <div style={{
          background: "white", borderRadius: "20px",
          border: "1.5px solid var(--border)",
          boxShadow: "var(--shadow)",
          padding: "36px 24px", width: "100%", textAlign: "center",
        }}>
          <div style={{ fontSize: "3.5rem", marginBottom: "16px" }}>📬</div>
          <div style={{
            fontFamily: "var(--font-lora), serif",
            fontSize: "1.15rem", fontWeight: 600,
            color: "var(--navy)", marginBottom: "12px",
          }}>Check your email!</div>
          <div style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.7 }}>
            We sent a sign-in link to<br />
            <strong style={{ color: "var(--text)" }}>{email}</strong><br /><br />
            Tap the link in that email to open your app. The link expires in 1 hour.
          </div>
          <button
            onClick={() => { setSent(false); setEmail(""); }}
            style={{
              marginTop: "24px", background: "transparent",
              border: "none", color: "var(--muted)",
              fontSize: "0.85rem", cursor: "pointer", textDecoration: "underline",
            }}
          >
            Use a different email
          </button>
        </div>
      )}
    </div>
  );
}
