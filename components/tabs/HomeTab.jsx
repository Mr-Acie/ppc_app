"use client";

export default function HomeTab({ onEmergency, medStatus, checkinStatus }) {
  const { done, total } = medStatus;
  const medLabel = `${done} of ${total}`;
  const medClass = `sc-value${done === total ? " ok" : " warn"}`;

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
          <div className={`sc-value${checkinStatus === "Done" ? " ok" : ""}`}>
            {checkinStatus}
          </div>
        </div>
        <div className="status-card">
          <span className="sc-icon">📅</span>
          <div className="sc-label">Next Visit</div>
          <div className="sc-value" style={{ fontSize: "0.85rem" }}>Tomorrow</div>
        </div>
        <div className="status-card">
          <span className="sc-icon">🌡️</span>
          <div className="sc-label">Wellness</div>
          <div className="sc-value ok">Good</div>
        </div>
      </div>

      <div className="divider-label">Daily Reminders</div>
      <div className="timeline">
        <div className="timeline-item">
          <div className="tl-time">8:00 AM</div>
          <div className="tl-dot done" />
          <div className="tl-info">
            <div className="tl-task">Morning Medication</div>
            <div className="tl-note">Lisinopril + Vitamin D</div>
          </div>
          <div className="tl-badge badge-done">Done ✓</div>
        </div>
        <div className="timeline-item">
          <div className="tl-time">12:00 PM</div>
          <div className="tl-dot done" />
          <div className="tl-info">
            <div className="tl-task">Daily Check-In</div>
            <div className="tl-note">Notified family you&apos;re well</div>
          </div>
          <div className="tl-badge badge-done">Done ✓</div>
        </div>
        <div className="timeline-item">
          <div className="tl-time">2:00 PM</div>
          <div className="tl-dot missed" />
          <div className="tl-info">
            <div className="tl-task">Afternoon Medication</div>
            <div className="tl-note">Metformin with food</div>
          </div>
          <div className="tl-badge badge-missed">Missed</div>
        </div>
        <div className="timeline-item">
          <div className="tl-time">6:00 PM</div>
          <div className="tl-dot upcoming" />
          <div className="tl-info">
            <div className="tl-task">Evening Medication</div>
            <div className="tl-note">Atorvastatin with dinner</div>
          </div>
          <div className="tl-badge badge-upcoming">Upcoming</div>
        </div>
        <div className="timeline-item">
          <div className="tl-time">8:00 PM</div>
          <div className="tl-dot upcoming" />
          <div className="tl-info">
            <div className="tl-task">Hydration Reminder</div>
            <div className="tl-note">8 glasses goal — how are you doing?</div>
          </div>
          <div className="tl-badge badge-upcoming">Coming Up</div>
        </div>
      </div>
    </div>
  );
}
