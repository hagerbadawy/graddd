"use client";

import { useState } from "react";

type Medication = {
  id: number;
  patientId: number;
  patientName: string;
  nurseId: number; // 🔥 مهم للفلترة
  drug: string;
  time: string;

  status: "pending" | "given" | "missed" | "refused";

  administeredBy?: number | null;
  administeredTime?: string | null;
  notes?: string;
};

export default function MARPage() {
  const nurseId = 1;

  const [meds, setMeds] = useState<Medication[]>([
    {
      id: 1,
      patientId: 1,
      patientName: "Ahmed Ali",
      nurseId: 1,
      drug: "Paracetamol 500mg",
      time: "08:00 AM",
      status: "pending",
    },
    {
      id: 2,
      patientId: 2,
      patientName: "Sara Mohamed",
      nurseId: 1,
      drug: "Insulin",
      time: "09:00 AM",
      status: "pending",
    },
    {
      id: 3,
      patientId: 3,
      patientName: "Omar Khaled",
      nurseId: 2, // مش هيظهر
      drug: "Antibiotic",
      time: "10:00 AM",
      status: "pending",
    },
  ]);

  // ✅ فلترة حسب الممرضة
  const myMeds = meds.filter((m) => m.nurseId === nurseId);

  // 🧠 helper لتحديث medication
  const updateMed = (
    id: number,
    updates: Partial<Medication>
  ) => {
    setMeds((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, ...updates } : m
      )
    );
  };

  // ✅ ADMINISTER (Give)
  const handleGive = (id: number) => {
    const notes = prompt("Any notes? (optional)");

    updateMed(id, {
      status: "given",
      administeredBy: nurseId,
      administeredTime: new Date().toLocaleString(),
      notes: notes || "",
    });
  };

  // ❌ MISSED
  const handleMiss = (id: number) => {
    const notes = prompt("Reason for missing?");

    updateMed(id, {
      status: "missed",
      administeredBy: nurseId,
      administeredTime: new Date().toLocaleString(),
      notes: notes || "",
    });
  };

  // 🚫 REFUSED
  const handleRefuse = (id: number) => {
    const notes = prompt("Reason for refusal?");

    updateMed(id, {
      status: "refused",
      administeredBy: nurseId,
      administeredTime: new Date().toLocaleString(),
      notes: notes || "",
    });
  };

  // 🎨 status colors
  const getStatusStyle = (status: string) => {
    if (status === "given")
      return "bg-green-100 text-green-700";
    if (status === "missed")
      return "bg-yellow-100 text-yellow-700";
    if (status === "refused")
      return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Medication Administration Record
      </h1>

      {myMeds.map((med) => (
        <div
          key={med.id}
          className="p-4 bg-white rounded-xl shadow flex justify-between items-center"
        >
          {/* LEFT */}
          <div>
            <p className="font-medium">{med.drug}</p>

            <p className="text-sm text-gray-500">
              Patient: {med.patientName}
            </p>

            <p className="text-sm text-gray-400">
              Time: {med.time}
            </p>

            {/* status */}
            <span
              className={`text-xs px-2 py-1 rounded-full ${getStatusStyle(
                med.status
              )}`}
            >
              {med.status}
            </span>

            {/* ✅ metadata */}
            {med.administeredTime && (
              <div className="text-xs text-gray-400 mt-1 space-y-1">
                <p>Done at: {med.administeredTime}</p>
                <p>By Nurse: {med.administeredBy}</p>
              </div>
            )}

            {/* 📝 notes */}
            {med.notes && (
              <p className="text-xs text-gray-500 mt-1">
                Notes: {med.notes}
              </p>
            )}
          </div>

          {/* RIGHT */}
          {med.status === "pending" && (
            <div className="flex gap-2">
              <button
                onClick={() => handleGive(med.id)}
                className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm"
              >
                Give
              </button>

              <button
                onClick={() => handleMiss(med.id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
              >
                Miss
              </button>

              <button
                onClick={() => handleRefuse(med.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
              >
                Refuse
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}