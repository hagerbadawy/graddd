export default function AuditPage() {
  const logs = [
    { user: "Admin", action: "Deleted user", date: "2026-03-21" },
    { user: "Doctor", action: "Updated record", date: "2026-03-20" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Audit Trail</h1>

      <div className="bg-card p-6 rounded-2xl shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b text-muted-foreground">
              <th className="py-3">User</th>
              <th>Action</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, i) => (
              <tr key={i} className="border-b">
                <td className="py-3">{log.user}</td>
                <td>{log.action}</td>
                <td>{log.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}