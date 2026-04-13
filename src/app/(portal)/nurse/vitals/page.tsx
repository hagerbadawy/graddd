"use client";

import { useState } from "react";

type Patient = {
  id: number;
  name: string;
};

type Vital = {
  id: number;
  patientId: number;
  patientName: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  temperature: number;
  spo2: number;
  notes?: string;
  recordedBy: string;
  timestamp: string;
  status: string;
};

const patients: Patient[] = [
  { id: 1, name: "Ahmed Ali" },
  { id: 2, name: "Sara Mohamed" },
];

const nurseName = "Nurse 1";

// ================= VALIDATION =================

const isValid = (v: number, min: number, max: number) =>
  !isNaN(v) && v >= min && v <= max;

// ================= STATUS =================

const getStatus = (
  sys: number,
  dia: number,
  hr: number,
  temp: number,
  spo2: number
) => {
  let result: string[] = [];

  if (sys >= 140 || dia >= 90) result.push("🔴 BP");
  else if (sys >= 121 || dia >= 81) result.push("🟡 BP");

  if (hr < 50 || hr > 120) result.push("🔴 HR");
  else if (hr < 60 || hr > 100) result.push("🟡 HR");

  if (temp < 35 || temp > 38) result.push("🔴 Temp");
  else if (temp < 36.1 || temp > 37.2) result.push("🟡 Temp");

  if (spo2 < 90) result.push("🔴 SpO2");
  else if (spo2 < 95) result.push("🟡 SpO2");

  if (result.length === 0) return "🟢 Normal";

  return result.join(" | ");
};

export default function VitalsPage() {
  const [vitals, setVitals] = useState<Vital[]>([]);

  const [form, setForm] = useState({
    patientId: 1,
    systolic: "",
    diastolic: "",
    heartRate: "",
    temperature: "",
    spo2: "",
    notes: "",
  });

  // ================= ERRORS =================

  const errors = {
    systolic:
      form.systolic &&
      !isValid(Number(form.systolic), 80, 200),

    diastolic:
      form.diastolic &&
      !isValid(Number(form.diastolic), 50, 130),

    heartRate:
      form.heartRate &&
      !isValid(Number(form.heartRate), 40, 150),

    temperature:
      form.temperature &&
      !isValid(Number(form.temperature), 34, 42),

    spo2:
      form.spo2 &&
      !isValid(Number(form.spo2), 70, 100),
  };

  const hasError = Object.values(errors).some(Boolean);

  // ================= SAVE =================

  const handleSave = () => {
    if (
      !form.systolic ||
      !form.diastolic ||
      !form.heartRate ||
      !form.temperature ||
      !form.spo2 ||
      hasError
    )
      return;

    const patient = patients.find((p) => p.id === form.patientId);

    const sys = Number(form.systolic);
    const dia = Number(form.diastolic);
    const hr = Number(form.heartRate);
    const temp = Number(form.temperature);
    const spo2 = Number(form.spo2);

    const newVital: Vital = {
      id: Date.now(),
      patientId: form.patientId,
      patientName: patient?.name || "",
      systolic: sys,
      diastolic: dia,
      heartRate: hr,
      temperature: temp,
      spo2,
      notes: form.notes,
      recordedBy: nurseName,
      timestamp: new Date().toISOString(),
      status: getStatus(sys, dia, hr, temp, spo2),
    };

    setVitals((prev) => [newVital, ...prev]);

    setForm({
      patientId: 1,
      systolic: "",
      diastolic: "",
      heartRate: "",
      temperature: "",
      spo2: "",
      notes: "",
    });
  };

  const getColor = (status: string) => {
    if (status.includes("🔴")) return "text-red-600 font-semibold";
    if (status.includes("🟡")) return "text-yellow-500 font-semibold";
    return "text-green-600 font-semibold";
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Vitals Flowsheet</h1>

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
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Systolic */}
        <input
          placeholder="Systolic"
          value={form.systolic}
          onChange={(e) =>
            setForm({ ...form, systolic: e.target.value })
          }
          className={`border p-2 w-full rounded ${
            errors.systolic ? "border-red-500" : ""
          }`}
        />
        {errors.systolic && (
          <p className="text-red-500 text-sm">
            Systolic must be 80 - 200
          </p>
        )}

        {/* Diastolic */}
        <input
          placeholder="Diastolic"
          value={form.diastolic}
          onChange={(e) =>
            setForm({ ...form, diastolic: e.target.value })
          }
          className={`border p-2 w-full rounded ${
            errors.diastolic ? "border-red-500" : ""
          }`}
        />
        {errors.diastolic && (
          <p className="text-red-500 text-sm">
            Diastolic must be 50 - 130
          </p>
        )}

        {/* HR */}
        <input
          placeholder="Heart Rate"
          value={form.heartRate}
          onChange={(e) =>
            setForm({ ...form, heartRate: e.target.value })
          }
          className={`border p-2 w-full rounded ${
            errors.heartRate ? "border-red-500" : ""
          }`}
        />
        {errors.heartRate && (
          <p className="text-red-500 text-sm">
            HR must be 40 - 150 bpm
          </p>
        )}

        {/* Temp */}
        <input
          placeholder="Temperature"
          value={form.temperature}
          onChange={(e) =>
            setForm({ ...form, temperature: e.target.value })
          }
          className={`border p-2 w-full rounded ${
            errors.temperature ? "border-red-500" : ""
          }`}
        />
        {errors.temperature && (
          <p className="text-red-500 text-sm">
            Temp must be 34 - 42 °C
          </p>
        )}

        {/* SpO2 */}
        <input
          placeholder="SpO2"
          value={form.spo2}
          onChange={(e) =>
            setForm({ ...form, spo2: e.target.value })
          }
          className={`border p-2 w-full rounded ${
            errors.spo2 ? "border-red-500" : ""
          }`}
        />
        {errors.spo2 && (
          <p className="text-red-500 text-sm">
            SpO2 must be 70% - 100%
          </p>
        )}

        {/* Notes */}
        <textarea
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={(e) =>
            setForm({ ...form, notes: e.target.value })
          }
          className="border p-2 w-full rounded"
        />

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Vital
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-xl shadow">
        <table className="w-full text-center border">
          <thead>
            <tr className="bg-gray-100">
              <th>Patient</th>
              <th>BP</th>
              <th>HR</th>
              <th>Temp</th>
              <th>SpO2</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {vitals.map((v) => (
              <tr key={v.id}>
                <td>{v.patientName}</td>
                <td>{v.systolic}/{v.diastolic}</td>
                <td>{v.heartRate}</td>
                <td>{v.temperature}</td>
                <td>{v.spo2}</td>

                <td className={getColor(v.status)}>
                  {v.status}
                </td>

                <td className="text-sm text-gray-600">
                  {v.notes || "-"}
                </td>

                <td className="text-xs text-gray-500">
                  {new Date(v.timestamp).toLocaleString()}
                  <br />
                  {v.recordedBy}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}