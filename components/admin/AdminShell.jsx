"use client";

import { useState } from "react";
import { useAdminData } from "@/hooks/useAdminData";
import ClientList from "./ClientList";
import ClientDetail from "./ClientDetail";
import { createClient } from "@/lib/supabase";

export default function AdminShell() {
  const admin = useAdminData();
  const [view, setView] = useState("list"); // "list" | "detail"
  const supabase = createClient();

  async function handleSelectClient(client) {
    await admin.selectClient(client);
    setView("detail");
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", minHeight: "100vh", background: "var(--cream)" }}>
      {/* Admin Top Bar */}
      <div style={{
        background: "var(--navy)", padding: "16px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div>
          <div style={{ fontFamily: "var(--font-lora), serif", fontSize: "1rem", fontWeight: 600, color: "var(--gold-light)" }}>
            {view === "detail" ? (
              <button onClick={() => setView("list")} style={{ background: "none", border: "none", color: "var(--gold-light)", fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit", cursor: "pointer" }}>
                ← Clients
              </button>
            ) : "PCC Admin"}
          </div>
          <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", marginTop: "1px" }}>Care Coordinator Dashboard</div>
        </div>
        <button onClick={handleSignOut} style={{
          background: "rgba(255,255,255,0.1)", border: "none", color: "rgba(255,255,255,0.7)",
          borderRadius: "20px", padding: "4px 12px", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer",
        }}>Sign Out</button>
      </div>

      <div style={{ paddingBottom: "40px" }}>
        {view === "list" && (
          <ClientList clients={admin.clients} loading={admin.loading} onSelect={handleSelectClient} />
        )}
        {view === "detail" && admin.selectedClient && (
          <ClientDetail
            client={admin.selectedClient}
            medications={admin.clientMeds}
            contacts={admin.clientContacts}
            appointments={admin.clientAppts}
            onAddMed={(med) => admin.addMedication(admin.selectedClient.id, med)}
            onDeleteMed={admin.deleteMedication}
            onAddContact={(c) => admin.addContact(admin.selectedClient.id, c)}
            onDeleteContact={admin.deleteContact}
            onAddAppt={(a) => admin.addAppointment(admin.selectedClient.id, a)}
            onDeleteAppt={admin.deleteAppointment}
            onUpdateProfile={(updates) => admin.updateProfile(admin.selectedClient.id, updates)}
          />
        )}
      </div>
    </div>
  );
}
