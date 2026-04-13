"use client";

import { useState } from "react";

type Event = {
  id: number;
  type: "invoice_created" | "payment_posted" | "claim_submitted";
  amount: number;
  date: string;
};

export default function TimelinePage() {
  const [patientId, setPatientId] = useState("");
  const [events, setEvents] = useState<Event[]>([]);

  // 🔥 Load timeline
  const handleLoad = () => {
    if (!patientId) {
      alert("Enter Patient ID");
      return;
    }

    // ✅ mock data (standardized types)
    let data: Event[] = [
      {
        id: 1,
        type: "invoice_created",
        amount: 500,
        date: new Date().toISOString(),
      },
      {
        id: 2,
        type: "payment_posted",
        amount: 300,
        date: new Date(Date.now() - 10000000).toISOString(),
      },
      {
        id: 3,
        type: "claim_submitted",
        amount: 500,
        date: new Date(Date.now() - 5000000).toISOString(),
      },
    ];

    // 🔥 sort DESC by date (IMPORTANT)
    data.sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setEvents(data);
  };

  // 🎨 helper لعرض اسم كويس بدل raw value
  const getLabel = (type: Event["type"]) => {
    switch (type) {
      case "invoice_created":
        return "Invoice Created";
      case "payment_posted":
        return "Payment Posted";
      case "claim_submitted":
        return "Claim Submitted";
      default:
        return type;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Financial Timeline</h1>

      {/* 🔍 INPUT */}
      <div className="flex gap-3 mb-6">
        <input
          placeholder="Enter Patient ID"
          className="border p-2 w-64"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />

        <button
          onClick={handleLoad}
          className="bg-blue-600 text-white px-4 py-2"
        >
          Load
        </button>
      </div>

      {/* 📊 TIMELINE */}
      {events.length === 0 ? (
        <p className="text-gray-500">
          Enter a patient ID and click Load
        </p>
      ) : (
        <div className="space-y-3">
          {events.map((e) => (
            <div
              key={e.id}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <p>
                <strong>Type:</strong> {getLabel(e.type)}
              </p>
              <p>
                <strong>Amount:</strong> ${e.amount}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(e.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}