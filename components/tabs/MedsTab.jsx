"use client";

const MEDS = [
  { id: "med1", name: "Lisinopril 10mg", detail: "For blood pressure · Take with water", time: "8:00 AM", defaultChecked: true },
  { id: "med2", name: "Vitamin D 1000 IU", detail: "Bone health supplement", time: "8:00 AM", defaultChecked: true },
  { id: "med3", name: "Metformin 500mg", detail: "For blood sugar · Take WITH food", time: "2:00 PM", defaultChecked: false },
  { id: "med4", name: "Atorvastatin 20mg", detail: "For cholesterol · Take at bedtime", time: "6:00 PM", defaultChecked: false },
  { id: "med5", name: "Aspirin 81mg", detail: "Low-dose aspirin · Take with food", time: "8:00 PM", defaultChecked: false },
];

export default function MedsTab({ checkedMeds, onToggle }) {
  return (
    <div className="tab-panel">
      <div className="section-header">💊 My Medications</div>
      <div className="section-sub">
        Tap each medication when you&apos;ve taken it. Your care team is notified if a dose is missed.
      </div>
      <div className="med-list">
        {MEDS.map((med) => {
          const checked = checkedMeds.includes(med.id);
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
              <div className="med-time">{med.time}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { MEDS };
