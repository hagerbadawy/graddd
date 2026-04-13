export default function WardsPage() {
  const wards = [
    { name: "Ward A", capacity: 20, occupied: 15 },
    { name: "Ward B", capacity: 15, occupied: 10 },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Wards</h1>

      <div className="bg-card p-6 rounded-2xl shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b text-muted-foreground">
              <th className="py-3">Ward</th>
              <th>Capacity</th>
              <th>Occupied</th>
            </tr>
          </thead>

          <tbody>
            {wards.map((w, i) => (
              <tr key={i} className="border-b">
                <td className="py-3">{w.name}</td>
                <td>{w.capacity}</td>
                <td>{w.occupied}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}