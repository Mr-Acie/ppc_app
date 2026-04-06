"use client";

import { useState, useRef, useEffect } from "react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import CountdownOverlay from "@/components/CountdownOverlay";
import HomeTab from "@/components/tabs/HomeTab";
import MedsTab, { MEDS } from "@/components/tabs/MedsTab";
import SafetyTab from "@/components/tabs/SafetyTab";
import ScamsTab from "@/components/tabs/ScamsTab";
import CheckInTab from "@/components/tabs/CheckInTab";
import AppointmentsTab from "@/components/tabs/AppointmentsTab";

const DEFAULT_CHECKED_MEDS = MEDS.filter((m) => m.defaultChecked).map((m) => m.id);

export default function Page() {
  const [activeTab, setActiveTab] = useState("home");
  const [checkedMeds, setCheckedMeds] = useState(DEFAULT_CHECKED_MEDS);
  const [countdownActive, setCountdownActive] = useState(false);
  const [countdownNum, setCountdownNum] = useState(5);
  const [checkinDone, setCheckinDone] = useState(false);
  const [supportDone, setSupportDone] = useState(false);
  const [checkinStatus, setCheckinStatus] = useState("Not Yet");
  const [scamChecks, setScamChecks] = useState([false, false, false, false]);
  const countTimerRef = useRef(null);

  function handleTabChange(id) {
    setActiveTab(id);
    window.scrollTo(0, 0);
  }

  function startEmergency() {
    setCountdownNum(5);
    setCountdownActive(true);
  }

  function cancelEmergency() {
    clearInterval(countTimerRef.current);
    setCountdownActive(false);
    setCountdownNum(5);
  }

  useEffect(() => {
    if (countdownActive) {
      countTimerRef.current = setInterval(() => {
        setCountdownNum((prev) => {
          if (prev <= 1) {
            clearInterval(countTimerRef.current);
            setCountdownActive(false);
            alert(
              "🚨 Emergency alert sent to Acie Grimes II and your emergency contacts!\n\nStay calm. Help is on the way."
            );
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countTimerRef.current);
  }, [countdownActive]);

  function toggleMed(id) {
    setCheckedMeds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  }

  function handleCheckin(type) {
    if (type === "good") {
      setCheckinDone(true);
      setCheckinStatus("Done");
    } else {
      setSupportDone(true);
    }
  }

  function toggleScamCheck(index) {
    setScamChecks((prev) => prev.map((v, i) => (i === index ? !v : v)));
  }

  const medStatus = { done: checkedMeds.length, total: MEDS.length };

  return (
    <>
      <TopBar />
      <CountdownOverlay
        active={countdownActive}
        countNum={countdownNum}
        onCancel={cancelEmergency}
      />
      <div className="content">
        {activeTab === "home" && (
          <HomeTab
            onEmergency={startEmergency}
            medStatus={medStatus}
            checkinStatus={checkinStatus}
          />
        )}
        {activeTab === "meds" && (
          <MedsTab checkedMeds={checkedMeds} onToggle={toggleMed} />
        )}
        {activeTab === "safety" && <SafetyTab />}
        {activeTab === "scams" && (
          <ScamsTab scamChecks={scamChecks} onScamCheck={toggleScamCheck} />
        )}
        {activeTab === "checkin" && (
          <CheckInTab
            checkinDone={checkinDone}
            supportDone={supportDone}
            onCheckin={handleCheckin}
          />
        )}
        {activeTab === "appts" && <AppointmentsTab />}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </>
  );
}
