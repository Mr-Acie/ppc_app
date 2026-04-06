"use client";

import { useEffect, useState } from "react";

export default function TopBar() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      let h = now.getHours();
      const m = now.getMinutes();
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      setTime(h + ":" + String(m).padStart(2, "0") + " " + ampm);
    }
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="top-bar">
      <div>
        <div className="top-bar-logo" style={{ fontFamily: "var(--font-lora), serif" }}>
          Pampered Companion Care
        </div>
        <div className="top-bar-sub">Safety &amp; Wellness Companion</div>
      </div>
      <div className="top-bar-time">{time}</div>
    </div>
  );
}
