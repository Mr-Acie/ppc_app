"use client";

export default function CountdownOverlay({ active, countNum, onCancel }) {
  return (
    <div className={`countdown-overlay${active ? " active" : ""}`}>
      <div className="countdown-label">🚨 Calling for Help in...</div>
      <div className="countdown-num">{countNum}</div>
      <div className="countdown-label">Stay calm. Help is coming.</div>
      <button className="countdown-cancel" onClick={onCancel}>
        ✕ Cancel — I&apos;m Okay
      </button>
    </div>
  );
}
