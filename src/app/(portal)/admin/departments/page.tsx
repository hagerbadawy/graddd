export default function DepartmentsPage() {
  const departments = [
    { name: "Cardiology", head: "Dr. Ahmed", staff: 12 },
    { name: "Neurology", head: "Dr. Sara", staff: 8 },
    { name: "Radiology", head: "Dr. Omar", staff: 6 },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Departments</h1>

      <div className="bg-card p-6 rounded-2xl shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="text-muted-foreground border-b">
              <th className="py-3">Department</th>
              <th>Head</th>
              <th>Staff Count</th>
            </tr>
          </thead>

          <tbody>
            {departments.map((dep, i) => (
              <tr key={i} className="border-b">
                <td className="py-3">{dep.name}</td>
                <td>{dep.head}</td>
                <td>{dep.staff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}