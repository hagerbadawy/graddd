"use client";

export default function RolesPage() {
  const roles = [
    {
      name: "Administrator",
      permissions: ["Full Access", "Manage Users", "System Settings"],
    },
    {
      name: "Doctor",
      permissions: ["View Patients", "Update Records"],
    },
    {
      name: "Nurse",
      permissions: ["View Patients"],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Roles & Permissions</h1>

      <div className="bg-card p-6 rounded-2xl shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-muted-foreground">
              <th className="py-3">Role</th>
              <th>Permissions</th>
            </tr>
          </thead>

          <tbody>
            {roles.map((role, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 font-medium">{role.name}</td>
                <td>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((perm, i) => (
                      <span
                        key={i}
                        className="bg-muted px-2 py-1 rounded-md text-sm"
                      >
                        {perm}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}