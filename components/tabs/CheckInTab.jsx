"use client";

export default function CheckInTab({ checkinDone, supportDone, onCheckin }) {
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
            Tap the button below to send a wellness confirmation to your emergency contacts and your
            Pampered Companion Care team. They&apos;ll be glad to hear from you.
          </div>
          <button className="checkin-btn btn-teal" onClick={() => onCheckin("good")}>
            ✅ I&apos;m Okay — Send Check-In
          </button>
          {checkinDone && (
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
            Not feeling your best today? That&apos;s okay. Let someone know and we&apos;ll reach out to
            check on you.
          </div>
          <button className="checkin-btn btn-navy" onClick={() => onCheckin("support")}>
            💬 I Could Use Support Today
          </button>
          {supportDone && (
            <div
              className="checkin-done"
              style={{ background: "#FFF8E8", color: "#9A7020" }}
            >
              💛 Your care team has been notified. Someone will reach out to you shortly.
            </div>
          )}
        </div>
      </div>

      <div className="divider-label">Emergency Contacts</div>
      <div className="contact-list">
        <div className="contact-item">
          <div className="contact-avatar">AG</div>
          <div>
            <div className="contact-name">Acie Grimes II</div>
            <div className="contact-role">Your Care Coordinator · Pampered Companion Care</div>
          </div>
          <button className="contact-call" onClick={() => alert("Calling Acie Grimes II...")}>
            📞 Call
          </button>
        </div>
        <div className="contact-item">
          <div className="contact-avatar">FM</div>
          <div>
            <div className="contact-name">Family Member</div>
            <div className="contact-role">Primary Emergency Contact</div>
          </div>
          <button className="contact-call" onClick={() => alert("Calling family contact...")}>
            📞 Call
          </button>
        </div>
        <div className="contact-item">
          <div className="contact-avatar">🏥</div>
          <div>
            <div className="contact-name">911 Emergency</div>
            <div className="contact-role">Fire · Police · Ambulance</div>
          </div>
          <button
            className="contact-call"
            style={{ background: "var(--red)" }}
            onClick={() => alert("Calling 911...")}
          >
            📞 Call
          </button>
        </div>
      </div>
    </div>
  );
}
