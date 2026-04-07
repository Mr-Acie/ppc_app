"use client";

import { useState } from "react";

const sectionStyle = {
  background: "white", borderRadius: "16px",
  border: "1.5px solid var(--border)",
  boxShadow: "var(--shadow)",
  marginBottom: "16px",
};
const sectionHeader = {
  padding: "14px 18px 10px",
  fontWeight: 800, fontSize: "0.9rem",
  color: "var(--navy)", borderBottom: "1px solid var(--border)",
  display: "flex", alignItems: "center", justifyContent: "space-between",
};
const rowStyle = {
  padding: "12px 18px", borderBottom: "1px solid var(--border)",
  display: "flex", alignItems: "center", justifyContent: "space-between",
  fontSize: "0.88rem",
};
const inputStyle = {
  width: "100%", padding: "10px 12px", borderRadius: "10px",
  border: "1.5px solid var(--border)", fontSize: "0.9rem",
  fontFamily: "inherit", background: "var(--cream)", marginBottom: "8px",
};
const addBtnStyle = {
  background: "var(--teal)", color: "white", border: "none",
  borderRadius: "10px", padding: "8px 14px", fontSize: "0.8rem",
  fontWeight: 800, cursor: "pointer", fontFamily: "inherit",
};
const deleteBtnStyle = {
  background: "none", border: "none", color: "var(--red)",
  fontSize: "1.1rem", cursor: "pointer", padding: "0 4px",
};

export default function ClientDetail({
  client, medications, contacts, appointments,
  onAddMed, onDeleteMed, onAddContact, onDeleteContact, onAddAppt, onDeleteAppt, onUpdateProfile,
}) {
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ full_name: client.full_name || "", phone: client.phone || "", address: client.address || "" });

  const [medForm, setMedForm] = useState({ name: "", detail: "", time_of_day: "" });
  const [showMedForm, setShowMedForm] = useState(false);

  const [contactForm, setContactForm] = useState({ name: "", role: "", phone: "", initials: "", is_911: false });
  const [showContactForm, setShowContactForm] = useState(false);

  const [apptForm, setApptForm] = useState({ title: "", appt_date: "", time_range: "", detail: "", tag: "Upcoming" });
  const [showApptForm, setShowApptForm] = useState(false);

  async function saveProfile() {
    await onUpdateProfile(profileForm);
    setEditingProfile(false);
  }

  async function handleAddMed() {
    if (!medForm.name || !medForm.time_of_day) return;
    await onAddMed(medForm);
    setMedForm({ name: "", detail: "", time_of_day: "" });
    setShowMedForm(false);
  }

  async function handleAddContact() {
    if (!contactForm.name) return;
    await onAddContact(contactForm);
    setContactForm({ name: "", role: "", phone: "", initials: "", is_911: false });
    setShowContactForm(false);
  }

  async function handleAddAppt() {
    if (!apptForm.title || !apptForm.appt_date) return;
    await onAddAppt(apptForm);
    setApptForm({ title: "", appt_date: "", time_range: "", detail: "", tag: "Upcoming" });
    setShowApptForm(false);
  }

  return (
    <div style={{ padding: "20px" }}>

      {/* Profile */}
      <div style={sectionStyle}>
        <div style={sectionHeader}>
          👤 Profile
          <button onClick={() => setEditingProfile(!editingProfile)} style={{ ...addBtnStyle, background: editingProfile ? "var(--muted)" : "var(--navy)" }}>
            {editingProfile ? "Cancel" : "Edit"}
          </button>
        </div>
        {editingProfile ? (
          <div style={{ padding: "14px 18px" }}>
            <input style={inputStyle} placeholder="Full name" value={profileForm.full_name} onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })} />
            <input style={inputStyle} placeholder="Phone number" value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} />
            <input style={inputStyle} placeholder="Address" value={profileForm.address} onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })} />
            <button onClick={saveProfile} style={{ ...addBtnStyle, width: "100%", padding: "12px" }}>Save Profile</button>
          </div>
        ) : (
          <>
            <div style={rowStyle}><span style={{ color: "var(--muted)" }}>Name</span><strong>{client.full_name || "—"}</strong></div>
            <div style={rowStyle}><span style={{ color: "var(--muted)" }}>Phone</span><strong>{client.phone || "—"}</strong></div>
            <div style={{ ...rowStyle, borderBottom: "none" }}><span style={{ color: "var(--muted)" }}>Address</span><strong>{client.address || "—"}</strong></div>
          </>
        )}
      </div>

      {/* Medications */}
      <div style={sectionStyle}>
        <div style={sectionHeader}>
          💊 Medications
          <button onClick={() => setShowMedForm(!showMedForm)} style={addBtnStyle}>+ Add</button>
        </div>
        {showMedForm && (
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)" }}>
            <input style={inputStyle} placeholder="Medication name (e.g. Lisinopril 10mg)" value={medForm.name} onChange={(e) => setMedForm({ ...medForm, name: e.target.value })} />
            <input style={inputStyle} placeholder="Detail (e.g. For blood pressure · Take with water)" value={medForm.detail} onChange={(e) => setMedForm({ ...medForm, detail: e.target.value })} />
            <input style={inputStyle} placeholder="Time of day (e.g. 8:00 AM)" value={medForm.time_of_day} onChange={(e) => setMedForm({ ...medForm, time_of_day: e.target.value })} />
            <button onClick={handleAddMed} style={{ ...addBtnStyle, width: "100%", padding: "12px" }}>Save Medication</button>
          </div>
        )}
        {medications.map((med, i) => (
          <div key={med.id} style={{ ...rowStyle, borderBottom: i < medications.length - 1 ? "1px solid var(--border)" : "none" }}>
            <div>
              <div style={{ fontWeight: 700 }}>{med.name}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{med.detail} · {med.time_of_day}</div>
            </div>
            <button style={deleteBtnStyle} onClick={() => onDeleteMed(med.id)}>🗑</button>
          </div>
        ))}
        {!medications.length && !showMedForm && (
          <div style={{ padding: "14px 18px", color: "var(--muted)", fontSize: "0.85rem" }}>No medications added yet.</div>
        )}
      </div>

      {/* Emergency Contacts */}
      <div style={sectionStyle}>
        <div style={sectionHeader}>
          📞 Emergency Contacts
          <button onClick={() => setShowContactForm(!showContactForm)} style={addBtnStyle}>+ Add</button>
        </div>
        {showContactForm && (
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)" }}>
            <input style={inputStyle} placeholder="Name" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} />
            <input style={inputStyle} placeholder="Role (e.g. Primary Emergency Contact)" value={contactForm.role} onChange={(e) => setContactForm({ ...contactForm, role: e.target.value })} />
            <input style={inputStyle} placeholder="Phone number" value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} />
            <input style={inputStyle} placeholder="Initials (e.g. AG)" value={contactForm.initials} onChange={(e) => setContactForm({ ...contactForm, initials: e.target.value })} />
            <button onClick={handleAddContact} style={{ ...addBtnStyle, width: "100%", padding: "12px" }}>Save Contact</button>
          </div>
        )}
        {contacts.map((contact, i) => (
          <div key={contact.id} style={{ ...rowStyle, borderBottom: i < contacts.length - 1 ? "1px solid var(--border)" : "none" }}>
            <div>
              <div style={{ fontWeight: 700 }}>{contact.name}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{contact.role} · {contact.phone || "No phone"}</div>
            </div>
            <button style={deleteBtnStyle} onClick={() => onDeleteContact(contact.id)}>🗑</button>
          </div>
        ))}
        {!contacts.length && !showContactForm && (
          <div style={{ padding: "14px 18px", color: "var(--muted)", fontSize: "0.85rem" }}>No contacts added yet.</div>
        )}
      </div>

      {/* Appointments */}
      <div style={sectionStyle}>
        <div style={sectionHeader}>
          📅 Appointments
          <button onClick={() => setShowApptForm(!showApptForm)} style={addBtnStyle}>+ Add</button>
        </div>
        {showApptForm && (
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)" }}>
            <input style={inputStyle} placeholder="Title (e.g. Companion Visit — Morning)" value={apptForm.title} onChange={(e) => setApptForm({ ...apptForm, title: e.target.value })} />
            <input style={{ ...inputStyle }} type="date" value={apptForm.appt_date} onChange={(e) => setApptForm({ ...apptForm, appt_date: e.target.value })} />
            <input style={inputStyle} placeholder="Time range (e.g. 9:00 AM – 11:00 AM · In-Home Visit)" value={apptForm.time_range} onChange={(e) => setApptForm({ ...apptForm, time_range: e.target.value })} />
            <input style={inputStyle} placeholder="Detail (e.g. 👤 Your PCC Specialist)" value={apptForm.detail} onChange={(e) => setApptForm({ ...apptForm, detail: e.target.value })} />
            <select style={inputStyle} value={apptForm.tag} onChange={(e) => setApptForm({ ...apptForm, tag: e.target.value })}>
              <option value="Upcoming">Upcoming</option>
              <option value="Confirmed ✓">Confirmed ✓</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button onClick={handleAddAppt} style={{ ...addBtnStyle, width: "100%", padding: "12px" }}>Save Appointment</button>
          </div>
        )}
        {appointments.map((appt, i) => (
          <div key={appt.id} style={{ ...rowStyle, borderBottom: i < appointments.length - 1 ? "1px solid var(--border)" : "none" }}>
            <div>
              <div style={{ fontWeight: 700 }}>{appt.title}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{appt.appt_date} · {appt.tag}</div>
            </div>
            <button style={deleteBtnStyle} onClick={() => onDeleteAppt(appt.id)}>🗑</button>
          </div>
        ))}
        {!appointments.length && !showApptForm && (
          <div style={{ padding: "14px 18px", color: "var(--muted)", fontSize: "0.85rem" }}>No appointments added yet.</div>
        )}
      </div>
    </div>
  );
}
