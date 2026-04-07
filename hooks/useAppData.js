"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase";

export function useAppData(userId) {
  const supabase = createClient();
  const today = new Date().toISOString().split("T")[0];

  const [medications, setMedications] = useState([]);
  const [takenToday, setTakenToday] = useState([]); // med IDs taken today
  const [contacts, setContacts] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [checkinToday, setCheckinToday] = useState(null);
  const [scamAlerts, setScamAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    if (!userId) return;
    setLoading(true);

    const [medsRes, logsRes, contactsRes, apptsRes, checkinRes, scamsRes] = await Promise.all([
      supabase.from("medications").select("*").eq("user_id", userId).order("sort_order"),
      supabase.from("med_logs").select("medication_id").eq("user_id", userId).eq("log_date", today),
      supabase.from("emergency_contacts").select("*").eq("user_id", userId).order("sort_order"),
      supabase.from("appointments").select("*").eq("user_id", userId).gte("appt_date", today).order("appt_date"),
      supabase.from("checkins").select("*").eq("user_id", userId).gte("created_at", today + "T00:00:00").order("created_at", { ascending: false }).limit(1),
      supabase.from("scam_alerts").select("*").eq("active", true).order("sort_order"),
    ]);

    setMedications(medsRes.data || []);
    setTakenToday((logsRes.data || []).map((l) => l.medication_id));
    setContacts(contactsRes.data || []);
    setAppointments(apptsRes.data || []);
    setCheckinToday(checkinRes.data?.[0] ?? null);
    setScamAlerts(scamsRes.data || []);
    setLoading(false);
  }, [userId, today]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  async function toggleMed(medId) {
    const isTaken = takenToday.includes(medId);
    if (isTaken) {
      await supabase
        .from("med_logs")
        .delete()
        .eq("medication_id", medId)
        .eq("log_date", today)
        .eq("user_id", userId);
      setTakenToday((prev) => prev.filter((id) => id !== medId));
    } else {
      await supabase
        .from("med_logs")
        .insert({ user_id: userId, medication_id: medId, log_date: today });
      setTakenToday((prev) => [...prev, medId]);
    }
  }

  async function sendCheckin(type) {
    await supabase.from("checkins").insert({ user_id: userId, type });
    setCheckinToday({ type });
  }

  return {
    medications,
    takenToday,
    contacts,
    appointments,
    checkinToday,
    scamAlerts,
    loading,
    toggleMed,
    sendCheckin,
    refetch: fetchAll,
  };
}
