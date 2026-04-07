"use client";

export default function HomeTab({ onEmergency, medications, takenToday, checkinToday, appointments }) {
  const medDone = takenToday.length;
  const medTotal = medications.length;
  const medLabel = medTotal ? `${medDone} of ${medTotal}` : "—";
  const medClass = `sc-value${medTotal && medDone === medTotal ? " ok" : " warn"}`;
  const checkinLabel = checkinToday ? "Done" : "Not Yet";
  const nextVisit = appointments?.[0];
  const nextVisitLabel = nextVisit
    ? new Date(nextVisit.appt_date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : "None";

  return (
    <div className="tab-panel">
      <div className="emergency-wrap">
        <button className="emergency-btn" onClick={onEmergency}>
          <span className="btn-icon">🆘</span>
          <span>CALL FOR HELP</span>
        </button>
        <div className="emergency-hint">Press if you need immediate assistance</div>
      </div>

      <div className="divider-label">Today&apos;s Status</div>
      <div className="status-grid">
        <div className="status-card">
          <span className="sc-icon">💊</span>
          <div className="sc-label">Medications</div>
          <div className={medClass}>{medLabel}</div>
        </div>
        <div className="status-card">
          <span className="sc-icon">✅</span>
          <div className="sc-label">Check-In</div>
          <div className={`sc-value${checkinToday ? " ok" : ""}`}>{checkinLabel}</div>
        </div>
        <div className="status-card">
          <span className="sc-icon">📅</span>
          <div className="sc-label">Next Visit</div>
          <div className="sc-value" style={{ fontSize: "0.85rem" }}>{nextVisitLabel}</div>
        </div>
        <div className="status-card">
          <span className="sc-icon">🌡️</span>
          <div className="sc-label">Wellness</div>
          <div className="sc-value ok">Good</div>
        </div>
      </div>

      <div className="divider-label">Today&apos;s Medications</div>
      {medications.length ? (
        <div className="timeline">
          {medications.map((med) => {
            const taken = takenToday.includes(med.id);
            return (
              <div key={med.id} className="timeline-item">
                <div className="tl-time">{med.time_of_day}</div>
                <div className={`tl-dot${taken ? " done" : " upcoming"}`} />
                <div className="tl-info">
                  <div className="tl-task">{med.name}</div>
                  <div className="tl-note">{med.detail}</div>
                </div>
                <div className={`tl-badge${taken ? " badge-done" : " badge-upcoming"}`}>
                  {taken ? "Done ✓" : "Upcoming"}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ padding: "8px 20px 16px", fontSize: "0.85rem", color: "var(--muted)" }}>
          No medications set up yet.
        </div>
      )}
    </div>
  );
}
