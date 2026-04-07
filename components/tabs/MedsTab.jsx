"use client";

export default function MedsTab({ medications, takenToday, onToggle }) {
  if (!medications.length) {
    return (
      <div className="tab-panel">
        <div className="section-header">💊 My Medications</div>
        <div className="section-sub">No medications have been added yet. Your care coordinator will set these up for you.</div>
      </div>
    );
  }

  return (
    <div className="tab-panel">
      <div className="section-header">💊 My Medications</div>
      <div className="section-sub">
        Tap each medication when you&apos;ve taken it. Your care team is notified if a dose is missed.
      </div>
      <div className="med-list">
        {medications.map((med) => {
          const checked = takenToday.includes(med.id);
          return (
            <div
              key={med.id}
              className={`med-item${checked ? " checked" : ""}`}
              onClick={() => onToggle(med.id)}
            >
              <div className="med-check">{checked ? "✓" : ""}</div>
              <div className="med-info">
                <div className="med-name">{med.name}</div>
                <div className="med-detail">{med.detail}</div>
              </div>
              <div className="med-time">{med.time_of_day}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
