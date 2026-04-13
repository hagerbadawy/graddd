"use client";
import { useState } from "react";

// ================= TYPES =================
type Patient = {
  id: number;
  name: string;
};

type IOEntry = {
  id: number;
  patientId: number;
  patient: string;
  type: "intake" | "output";
  amount: number;
  notes: string;
  time: string;
};

// ================= DATA =================
const patients: Patient[] = [
  { id: 1, name: "Ahmed Ali" },
  { id: 2, name: "Sara Mohamed" },
];

// ================= PAGE =================
export default function IntakeOutputPage() {
  const [entries, setEntries] = useState<IOEntry[]>([]);

  const [form, setForm] = useState({
    patientId: 0,
    patient: "",
    type: "intake",
    amount: "",
    notes: "",
  });

  // ✅ NEW FILTER STATE
  const [filter, setFilter] = useState({
    type: "all",
    date: "",
  });

  // ================= VALIDATION =================
  const isValidAmount =
    form.amount !== "" && !isNaN(Number(form.amount)) && Number(form.amount) > 0;

  // ================= SAVE =================
  const handleSave = () => {
    if (!form.patientId || !isValidAmount) return;

    setEntries([
      ...entries,
      {
        id: Date.now(),
        patientId: form.patientId,
        patient: form.patient,
        type: form.type as "intake" | "output",
        amount: Number(form.amount),
        notes: form.notes,
        time: new Date().toISOString(), // 🔥 مهم عشان الفلترة بالتاريخ
      },
    ]);

    setForm({
      patientId: 0,
      patient: "",
      type: "intake",
      amount: "",
      notes: "",
    });
  };

  // ================= DELETE =================
  const handleDelete = (id: number) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  // ================= FILTER LOGIC =================
  const filteredEntries = entries.filter((e) => {
    const matchType =
      filter.type === "all" || e.type === filter.type;

    const matchDate =
      !filter.date ||
      new Date(e.time).toDateString() ===
        new Date(filter.date).toDateString();

    return matchType && matchDate;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Intake & Output</h1>

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

        {/* Type */}
        <select
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value as "intake" | "output" })
          }
          className="border p-2 w-full rounded"
        >
          <option value="intake">Intake</option>
          <option value="output">Output</option>
        </select>

        {/* Amount */}
        <input
          placeholder="Amount (ml)"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="border p-2 w-full rounded"
        />
        {!isValidAmount && form.amount && (
          <p className="text-red-500">Enter valid amount</p>
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
          disabled={!form.patientId || !isValidAmount}
          className={`px-4 py-2 rounded text-white ${
            !form.patientId || !isValidAmount
              ? "bg-gray-400"
              : "bg-blue-600"
          }`}
        >
          Add Entry
        </button>
      </div>

      {/* ================= FILTER ================= */}
      <div className="bg-white p-4 rounded-xl shadow flex gap-4">

        {/* Type Filter */}
        <select
          value={filter.type}
          onChange={(e) =>
            setFilter({ ...filter, type: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="intake">Intake</option>
          <option value="output">Output</option>
        </select>

        {/* Date Filter */}
        <input
          type="date"
          value={filter.date}
          onChange={(e) =>
            setFilter({ ...filter, date: e.target.value })
          }
          className="border p-2 rounded"
        />
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white p-6 rounded-xl shadow">
        <table className="w-full border text-center">
          <thead>
            <tr className="bg-gray-100">
              <th>Patient</th>
              <th>Type</th>
              <th>Amount (ml)</th>
              <th>Notes</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEntries.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-4 text-gray-500">
                  No entries found
                </td>
              </tr>
            ) : (
              filteredEntries.map((e) => (
                <tr key={e.id}>
                  <td>{e.patient}</td>
                  <td
                    className={
                      e.type === "intake"
                        ? "text-green-600 font-bold"
                        : "text-red-600 font-bold"
                    }
                  >
                    {e.type}
                  </td>
                  <td>{e.amount}</td>
                  <td>{e.notes || "-"}</td>
                  <td>{new Date(e.time).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(e.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}