"use client";

import { useState } from "react";

type DenialStatus = "pending" | "appealed" | "approved" | "rejected";

type Denial = {
  id: string;
  claimId: string;
  patientName: string;
  reason: string;
  status: DenialStatus;
  date: string;
  appealNotes?: string;
};

export default function DenialsPage() {
  const [denials, setDenials] = useState<Denial[]>([
    {
      id: "1",
      claimId: "CLM123",
      patientName: "أحمد",
      reason: "Missing documents",
      status: "rejected",
      date: new Date().toISOString(),
    },
  ]);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // 🔍 filter
  const filtered = denials.filter((d) => {
    return (
      d.patientName.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter ? d.status === statusFilter : true)
    );
  });

  // 🔄 update status
  const updateStatus = (id: string, status: DenialStatus) => {
    setDenials((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status } : d
      )
    );
  };

  // 📩 appeal
  const handleAppeal = (id: string) => {
    const note = prompt("Enter appeal notes");

    if (!note) return;

    setDenials((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              status: "appealed",
              appealNotes: note,
            }
          : d
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Denials</h1>

      {/* 🔍 FILTER */}
      <div className="flex gap-4 my-4">
        <input
          placeholder="Search patient..."
          className="border p-2"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="appealed">Appealed</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* ================= TABLE ================= */}
      <table className="w-full border text-center">
        <thead className="bg-gray-100">
          <tr>
            <th>ID</th>
            <th>Claim</th>
            <th>Patient</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((d) => (
            <>
              <tr key={d.id} className="border-t">
                <td>{d.id}</td>
                <td>{d.claimId}</td>
                <td>{d.patientName}</td>
                <td>{d.reason}</td>

                {/* status badge */}
                <td>
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      d.status === "pending"
                        ? "bg-yellow-500"
                        : d.status === "appealed"
                        ? "bg-blue-500"
                        : d.status === "approved"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {d.status}
                  </span>
                </td>

                <td>{new Date(d.date).toLocaleDateString()}</td>

                {/* 🔥 ACTIONS LOGIC */}
                <td className="space-x-2">
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === d.id ? null : d.id)
                    }
                  >
                    View
                  </button>

                  {/* لو rejected → Appeal بس */}
                  {d.status === "rejected" && (
                    <button onClick={() => handleAppeal(d.id)}>
                      Appeal
                    </button>
                  )}

                  {/* لو appealed → approve / reject */}
                  {d.status === "appealed" && (
                    <>
                      <button onClick={() => updateStatus(d.id, "approved")}>
                        Approve
                      </button>
                      <button onClick={() => updateStatus(d.id, "rejected")}>
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>

              {/* DETAILS */}
              {expandedId === d.id && (
                <tr>
                  <td colSpan={7} className="text-left p-4">
                    <p><b>Reason:</b> {d.reason}</p>
                    <p><b>Status:</b> {d.status}</p>

                    {d.appealNotes && (
                      <p><b>Appeal Notes:</b> {d.appealNotes}</p>
                    )}
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}