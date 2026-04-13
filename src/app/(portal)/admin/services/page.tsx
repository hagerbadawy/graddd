export default function ServicesPage() {
  const services = [
    { name: "X-Ray", price: "$50" },
    { name: "MRI", price: "$200" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Service Catalog</h1>

      <div className="bg-card p-6 rounded-2xl shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b text-muted-foreground">
              <th className="py-3">Service</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {services.map((s, i) => (
              <tr key={i} className="border-b">
                <td className="py-3">{s.name}</td>
                <td>{s.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}