export default function AppointmentsTab({ appointments }) {
  if (!appointments.length) {
    return (
      <div className="tab-panel">
        <div className="section-header">📅 My Appointments</div>
        <div className="section-sub">No upcoming appointments. Your care coordinator will add these for you.</div>
      </div>
    );
  }

  return (
    <div className="tab-panel">
      <div className="section-header">📅 My Appointments</div>
      <div className="section-sub">
        Your upcoming companion visits and scheduled care from Pampered Companion Care.
      </div>
      <div className="appt-list">
        {appointments.map((appt) => {
          const date = new Date(appt.appt_date + "T12:00:00");
          const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
          const day = date.getDate();
          return (
            <div key={appt.id} className="appt-card">
              <div className="appt-date-box">
                <div className="appt-month">{month}</div>
                <div className="appt-day">{day}</div>
              </div>
              <div className="appt-info">
                <div className="appt-title">{appt.title}</div>
                {appt.time_range && <div className="appt-detail">🕘 {appt.time_range}</div>}
                {appt.detail && <div className="appt-detail">{appt.detail}</div>}
                <div className="appt-tag">{appt.tag}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
