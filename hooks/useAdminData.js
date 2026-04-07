"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase";

export function useAdminData() {
  const supabase = createClient();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientMeds, setClientMeds] = useState([]);
  const [clientContacts, setClientContacts] = useState([]);
  const [clientAppts, setClientAppts] = useState([]);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("is_admin", false)
      .order("full_name");
    setClients(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchClients(); }, [fetchClients]);

  async function selectClient(client) {
    setSelectedClient(client);
    const [medsRes, contactsRes, apptsRes] = await Promise.all([
      supabase.from("medications").select("*").eq("user_id", client.id).order("sort_order"),
      supabase.from("emergency_contacts").select("*").eq("user_id", client.id).order("sort_order"),
      supabase.from("appointments").select("*").eq("user_id", client.id).order("appt_date"),
    ]);
    setClientMeds(medsRes.data || []);
    setClientContacts(contactsRes.data || []);
    setClientAppts(apptsRes.data || []);
  }

  async function addMedication(userId, med) {
    const { data } = await supabase.from("medications").insert({ user_id: userId, ...med }).select().single();
    if (data) setClientMeds((prev) => [...prev, data]);
  }

  async function deleteMedication(medId) {
    await supabase.from("medications").delete().eq("id", medId);
    setClientMeds((prev) => prev.filter((m) => m.id !== medId));
  }

  async function addContact(userId, contact) {
    const { data } = await supabase.from("emergency_contacts").insert({ user_id: userId, ...contact }).select().single();
    if (data) setClientContacts((prev) => [...prev, data]);
  }

  async function deleteContact(contactId) {
    await supabase.from("emergency_contacts").delete().eq("id", contactId);
    setClientContacts((prev) => prev.filter((c) => c.id !== contactId));
  }

  async function addAppointment(userId, appt) {
    const { data } = await supabase.from("appointments").insert({ user_id: userId, ...appt }).select().single();
    if (data) setClientAppts((prev) => [...prev, data]);
  }

  async function deleteAppointment(apptId) {
    await supabase.from("appointments").delete().eq("id", apptId);
    setClientAppts((prev) => prev.filter((a) => a.id !== apptId));
  }

  async function updateProfile(userId, updates) {
    await supabase.from("profiles").update(updates).eq("id", userId);
    setSelectedClient((prev) => ({ ...prev, ...updates }));
    setClients((prev) => prev.map((c) => c.id === userId ? { ...c, ...updates } : c));
  }

  return {
    clients, loading, selectedClient, clientMeds, clientContacts, clientAppts,
    selectClient, addMedication, deleteMedication,
    addContact, deleteContact, addAppointment, deleteAppointment,
    updateProfile, refetch: fetchClients,
  };
}
