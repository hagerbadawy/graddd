"use client";
import { useState } from "react";

// ================= TYPES =================
type Patient = {
  id: number;
  name: string;
};

type Wound = {
  id: number;
  patientId: number;
  patient: string;
  location: string;
  status: string;
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
  const [wounds, setWounds] = useState<Wound[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const [form, setForm] = useState({
    patientId: 0,
    patient: "",
    location: "",
    status: "clean",
    description: "",
  });

  // ================= SAVE =================
  const handleSave = () => {
    if (!form.patientId || !form.location || !form.description) return;

    if (editId) {
      setWounds(
        wounds.map((w) =>
          w.id === editId
            ? {
                ...w,
                location: form.location,
                status: form.status,
                description: form.description,
              }
            : w
        )
      );
      setEditId(null);
    } else {
      setWounds([
        ...wounds,
        {
          id: Date.now(),
          patientId: form.patientId,
          patient: form.patient,
          location: form.location,
          status: form.status,
          description: form.description,
          time: new Date().toLocaleString(),
        },
      ]);
    }

    setForm({
      patientId: 0,
      patient: "",
      location: "",
      status: "clean",
      description: "",
    });
  };

  // ================= EDIT =================
  const handleEdit = (w: Wound) => {
    setEditId(w.id);
    setForm({
      patientId: w.patientId,
      patient: w.patient,
      location: w.location,
      status: w.status,
      description: w.description,
    });
  };

  // ================= STATUS COLOR =================
  const getStatusColor = (status: string) => {
    if (status === "infected") return "text-red-600 font-bold";
    if (status === "healing") return "text-yellow-600";
    return "text-green-600";
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

        {/* Status */}
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border p-2 w-full rounded"
        >
          <option value="clean">Clean</option>
          <option value="healing">Healing</option>
          <option value="infected">Infected</option>
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
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {editId ? "Update Wound" : "Add Wound"}
        </button>
      </div>

      {/* ================= LIST ================= */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        {wounds.map((w) => (
          <div key={w.id} className="border p-4 rounded">
            <p className="font-bold">
              {w.patient} - {w.location}
            </p>

            <p className={getStatusColor(w.status)}>
              {w.status}
            </p>

            <p>{w.description}</p>

            <p className="text-sm text-gray-500">{w.time}</p>

            <button
              onClick={() => handleEdit(w)}
              className="text-blue-600 mt-2"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}