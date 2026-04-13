"use client";
import { useState } from "react";

// ================= TYPES =================
type Patient = {
  id: number;
  name: string;
};

type PainEntry = {
  id: number;
  patientId: number;
  patient: string;
  score: number;
  notes: string;
  time: string;
};

// ================= DATA =================
const patients: Patient[] = [
  { id: 1, name: "Ahmed Ali" },
  { id: 2, name: "Sara Mohamed" },
];

// ================= PAGE =================
export default function PainPage() {
  const [entries, setEntries] = useState<PainEntry[]>([]);

  const [form, setForm] = useState({
    patientId: 0,
    patient: "",
    score: "",
    notes: "",
  });

  // ================= VALIDATION =================
  const isValidScore =
    form.score !== "" &&
    !isNaN(Number(form.score)) &&
    Number(form.score) >= 0 &&
    Number(form.score) <= 10;

  // ================= SAVE =================
  const handleSave = () => {
    if (!form.patientId || !isValidScore) return;

    setEntries([
      ...entries,
      {
        id: Date.now(),
        patientId: form.patientId,
        patient: form.patient,
        score: Number(form.score),
        notes: form.notes,
        time: new Date().toLocaleString(),
      },
    ]);

    setForm({
      patientId: 0,
      patient: "",
      score: "",
      notes: "",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Pain Assessment</h1>

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

        {/* Score */}
        <input
          placeholder="Pain Score (0-10)"
          value={form.score}
          onChange={(e) => setForm({ ...form, score: e.target.value })}
          className="border p-2 w-full rounded"
        />
        {!isValidScore && form.score && (
          <p className="text-red-500">Score must be between 0 and 10</p>
        )}

        {/* Notes */}
        <textarea
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <button
          onClick={handleSave}
          disabled={!form.patientId || !isValidScore}
          className={`px-4 py-2 rounded text-white ${
            !form.patientId || !isValidScore
              ? "bg-gray-400"
              : "bg-blue-600"
          }`}
        >
          Add Pain Record
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white p-6 rounded-xl shadow">
        <table className="w-full border text-center">
          <thead>
            <tr className="bg-gray-100">
              <th>Patient</th>
              <th>Score</th>
              <th>Notes</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {entries.map((e) => (
              <tr key={e.id}>
                <td>{e.patient}</td>
                <td>{e.score}</td>
                <td>{e.notes || "-"}</td>
                <td>{e.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}