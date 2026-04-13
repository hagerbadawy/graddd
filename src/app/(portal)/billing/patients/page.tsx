"use client";

import { useState } from "react";

type Account = {
  patientId: string;
  name: string;
  balance: number;
  insurancePaid: number;
  patientPaid: number;
  status: "clear" | "overdue";
};

export default function PatientAccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selected, setSelected] = useState<Account | null>(null);
  const [search, setSearch] = useState("");

  // 🔥 Load mock data
  const loadAccounts = () => {
    const data: Account[] = [
      {
        patientId: "P001",
        name: "Ahmed",
        balance: 300,
        insurancePaid: 700,
        patientPaid: 200,
        status: "overdue",
      },
      {
        patientId: "P002",
        name: "Sara",
        balance: 0,
        insurancePaid: 500,
        patientPaid: 300,
        status: "clear",
      },
    ];

    setAccounts(data);
    setSelected(null); // reset details
  };

  // 🔍 Filter (search + realistic logic)
  const filtered = accounts.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.patientId.toLowerCase().includes(search.toLowerCase());

    // ممكن تغيريها لو عايزة balance > 0 بس
    return matchesSearch;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-1">Patient Accounts</h1>
      <p className="text-gray-500 mb-4">
        View and manage patient financial balances
      </p>

      {/* 🔍 Search + Load */}
      <div className="flex gap-3 mb-6">
        <input
          placeholder="Search by name or ID..."
          className="border p-2 w-64 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={loadAccounts}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Load
        </button>
      </div>

      {/* 📋 Table */}
      <div className="border rounded overflow-hidden shadow-sm mb-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Patient ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Balance</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((a) => (
              <tr key={a.patientId} className="border-t hover:bg-gray-50">
                <td className="p-3">{a.patientId}</td>
                <td className="p-3">{a.name}</td>
                <td className="p-3 font-medium">${a.balance}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      a.status === "overdue"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>

                <td className="p-3">
                  <button
                    onClick={() => setSelected(a)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📊 Details */}
      {selected && (
        <div className="border p-5 rounded bg-white shadow-md">
          <h2 className="font-semibold text-lg mb-3">
            Account Details
          </h2>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <p>
              <strong>Patient:</strong> {selected.name}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded text-xs ${
                  selected.status === "overdue"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {selected.status}
              </span>
            </p>

            <p>
              <strong>Balance:</strong> ${selected.balance}
            </p>

            <p>
              <strong>Insurance Paid:</strong> ${selected.insurancePaid}
            </p>

            <p>
              <strong>Patient Paid:</strong> ${selected.patientPaid}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}