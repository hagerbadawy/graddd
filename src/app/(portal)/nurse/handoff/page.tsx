"use client";

import { useState } from "react";

type Handoff = {
  id: number;
  patientId: number;
  patientName: string;
  situation: string;
  background: string;
  assessment: string;
  recommendation: string;
  shift: string;
  nurse: string;
  time: string;
};

export default function HandoffPage() {
  const nurseName = "Nurse 1";

  const patients = [
    { id: 1, name: "Ahmed Ali" },
    { id: 2, name: "Sara Mohamed" },
  ];

  const [handoffs, setHandoffs] = useState<Handoff[]>([]);

  const [form, setForm] = useState({
    patientId: 0,
    situation: "",
    background: "",
    assessment: "",
    recommendation: "",
    shift: "",
  });

  // ➕ Add handoff
  const handleAdd = () => {
    if (
      !form.patientId ||
      !form.situation ||
      !form.background ||
      !form.assessment ||
      !form.recommendation ||
      !form.shift
    )
      return;

    const patient = patients.find(
      (p) => p.id === form.patientId
    );

    const newHandoff: Handoff = {
      id: Date.now(),
      patientId: form.patientId,
      patientName: patient?.name || "",
      situation: form.situation,
      background: form.background,
      assessment: form.assessment,
      recommendation: form.recommendation,
      shift: form.shift,
      nurse: nurseName,
      time: new Date().toLocaleString(),
    };

    setHandoffs([newHandoff, ...handoffs]);

    setForm({
      patientId: 0,
      situation: "",
      background: "",
      assessment: "",
      recommendation: "",
      shift: "",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Handoff (SBAR)</h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        {/* Patient */}
        <select
          value={form.patientId}
          onChange={(e) =>
            setForm({ ...form, patientId: Number(e.target.value) })
          }
          className="border p-2 w-full rounded"
        >
          <option value={0}>Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Shift */}
        <select
          value={form.shift}
          onChange={(e) =>
            setForm({ ...form, shift: e.target.value })
          }
          className="border p-2 w-full rounded"
        >
          <option value="">Select Shift</option>
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
          <option value="Night">Night</option>
        </select>

        {/* SBAR */}
        <textarea
          placeholder="Situation"
          value={form.situation}
          onChange={(e) =>
            setForm({ ...form, situation: e.target.value })
          }
          className="border p-2 w-full rounded"
        />

        <textarea
          placeholder="Background"
          value={form.background}
          onChange={(e) =>
            setForm({ ...form, background: e.target.value })
          }
          className="border p-2 w-full rounded"
        />

        <textarea
          placeholder="Assessment"
          value={form.assessment}
          onChange={(e) =>
            setForm({ ...form, assessment: e.target.value })
          }
          className="border p-2 w-full rounded"
        />

        <textarea
          placeholder="Recommendation"
          value={form.recommendation}
          onChange={(e) =>
            setForm({ ...form, recommendation: e.target.value })
          }
          className="border p-2 w-full rounded"
        />

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Handoff
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {handoffs.map((h) => (
          <div
            key={h.id}
            className="bg-white p-4 rounded-xl shadow space-y-2"
          >
            <p className="font-semibold">
              {h.patientName} • {h.shift} Shift
            </p>

            <p><b>S:</b> {h.situation}</p>
            <p><b>B:</b> {h.background}</p>
            <p><b>A:</b> {h.assessment}</p>
            <p><b>R:</b> {h.recommendation}</p>

            <p className="text-xs text-gray-400">
              {h.time} • {h.nurse}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}