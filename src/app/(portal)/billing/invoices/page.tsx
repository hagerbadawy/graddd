"use client";

import { useState } from "react";

type ChargeItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
};

type InvoiceStatus =
  | "draft"
  | "sent"
  | "billed_insurance"
  | "partial"
  | "unpaid"
  | "overdue"
  | "cleared"
  | "void";

type Invoice = {
  id: string;
  patientId: string;
  patientName: string;
  encounterType: string;
  primaryDiagnosis: string;
  chargeItems: ChargeItem[];
  totalCharges: number;
  insurancePaid: number;
  adjustments: number;
  patientBalance: number;
  status: InvoiceStatus;
  insurancePlan?: string;
  date: string;
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [encounterType, setEncounterType] = useState("outpatient");
  const [diagnosis, setDiagnosis] = useState("");
  const [insurancePlan, setInsurancePlan] = useState("");
  const [insurancePaid, setInsurancePaid] = useState(0);
  const [adjustments, setAdjustments] = useState(0);

  const [items, setItems] = useState<ChargeItem[]>([]);
  const [desc, setDesc] = useState("");
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);

  // ➕ add item
  const addItem = () => {
    if (!desc || price <= 0) return;

    setItems([
      ...items,
      {
        id: Date.now().toString(),
        description: desc,
        quantity: qty,
        unitPrice: price,
      },
    ]);

    setDesc("");
    setQty(1);
    setPrice(0);
  };

  // 🧮 calculations
  const total = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
  const balance = total - insurancePaid - adjustments;

  // 💾 save
  const handleSave = () => {
    if (!patientId || !patientName) {
      alert("Enter patient data");
      return;
    }

    if (items.length === 0) {
      alert("Add at least one item");
      return;
    }

    const newInvoice: Invoice = {
      id: Date.now().toString(),
      patientId,
      patientName,
      encounterType,
      primaryDiagnosis: diagnosis,
      chargeItems: items,
      totalCharges: total,
      insurancePaid,
      adjustments,
      patientBalance: balance,
      status: "draft",
      insurancePlan,
      date: new Date().toISOString(),
    };

    setInvoices((prev) => [...prev, newInvoice]);

    setItems([]);
    setShowForm(false);
    setStatusFilter(""); // يرجع All Status
  };

  // 🔄 status update
  const updateStatus = (id: string, status: InvoiceStatus) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id ? { ...inv, status } : inv
      )
    );
  };

  // 🖨️ print
  const handlePrint = (inv: Invoice) => {
    const win = window.open("", "_blank");
    if (!win) return;

    win.document.write(`
      <h2>Invoice</h2>
      <p><b>Patient:</b> ${inv.patientName}</p>
      <p><b>Date:</b> ${new Date(inv.date).toLocaleDateString()}</p>
      <p><b>Diagnosis:</b> ${inv.primaryDiagnosis}</p>
      <p><b>Total:</b> $${inv.totalCharges}</p>
      <p><b>Balance:</b> $${inv.patientBalance}</p>
    `);

    win.print();
  };

  // 🔍 filtering
  const filtered = invoices
    .filter((inv) =>
      inv.patientName.toLowerCase().includes(search.toLowerCase())
    )
    .filter((inv) =>
      statusFilter ? inv.status === statusFilter : true
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Invoices</h1>

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
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="billed_insurance">Billed</option>
          <option value="partial">Partial</option>
          <option value="unpaid">Unpaid</option>
          <option value="overdue">Overdue</option>
          <option value="cleared">Cleared</option>
          <option value="void">Void</option>
        </select>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2"
        >
          + Add Invoice
        </button>
      </div>

      {/* ================= FORM ================= */}
      {showForm && (
        <div className="border p-4 space-y-3">
          <input placeholder="Patient ID" className="border p-2 w-full"
            onChange={(e) => setPatientId(e.target.value)} />

          <input placeholder="Patient Name" className="border p-2 w-full"
            onChange={(e) => setPatientName(e.target.value)} />

          <select className="border p-2 w-full"
            onChange={(e) => setEncounterType(e.target.value)}>
            <option>outpatient</option>
            <option>inpatient</option>
            <option>emergency</option>
          </select>

          <input placeholder="Diagnosis" className="border p-2 w-full"
            onChange={(e) => setDiagnosis(e.target.value)} />

          <input placeholder="Insurance Plan" className="border p-2 w-full"
            onChange={(e) => setInsurancePlan(e.target.value)} />

          <div className="flex gap-2">
            <input placeholder="Desc" className="border p-2"
              value={desc} onChange={(e) => setDesc(e.target.value)} />

            <input type="number" placeholder="Qty" className="border p-2"
              value={qty} onChange={(e) => setQty(Number(e.target.value))} />

            <input type="number" placeholder="Price" className="border p-2"
              value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          </div>

          <button onClick={addItem} className="bg-gray-700 text-white px-3 py-1">
            Add Item
          </button>

          <p>Total: ${total.toLocaleString()}</p>

          <input type="number" placeholder="Insurance Paid"
            onChange={(e) => setInsurancePaid(Number(e.target.value))}
            className="border p-2"/>

          <input type="number" placeholder="Adjustments"
            onChange={(e) => setAdjustments(Number(e.target.value))}
            className="border p-2"/>

          <p>Balance: ${balance.toLocaleString()}</p>

          <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2">
            Save Invoice
          </button>
        </div>
      )}

      {/* ================= TABLE ================= */}
      <table className="w-full border mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Total</th>
            <th>Balance</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((inv) => (
            <>
              <tr key={inv.id} className="text-center border-t">
                <td>{inv.id}</td>
                <td>{inv.patientName}</td>
                <td>${inv.totalCharges.toLocaleString()}</td>
                <td>${inv.patientBalance.toLocaleString()}</td>
                <td>{inv.status}</td>
                <td>{new Date(inv.date).toLocaleDateString()}</td>

                <td className="space-x-2">
                  <button onClick={() =>
                    setExpandedId(expandedId === inv.id ? null : inv.id)
                  }>View</button>

                  <button onClick={() => updateStatus(inv.id, "sent")}>Send</button>
                  <button onClick={() => updateStatus(inv.id, "billed_insurance")}>Bill</button>
                  <button onClick={() => updateStatus(inv.id, "partial")}>Partial</button>
                  <button onClick={() => updateStatus(inv.id, "unpaid")}>Unpaid</button>
                  <button onClick={() => updateStatus(inv.id, "overdue")}>Overdue</button>
                  <button onClick={() => updateStatus(inv.id, "cleared")}>Clear</button>
                  <button onClick={() => updateStatus(inv.id, "void")}>Void</button>

                  <button onClick={() => handlePrint(inv)}>Print</button>
                </td>
              </tr>

              {/* 🔥 DETAILS (UPDATED) */}
              {expandedId === inv.id && (
                <tr>
                  <td colSpan={7} className="bg-gray-50 p-4 text-left">

                    <div className="mb-4 space-y-1">
                      <p><b>Patient ID:</b> {inv.patientId}</p>
                      <p><b>Encounter:</b> {inv.encounterType}</p>
                      <p><b>Diagnosis:</b> {inv.primaryDiagnosis}</p>
                      <p><b>Insurance:</b> {inv.insurancePlan || "N/A"}</p>
                    </div>

                    <table className="w-full border mb-4">
                      <thead className="bg-gray-100">
                        <tr>
                          <th>Description</th>
                          <th>Qty</th>
                          <th>Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>

                      <tbody>
                        {inv.chargeItems.map((item) => (
                          <tr key={item.id} className="text-center border-t">
                            <td>{item.description}</td>
                            <td>{item.quantity}</td>
                            <td>${item.unitPrice}</td>
                            <td>${item.quantity * item.unitPrice}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="space-y-1">
                      <p><b>Total Charges:</b> ${inv.totalCharges}</p>
                      <p><b>Insurance Paid:</b> ${inv.insurancePaid}</p>
                      <p><b>Adjustments:</b> ${inv.adjustments}</p>
                      <p><b>Patient Balance:</b> ${inv.patientBalance}</p>
                    </div>

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