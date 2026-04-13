"use client";

import { useState } from "react";

// ================= TYPES =================
type ClaimStatus =
  | "submitted"
  | "processing"
  | "approved"
  | "rejected";

type Claim = {
  id: string;
  invoiceId: string;
  patientName: string;
  payer: string;
  status: ClaimStatus;
  allowedAmount?: number;
  paidAmount?: number;
  eobDate?: string;
  date: string;
  diagnosis?: string;
  items?: {
    description: string;
    qty: number;
    price: number;
  }[];
};

// mock invoices
const mockInvoices = [
  {
    id: "345678",
    patientName: "عمر",
    diagnosis: "Flu",
    items: [
      { description: "Consultation", qty: 1, price: 100 },
      { description: "Medication", qty: 2, price: 50 },
    ],
  },
];

export default function ClaimsPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [selectedInvoice, setSelectedInvoice] = useState("");
  const [patientName, setPatientName] = useState("");
  const [payer, setPayer] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // ================= CREATE =================
  const handleCreate = () => {
    const invoice = mockInvoices.find((i) => i.id === selectedInvoice);
    if (!invoice || !payer) return;

    const newClaim: Claim = {
      id: Date.now().toString(),
      invoiceId: invoice.id,
      patientName: invoice.patientName,
      payer,
      status: "submitted",
      date: new Date().toISOString(),
      diagnosis: invoice.diagnosis,
      items: invoice.items,
    };

    setClaims((prev) => [...prev, newClaim]);

    setSelectedInvoice("");
    setPatientName("");
    setPayer("");
  };

  // ================= STATUS =================
  const updateStatus = (id: string, status: ClaimStatus) => {
    setClaims((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  const handleProcess = (id: string) => {
    setClaims((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: "processing",
              allowedAmount: 500,
              paidAmount: 400,
              eobDate: new Date().toLocaleDateString(),
            }
          : c
      )
    );
  };

  const handleResubmit = (id: string) => {
    setClaims((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: "submitted" } : c
      )
    );
  };

  // ================= FILTER =================
  const filtered = claims.filter((c) => {
    return (
      c.patientName.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter ? c.status === statusFilter : true)
    );
  });

  // ================= STATUS COLOR =================
  const getStatusColor = (status: ClaimStatus) => {
    switch (status) {
      case "submitted":
        return "bg-gray-200 text-gray-700";
      case "processing":
        return "bg-yellow-200 text-yellow-800";
      case "approved":
        return "bg-green-200 text-green-800";
      case "rejected":
        return "bg-red-200 text-red-800";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Claims</h1>

      {/* 🔍 FILTER */}
      <div className="flex gap-4 mb-4">
        <input
          placeholder="Search patient..."
          className="border p-2 rounded w-64"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="submitted">Submitted</option>
          <option value="processing">Processing</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* ================= FORM ================= */}
      <div className="border p-4 rounded mb-6 space-y-3 bg-gray-50">

        <select
          className="border p-2 rounded w-full"
          value={selectedInvoice}
          onChange={(e) => {
            const inv = mockInvoices.find(i => i.id === e.target.value);
            setSelectedInvoice(e.target.value);
            setPatientName(inv?.patientName || "");
          }}
        >
          <option value="">Select Invoice</option>
          {mockInvoices.map((inv) => (
            <option key={inv.id} value={inv.id}>
              {inv.id} - {inv.patientName}
            </option>
          ))}
        </select>

        <input
          className="border p-2 rounded w-full bg-gray-100"
          value={patientName}
          readOnly
        />

        <input
          placeholder="Payer (Insurance)"
          className="border p-2 rounded w-full"
          value={payer}
          onChange={(e) => setPayer(e.target.value)}
        />

        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Create Claim
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <table className="w-full border rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">ID</th>
            <th>Invoice</th>
            <th>Patient</th>
            <th>Payer</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((c) => (
            <>
              <tr key={c.id} className="text-center border-t">
                <td className="p-2">{c.id}</td>
                <td>{c.invoiceId}</td>
                <td>{c.patientName}</td>
                <td>{c.payer}</td>

                <td>
                  <span className={`px-2 py-1 rounded text-sm ${getStatusColor(c.status)}`}>
                    {c.status}
                  </span>
                </td>

                <td>{new Date(c.date).toLocaleDateString()}</td>

                {/* 🔥 PROFESSIONAL ACTIONS */}
                <td className="flex flex-wrap gap-2 justify-center p-2">
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === c.id ? null : c.id)
                    }
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleProcess(c.id)}
                    className="text-yellow-600 hover:underline"
                  >
                    Process
                  </button>

                  <button
                    onClick={() => updateStatus(c.id, "approved")}
                    className="text-green-600 hover:underline"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(c.id, "rejected")}
                    className="text-red-600 hover:underline"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => handleResubmit(c.id)}
                    className="text-purple-600 hover:underline"
                  >
                    Resubmit
                  </button>
                </td>
              </tr>

              {/* DETAILS */}
              {expandedId === c.id && (
                <tr>
                  <td colSpan={7} className="bg-gray-50 p-4 text-left">

                    <p className="mb-2"><b>Diagnosis:</b> {c.diagnosis}</p>

                    <table className="w-full border mb-3">
                      <thead className="bg-gray-100">
                        <tr>
                          <th>Description</th>
                          <th>Qty</th>
                          <th>Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {c.items?.map((item, i) => (
                          <tr key={i} className="text-center border-t">
                            <td>{item.description}</td>
                            <td>{item.qty}</td>
                            <td>${item.price}</td>
                            <td>${item.qty * item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {c.allowedAmount && (
                      <div>
                        <p><b>Allowed:</b> ${c.allowedAmount}</p>
                        <p><b>Paid:</b> ${c.paidAmount}</p>
                        <p><b>EOB Date:</b> {c.eobDate}</p>
                      </div>
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