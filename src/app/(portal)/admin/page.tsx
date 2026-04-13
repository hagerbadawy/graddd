"use client";
import { useEffect, useState } from "react";

type Stats = {
  totalUsers: number;
  activeUsers: number;
  totalDepartments: number;
  totalBeds: number;
  occupiedBeds: number;
  totalLabTests: number;
  totalRadiologyStudies: number;
  auditLogsToday: number;
  systemUptime: string;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 120,
    activeUsers: 95,
    totalDepartments: 8,
    totalBeds: 200,
    occupiedBeds: 150,
    totalLabTests: 340,
    totalRadiologyStudies: 210,
    auditLogsToday: 45,
    systemUptime: "12 days",
  });

  // لما تربطي backend
  useEffect(() => {
    // fetch('/admin/stats').then(...)
  }, []);

  const Card = ({ title, value }: { title: string; value: any }) => (
    <div className="bg-white p-4 rounded shadow flex flex-col gap-2">
      <span className="text-sm text-gray-500">{title}</span>
      <span className="text-xl font-bold">{value}</span>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <Card title="Total Users" value={stats.totalUsers} />
        <Card title="Active Users" value={stats.activeUsers} />
        <Card title="Departments" value={stats.totalDepartments} />

        <Card title="Total Beds" value={stats.totalBeds} />
        <Card title="Occupied Beds" value={stats.occupiedBeds} />

        <Card title="Lab Tests" value={stats.totalLabTests} />
        <Card title="Radiology Studies" value={stats.totalRadiologyStudies} />

        <Card title="Audit Logs Today" value={stats.auditLogsToday} />
        <Card title="System Uptime" value={stats.systemUptime} />
      </div>
    </div>
  );
}