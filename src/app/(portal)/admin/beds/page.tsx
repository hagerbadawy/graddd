export default function BedsPage() {
  const beds = [
    { id: "B1", ward: "Ward A", status: "Occupied" },
    { id: "B2", ward: "Ward A", status: "Available" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Beds</h1>

      <div className="bg-card p-6 rounded-2xl shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b text-muted-foreground">
              <th className="py-3">Bed ID</th>
              <th>Ward</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {beds.map((b, i) => (
              <tr key={i} className="border-b">
                <td className="py-3">{b.id}</td>
                <td>{b.ward}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      b.status === "Available"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}