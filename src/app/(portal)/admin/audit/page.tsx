"use client";
import { useEffect, useState } from "react";

type AuditLog = {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  action: string;
  resource: string;
  details: string;
  severity: "info" | "warning" | "critical";
  outcome: "success" | "failure";
};

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    action: "",
    resource: "",
    severity: "",
    outcome: "",
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    const fakeData: AuditLog[] = [
      {
        id: "1",
        timestamp: "2026-04-13T14:00:00",
        userName: "Admin",
        userRole: "admin",
        action: "create",
        resource: "users",
        details: "Created new user",
        severity: "info",
        outcome: "success",
      },
      {
        id: "2",
        timestamp: "2026-04-13T15:00:00",
        userName: "Doctor",
        userRole: "doctor",
        action: "delete",
        resource: "patients",
        details: "Deleted patient",
        severity: "critical",
        outcome: "failure",
      },
    ];

    setLogs(fakeData);
  }, [page]);

  // ✅ FIX مهم: ضبط المقارنة بالتاريخ
  const filteredLogs = logs.filter((log) => {
    const logDate = new Date(log.timestamp);

    const from = filters.fromDate ? new Date(filters.fromDate) : null;
    const to = filters.toDate ? new Date(filters.toDate + "T23:59:59") : null;

    return (
      (!filters.action || log.action === filters.action) &&
      (!filters.resource || log.resource === filters.resource) &&
      (!filters.severity || log.severity === filters.severity) &&
      (!filters.outcome || log.outcome === filters.outcome) &&
      (!from || logDate >= from) &&
      (!to || logDate <= to)
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Audit Logs</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4 items-end">

        <select
          onChange={(e) =>
            setFilters({ ...filters, action: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="">All Actions</option>
          <option value="create">Create</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
        </select>

        <select
          onChange={(e) =>
            setFilters({ ...filters, resource: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="">All Resources</option>
          <option value="users">Users</option>
          <option value="patients">Patients</option>
          <option value="orders">Orders</option>
        </select>

        <select
          onChange={(e) =>
            setFilters({ ...filters, severity: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="">All Severity</option>
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="critical">Critical</option>
        </select>

        <select
          onChange={(e) =>
            setFilters({ ...filters, outcome: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="">All Outcome</option>
          <option value="success">Success</option>
          <option value="failure">Failure</option>
        </select>

        {/* ✅ Date From */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-500 mb-1">From</label>
          <input
            type="date"
            value={filters.fromDate}
            onChange={(e) =>
              setFilters({ ...filters, fromDate: e.target.value })
            }
            className="border p-2 rounded"
          />
        </div>

        {/* ✅ Date To */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-500 mb-1">To</label>
          <input
            type="date"
            value={filters.toDate}
            onChange={(e) =>
              setFilters({ ...filters, toDate: e.target.value })
            }
            className="border p-2 rounded"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-3">Time</th>
              <th className="p-3">User</th>
              <th className="p-3">Role</th>
              <th className="p-3">Action</th>
              <th className="p-3">Resource</th>
              <th className="p-3">Details</th>
              <th className="p-3">Severity</th>
              <th className="p-3">Outcome</th>
            </tr>
          </thead>

          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} className="border-b">
                <td className="p-3">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="p-3">{log.userName}</td>
                <td className="p-3">{log.userRole}</td>
                <td className="p-3">{log.action}</td>
                <td className="p-3">{log.resource}</td>
                <td className="p-3">{log.details}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      log.severity === "info"
                        ? "bg-green-500"
                        : log.severity === "warning"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {log.severity}
                  </span>
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      log.outcome === "success"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {log.outcome}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Prev
        </button>

        <span>Page {page}</span>

        <button
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}