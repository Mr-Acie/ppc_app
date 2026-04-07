"use client";

export default function CheckInTab({ contacts, checkinToday, onCheckin }) {
  const goodDone = checkinToday?.type === "good";
  const supportDone = checkinToday?.type === "support";

  return (
    <div className="tab-panel">
      <div className="section-header">✅ Daily Check-In</div>
      <div className="section-sub">
        Let your family and care team know you&apos;re doing well. One tap is all it takes.
      </div>

      <div className="checkin-wrap">
        <div className="checkin-card">
          <div className="checkin-icon">😊</div>
          <div className="checkin-heading" style={{ fontFamily: "var(--font-lora), serif" }}>
            I&apos;m Doing Well Today
          </div>
          <div className="checkin-body">
            Tap the button below to send a wellness confirmation to your emergency contacts and your Pampered Companion Care team.
          </div>
          <button className="checkin-btn btn-teal" onClick={() => onCheckin("good")} disabled={!!checkinToday}>
            ✅ I&apos;m Okay — Send Check-In
          </button>
          {goodDone && (
            <div className="checkin-done">
              🎉 Check-in sent! Your family has been notified you&apos;re doing great.
            </div>
          )}
        </div>

        <div className="checkin-card">
          <div className="checkin-icon">😔</div>
          <div className="checkin-heading" style={{ fontFamily: "var(--font-lora), serif" }}>
            I Need Some Support
          </div>
          <div className="checkin-body">
            Not feeling your best today? That&apos;s okay. Let someone know and we&apos;ll reach out to check on you.
          </div>
          <button className="checkin-btn btn-navy" onClick={() => onCheckin("support")} disabled={!!checkinToday}>
            💬 I Could Use Support Today
          </button>
          {supportDone && (
            <div className="checkin-done" style={{ background: "#FFF8E8", color: "#9A7020" }}>
              💛 Your care team has been notified. Someone will reach out to you shortly.
            </div>
          )}
        </div>
      </div>

      <div className="divider-label">Emergency Contacts</div>
      <div className="contact-list">
        {contacts.map((contact) => (
          <div key={contact.id} className="contact-item">
            <div className="contact-avatar">{contact.initials || contact.name.slice(0, 2).toUpperCase()}</div>
            <div>
              <div className="contact-name">{contact.name}</div>
              <div className="contact-role">{contact.role}</div>
            </div>
            <button
              className="contact-call"
              style={contact.is_911 ? { background: "var(--red)" } : {}}
              onClick={() => contact.phone ? window.location.href = `tel:${contact.phone}` : alert(`Calling ${contact.name}…`)}
            >
              📞 Call
            </button>
          </div>
        ))}
        {!contacts.length && (
          <div style={{ padding: "16px 20px", color: "var(--muted)", fontSize: "0.85rem" }}>
            No emergency contacts set up yet. Your care coordinator will add these for you.
          </div>
        )}
      </div>
    </div>
  );
}
