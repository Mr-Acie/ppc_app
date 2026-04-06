const APPOINTMENTS = [
  {
    month: "APR",
    day: "1",
    title: "Companion Visit — Morning Check",
    details: ["🕘 9:00 AM – 11:00 AM · In-Home Visit", "👤 Your Pampered Companion Care Specialist"],
    tag: "Confirmed ✓",
  },
  {
    month: "APR",
    day: "3",
    title: "Tech Help Session",
    details: ["🕑 2:00 PM – 3:00 PM · Phone / Video", "📱 Questions about your smartphone or tablet"],
    tag: "Confirmed ✓",
  },
  {
    month: "APR",
    day: "7",
    title: "Monthly Care Review",
    details: ["🕙 10:00 AM – 11:00 AM · Phone Call", "👤 Acie Grimes II — Care Coordinator"],
    tag: "Upcoming",
  },
  {
    month: "APR",
    day: "10",
    title: "Companion Visit — Afternoon",
    details: ["🕑 1:00 PM – 3:00 PM · In-Home Visit", "👤 Your Pampered Companion Care Specialist"],
    tag: "Upcoming",
  },
];

export default function AppointmentsTab() {
  return (
    <div className="tab-panel">
      <div className="section-header">📅 My Appointments</div>
      <div className="section-sub">
        Your upcoming companion visits and scheduled care from Pampered Companion Care.
      </div>
      <div className="appt-list">
        {APPOINTMENTS.map((appt) => (
          <div key={`${appt.month}-${appt.day}-${appt.title}`} className="appt-card">
            <div className="appt-date-box">
              <div className="appt-month">{appt.month}</div>
              <div className="appt-day">{appt.day}</div>
            </div>
            <div className="appt-info">
              <div className="appt-title">{appt.title}</div>
              {appt.details.map((d) => (
                <div key={d} className="appt-detail">{d}</div>
              ))}
              <div className="appt-tag">{appt.tag}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
