"use client";
import { useEffect, useState } from "react";

type Stats = {
  totalBilledToday: number;
  collectedToday: number;
  pendingInsurance: number;
  patientBalanceDue: number;
  pendingClaims: number;
  deniedClaims: number;
  overdue30Days: number;
  collectionRate: number;
};

export default function BillingStatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  const formatMoney = (value: number) => {
    return `$${new Intl.NumberFormat().format(value)}`;
  };

  // 🔥 auto load بدل الزرار
  useEffect(() => {
    const data: Stats = {
      totalBilledToday: 12000,
      collectedToday: 8000,
      pendingInsurance: 5000,
      patientBalanceDue: 3000,
      pendingClaims: 12,
      deniedClaims: 3,
      overdue30Days: 1500,
      collectionRate: 75,
    };

    setStats(data);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Billing Stats</h1>

      <p className="text-gray-500 mb-6">
        Overview of today's billing performance
      </p>

      {/* 🔥 Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <Card title="Total Billed Today" value={formatMoney(stats.totalBilledToday)} />
          <Card title="Collected Today" value={formatMoney(stats.collectedToday)} />
          <Card title="Pending Insurance" value={formatMoney(stats.pendingInsurance)} />
          <Card title="Patient Balance Due" value={formatMoney(stats.patientBalanceDue)} />

          <Card title="Pending Claims" value={stats.pendingClaims} />
          <Card title="Denied Claims" value={stats.deniedClaims} />
          <Card title="Overdue 30 Days" value={formatMoney(stats.overdue30Days)} />

          {/* 🎯 Collection Rate */}
          <div className="border rounded p-4 shadow bg-white">
            <p className="text-sm text-gray-500">Collection Rate</p>
            <p className="text-xl font-bold text-green-600">
              {stats.collectionRate}%
            </p>
          </div>

        </div>
      )}
    </div>
  );
}

function Card({ title, value }: { title: string; value: any }) {
  return (
    <div className="border rounded p-4 shadow bg-white">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}