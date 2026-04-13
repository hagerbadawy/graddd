"use client";

import { useState } from "react";

type PaymentStatus = "active" | "void";

type Payment = {
  id: string;
  invoiceId: string;
  patientName: string;
  amount: number;
  payer: "insurance" | "patient";
  status: PaymentStatus;
  date: string;
};

type Invoice = {
  id: string;
  patientName: string;
};

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // 🧾 dummy invoices (زي backend)
  const invoices: Invoice[] = [
    { id: "345678", patientName: "عمر" },
    { id: "789123", patientName: "سارة" },
  ];

  const [selectedInvoice, setSelectedInvoice] = useState("");
  const [patientName, setPatientName] = useState("");
  const [amount, setAmount] = useState(0);
  const [payer, setPayer] = useState<"insurance" | "patient">("insurance");

  // ❌ validation errors
  const [errors, setErrors] = useState({
    invoice: "",
    amount: "",
  });

  // 🔄 لما تختار invoice
  const handleInvoiceChange = (id: string) => {
    setSelectedInvoice(id);

    const inv = invoices.find((i) => i.id === id);
    if (inv) {
      setPatientName(inv.patientName); // 🔥 auto fill
    }
  };

  // 💾 save payment
  const handleAdd = () => {
    let newErrors = { invoice: "", amount: "" };

    if (!selectedInvoice) newErrors.invoice = "Required";
    if (amount <= 0) newErrors.amount = "Amount must be > 0";

    setErrors(newErrors);

    if (newErrors.invoice || newErrors.amount) return;

    const newPayment: Payment = {
      id: Date.now().toString(),
      invoiceId: selectedInvoice,
      patientName,
      amount,
      payer,
      status: "active",
      date: new Date().toISOString(),
    };

    setPayments((prev) => [...prev, newPayment]);

    // reset
    setSelectedInvoice("");
    setPatientName("");
    setAmount(0);
    setPayer("insurance");
    setErrors({ invoice: "", amount: "" });
  };

  // 🔄 void
  const handleVoid = (id: string) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "void" } : p
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payments</h1>

      {/* ================= FORM ================= */}
      <div className="border p-4 space-y-3 rounded-lg">

        {/* invoice */}
        <div>
          <select
            className="border p-2 w-full"
            value={selectedInvoice}
            onChange={(e) => handleInvoiceChange(e.target.value)}
          >
            <option value="">Select Invoice</option>
            {invoices.map((inv) => (
              <option key={inv.id} value={inv.id}>
                {inv.id} - {inv.patientName}
              </option>
            ))}
          </select>
          {errors.invoice && (
            <p className="text-red-500 text-sm">{errors.invoice}</p>
          )}
        </div>

        {/* patient name */}
        <input
          placeholder="Patient Name"
          className="border p-2 w-full bg-gray-100"
          value={patientName}
          readOnly
        />

        {/* amount */}
        <div>
          <input
            type="number"
            placeholder="Amount"
            className="border p-2 w-full"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm">{errors.amount}</p>
          )}
        </div>

        {/* payer */}
        <select
          className="border p-2 w-full"
          value={payer}
          onChange={(e) =>
            setPayer(e.target.value as "insurance" | "patient")
          }
        >
          <option value="insurance">Insurance Company</option>
          <option value="patient">Patient</option>
        </select>

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Payment
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <table className="w-full border mt-6 text-center">
        <thead className="bg-gray-100">
          <tr>
            <th>ID</th>
            <th>Invoice</th>
            <th>Patient</th>
            <th>Amount</th>
            <th>Payer</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="border-t">
              <td>{p.id}</td>
              <td>{p.invoiceId}</td>
              <td>{p.patientName}</td>
              <td>${p.amount}</td>

              {/* ✅ payer label */}
              <td>
                {p.payer === "insurance"
                  ? "Insurance Company"
                  : "Patient"}
              </td>

              {/* status badge */}
              <td>
                <span
                  className={`px-2 py-1 rounded text-white ${
                    p.status === "active"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {p.status}
                </span>
              </td>

              <td>
                {new Date(p.date).toLocaleDateString()}
              </td>

              <td>
                {p.status === "active" && (
                  <button
                    onClick={() => handleVoid(p.id)}
                    className="text-red-600 hover:underline"
                  >
                    Void
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}