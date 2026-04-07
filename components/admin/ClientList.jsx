"use client";

export default function ClientList({ clients, loading, onSelect }) {
  if (loading) {
    return <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--muted)" }}>Loading clients…</div>;
  }

  return (
    <div>
      <div style={{ padding: "20px 20px 10px", fontFamily: "var(--font-lora), serif", fontSize: "1.3rem", fontWeight: 600, color: "var(--navy)" }}>
        Your Clients
      </div>
      <div style={{ padding: "0 20px 16px", fontSize: "0.85rem", color: "var(--muted)" }}>
        {clients.length} active client{clients.length !== 1 ? "s" : ""}
      </div>

      {clients.length === 0 && (
        <div style={{ padding: "24px 20px", color: "var(--muted)", fontSize: "0.9rem", textAlign: "center" }}>
          No clients yet. Invite clients via the Supabase dashboard by creating their user accounts.
        </div>
      )}

      <div style={{ padding: "0 20px" }}>
        {clients.map((client) => (
          <div
            key={client.id}
            onClick={() => onSelect(client)}
            style={{
              background: "white", borderRadius: "16px",
              border: "1.5px solid var(--border)",
              padding: "16px 18px", marginBottom: "12px",
              display: "flex", alignItems: "center", gap: "14px",
              boxShadow: "var(--shadow)", cursor: "pointer",
            }}
          >
            <div style={{
              width: "48px", height: "48px", borderRadius: "50%",
              background: "var(--navy)", color: "var(--gold-light)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.1rem", fontWeight: 900, flexShrink: 0,
            }}>
              {client.full_name ? client.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() : "?"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text)" }}>
                {client.full_name || "Unnamed Client"}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: "2px" }}>
                {client.phone || "No phone"} · {client.address || "No address"}
              </div>
            </div>
            <div style={{ color: "var(--muted)", fontSize: "1.2rem" }}>›</div>
          </div>
        ))}
      </div>
    </div>
  );
}
