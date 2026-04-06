export default function SafetyTab() {
  const tips = [
    {
      icon: "💡",
      title: "Keep Walkways Clear",
      body: "Remove loose rugs, cords, or clutter from hallways and between rooms. Falls are the #1 home danger for seniors — a clear path is your best protection.",
    },
    {
      icon: "🚿",
      title: "Bathroom Safety",
      body: "Use a non-slip bath mat inside and outside the tub or shower. If available, always use grab bars when getting in or out. Take your time — there's no rush.",
    },
    {
      icon: "💧",
      title: "Stay Hydrated",
      body: "Seniors often feel less thirsty but still need plenty of water. Aim for 6–8 glasses daily. Dehydration can cause dizziness and confusion that feels like something more serious.",
    },
    {
      icon: "🌙",
      title: "Nighttime Safety",
      body: "Keep a nightlight on in the hallway and bathroom. If you need to get up at night, sit on the edge of the bed for a few seconds before standing — this prevents dizzy spells.",
    },
    {
      icon: "🔑",
      title: "Lock Up Each Night",
      body: "Make a habit of checking your front door, back door, and ground-floor windows before bed. A simple checklist posted by your bedroom door can help make it routine.",
    },
    {
      icon: "📞",
      title: "Phone Within Reach",
      body: "Always keep your phone nearby — especially in the bathroom and bedroom. In an emergency, your phone is your lifeline. Consider a phone lanyard or belt clip.",
    },
  ];

  return (
    <div className="tab-panel">
      <div className="section-header">🏠 Home Safety Tips</div>
      <div className="section-sub">
        Simple reminders to help you stay safe and comfortable at home every day.
      </div>
      <div className="tips-list">
        {tips.map((tip) => (
          <div key={tip.title} className="tip-card">
            <div className="tip-icon">{tip.icon}</div>
            <div>
              <div className="tip-title">{tip.title}</div>
              <div className="tip-body">{tip.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
