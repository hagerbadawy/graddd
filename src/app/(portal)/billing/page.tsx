"use client";

import { useEffect, useState } from "react";

type Stats = {
  totalRevenue: number;
  pendingPayments: number;
  overdueInvoices: number;
  totalClaims: number;
};

export default function BillingDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  // 🔥 auto load
  useEffect(() => {
    const data: Stats = {
      totalRevenue: 12450,
      pendingPayments: 3200,
      overdueInvoices: 1150,
      totalClaims: 24,
    };

    setStats(data);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-1">Billing Dashboard</h1>
      <p className="text-gray-500 mb-6">
        Overview of financial performance
      </p>

      {!stats ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card title="Total Revenue" value={`$${stats.totalRevenue}`} />
            <Card title="Pending Payments" value={`$${stats.pendingPayments}`} />
            <Card
              title="Overdue Invoices"
              value={`$${stats.overdueInvoices}`}
              danger
            />
            <Card title="Total Claims" value={stats.totalClaims} />
          </div>

          <div className="border rounded p-4 bg-white shadow-sm">
            <h2 className="font-semibold mb-3">Recent Activity</h2>

            <ul className="space-y-2 text-sm">
              <li className="text-green-600">✔ Invoice #123 paid</li>
              <li className="text-yellow-600">⚠ Invoice #124 pending</li>
              <li className="text-red-600">✖ Invoice #125 overdue</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

function Card({
  title,
  value,
  danger,
}: {
  title: string;
  value: string | number;
  danger?: boolean;
}) {
  return (
    <div
      className={`p-4 rounded shadow-sm border ${
        danger ? "border-red-300 bg-red-50" : "bg-white"
      }`}
    >
      <p className="text-gray-500 text-sm">{title}</p>
      <p
        className={`text-lg font-semibold ${
          danger ? "text-red-600" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}