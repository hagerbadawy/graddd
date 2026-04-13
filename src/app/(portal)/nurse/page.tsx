"use client";
import { useState } from "react";

// ================= TYPES =================
type Patient = {
  id: number;
  name: string;
};

type WoundEntry = {
  id: number;
  patientId: number;
  patient: string;
  location: string;
  condition: string;
  description: string;
  time: string;
};

// ================= DATA =================
const patients: Patient[] = [
  { id: 1, name: "Ahmed Ali" },
  { id: 2, name: "Sara Mohamed" },
];

// ================= PAGE =================
export default function WoundPage() {
  const [entries, setEntries] = useState<WoundEntry[]>([]);

  const [form, setForm] = useState({
    patientId: 0,
    patient: "",
    location: "",
    condition: "Clean",
    description: "",
  });

  // ================= SAVE =================
  const handleSave = () => {
    if (!form.patientId || !form.location) return;

    setEntries([
      ...entries,
      {
        id: Date.now(),
        patientId: form.patientId,
        patient: form.patient,
        location: form.location,
        condition: form.condition,
        description: form.description,
        time: new Date().toLocaleString(),
      },
    ]);

    setForm({
      patientId: 0,
      patient: "",
      location: "",
      condition: "Clean",
      description: "",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Wound Notes</h1>

      {/* ================= FORM ================= */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">

        {/* Patient */}
        <select
          value={form.patientId}
          onChange={(e) => {
            const selected = patients.find(
              (p) => p.id === Number(e.target.value)
            );
            setForm({
              ...form,
              patientId: selected?.id || 0,
              patient: selected?.name || "",
            });
          }}
          className="border p-2 w-full rounded"
        >
          <option value={0}>Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Location */}
        <input
          placeholder="Wound location (e.g. left leg)"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="border p-2 w-full rounded"
        />

        {/* Condition */}
        <select
          value={form.condition}
          onChange={(e) =>
            setForm({ ...form, condition: e.target.value })
          }
          className="border p-2 w-full rounded"
        >
          <option value="Clean">Clean</option>
          <option value="Infected">Infected</option>
          <option value="Healing">Healing</option>
        </select>

        {/* Description */}
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="border p-2 w-full rounded"
        />

        <button
          onClick={handleSave}
          disabled={!form.patientId || !form.location}
          className={`px-4 py-2 rounded text-white ${
            !form.patientId || !form.location
              ? "bg-gray-400"
              : "bg-blue-600"
          }`}
        >
          Add Wound
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white p-6 rounded-xl shadow">
        <table className="w-full border text-center">
          <thead>
            <tr className="bg-gray-100">
              <th>Patient</th>
              <th>Location</th>
              <th>Condition</th>
              <th>Description</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {entries.map((e) => (
              <tr key={e.id}>
                <td>{e.patient}</td>
                <td>{e.location}</td>
                <td>{e.condition}</td>
                <td>{e.description || "-"}</td>
                <td>{e.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}