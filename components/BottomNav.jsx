"use client";

const tabs = [
  { id: "home", icon: "🏠", label: "Home" },
  { id: "meds", icon: "💊", label: "Meds" },
  { id: "safety", icon: "🛡️", label: "Safety" },
  { id: "scams", icon: "🚨", label: "Scams" },
  { id: "checkin", icon: "✅", label: "Check-In" },
  { id: "appts", icon: "📅", label: "Visits" },
];

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-btn${activeTab === tab.id ? " active" : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
          <div className="nav-indicator" />
        </button>
      ))}
    </nav>
  );
}
