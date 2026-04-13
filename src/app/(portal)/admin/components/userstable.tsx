"use client";

export default function UsersTable() {
  const users = [
    { name: "Ahmed Ali", role: "Doctor", status: "Active", email: "ahmed@mail.com" },
    { name: "Sara Mohamed", role: "Nurse", status: "Inactive", email: "sara@mail.com" },
    { name: "Omar Khaled", role: "Patient", status: "Active", email: "omar@mail.com" },
  ];

  const statusStyle = (status: string) => {
    if (status === "Active") return "bg-green-100 text-green-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Users Management</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium">{user.name}</td>
              <td className="p-3 text-gray-600">{user.email}</td>
              <td className="p-3">{user.role}</td>

              <td className="p-3">
                <span className={`px-3 py-1 rounded-full text-xs ${statusStyle(user.status)}`}>
                  {user.status}
                </span>
              </td>

              <td className="p-3 text-right space-x-2">
                <button className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded">
                  Edit
                </button>

                <button className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}