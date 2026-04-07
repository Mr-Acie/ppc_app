"use client";

import { useState, useRef, useEffect } from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import CountdownOverlay from "@/components/CountdownOverlay";
import HomeTab from "@/components/tabs/HomeTab";
import MedsTab from "@/components/tabs/MedsTab";
import SafetyTab from "@/components/tabs/SafetyTab";
import ScamsTab from "@/components/tabs/ScamsTab";
import CheckInTab from "@/components/tabs/CheckInTab";
import AppointmentsTab from "@/components/tabs/AppointmentsTab";
import AdminShell from "@/components/admin/AdminShell";
import { useUser } from "@/hooks/useUser";
import { useAppData } from "@/hooks/useAppData";

function AppShell() {
  const { user, profile } = useUser();
  const {
    medications, takenToday, contacts, appointments,
    checkinToday, scamAlerts, loading,
    toggleMed, sendCheckin,
  } = useAppData(user?.id);

  const [activeTab, setActiveTab] = useState("home");
  const [countdownActive, setCountdownActive] = useState(false);
  const [countdownNum, setCountdownNum] = useState(5);
  const [scamChecks, setScamChecks] = useState([false, false, false, false]);
  const countTimerRef = useRef(null);

  // Route admins to the admin dashboard
  if (profile?.is_admin) return <AdminShell />;

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
            alert("🚨 Emergency alert sent to your care coordinator and emergency contacts!\n\nStay calm. Help is on the way.");
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countTimerRef.current);
  }, [countdownActive]);

  function toggleScamCheck(index) {
    setScamChecks((prev) => prev.map((v, i) => (i === index ? !v : v)));
  }

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", background: "var(--navy)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>Loading your app…</div>
      </div>
    );
  }

  return (
    <>
      <TopBar profile={profile} />
      <CountdownOverlay active={countdownActive} countNum={countdownNum} onCancel={cancelEmergency} />
      <div className="content">
        {activeTab === "home" && (
          <HomeTab
            onEmergency={startEmergency}
            medications={medications}
            takenToday={takenToday}
            checkinToday={checkinToday}
            appointments={appointments}
          />
        )}
        {activeTab === "meds" && (
          <MedsTab medications={medications} takenToday={takenToday} onToggle={toggleMed} />
        )}
        {activeTab === "safety" && <SafetyTab />}
        {activeTab === "scams" && (
          <ScamsTab scamAlerts={scamAlerts} scamChecks={scamChecks} onScamCheck={toggleScamCheck} />
        )}
        {activeTab === "checkin" && (
          <CheckInTab contacts={contacts} checkinToday={checkinToday} onCheckin={sendCheckin} />
        )}
        {activeTab === "appts" && <AppointmentsTab appointments={appointments} />}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </>
  );
}

export default function Page() {
  return (
    <AuthGuard>
      <AppShell />
    </AuthGuard>
  );
}
