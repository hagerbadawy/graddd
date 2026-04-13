"use client";
import { useState } from "react";

// ================= TYPES =================
type Patient = {
  id: number;
  name: string;
  age: number;
  condition: string;
  wardId: number;
  bed: string;
  hr: number;
  temp: number;
  spo2: number;
  tasks: number;
};

type Ward = {
  id: number;
  name: string;
};

// ================= DATA =================
const wards: Ward[] = [
  { id: 1, name: "Ward A" },
  { id: 2, name: "Ward B" },
];

const patients: Patient[] = [
  {
    id: 1,
    name: "Ahmed Ali",
    age: 45,
    condition: "Hypertension",
    wardId: 1,
    bed: "A12",
    hr: 80,
    temp: 36.8,
    spo2: 98,
    tasks: 1,
  },
  {
    id: 2,
    name: "Sara Mohamed",
    age: 30,
    condition: "Diabetes",
    wardId: 2,
    bed: "A09",
    hr: 110,
    temp: 38,
    spo2: 90,
    tasks: 3,
  },
];

// ================= STATUS =================
const getStatus = (hr: number, temp: number, spo2: number) => {
  if (spo2 < 90 || temp > 38 || hr > 120) return "critical";
  if (spo2 < 95 || temp > 37.2 || hr > 100) return "warning";
  return "stable";
};

const getStatusStyle = (status: string) => {
  if (status === "critical") return "bg-red-100 text-red-600 px-2 py-1 rounded";
  if (status === "warning") return "bg-yellow-100 text-yellow-600 px-2 py-1 rounded";
  return "bg-green-100 text-green-600 px-2 py-1 rounded";
};

// ================= PAGE =================
export default function WardCensusPage() {
  const [selectedWard, setSelectedWard] = useState<number>(1);

  const filteredPatients = patients.filter(
    (p) => p.wardId === selectedWard
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Ward Patients</h1>

      {/* ================= WARD SELECT ================= */}
      <select
        value={selectedWard}
        onChange={(e) => setSelectedWard(Number(e.target.value))}
        className="border p-2 rounded"
      >
        {wards.map((w) => (
          <option key={w.id} value={w.id}>
            {w.name}
          </option>
        ))}
      </select>

      {/* ================= TABLE ================= */}
      <div className="bg-white p-6 rounded-xl shadow">
        <table className="w-full text-center border">
          <thead>
            <tr className="bg-gray-100">
              <th>Name</th>
              <th>Bed</th>
              <th>HR</th>
              <th>Temp</th>
              <th>SpO2</th>
              <th>Tasks</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredPatients.map((p) => {
              const status = getStatus(p.hr, p.temp, p.spo2);

              return (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.bed}</td>
                  <td>{p.hr}</td>
                  <td>{p.temp}</td>
                  <td>{p.spo2}%</td>
                  <td>{p.tasks}</td>
                  <td>
                    <span className={getStatusStyle(status)}>
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}