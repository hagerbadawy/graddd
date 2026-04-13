"use client";
import { useEffect, useState } from "react";

const roles = [
  "admin",
  "doctor",
  "nurse",
  "patient",
  "receptionist",
  "lab_tech",
  "radiologist",
  "pharmacist",
  "accountant",
];

const resources = [
  "patients",
  "encounters",
  "orders",
  "prescriptions",
  "lab_results",
  "radiology_reports",
  "invoices",
  "claims",
  "payments",
  "users",
  "departments",
  "beds",
  "catalogs",
  "audit_logs",
  "settings",
];

const actions = ["view", "create", "edit", "delete", "approve", "export"];

export default function RolesPage() {
  const [selectedRole, setSelectedRole] = useState("admin");
  const [permissions, setPermissions] = useState<any>({});

  // ================= INIT =================
  const buildPermissions = () => {
    const data: any = {};

    roles.forEach((role) => {
      data[role] = {};

      resources.forEach((res) => {
        data[role][res] =
          role === "admin" ? [...actions] : ["view"];
      });
    });

    return data;
  };

  useEffect(() => {
    setPermissions(buildPermissions());
  }, []);

  // ================= FIXED TOGGLE =================
  const togglePermission = (resource: string, action: string) => {
    setPermissions((prev: any) => {
      const updated = JSON.parse(JSON.stringify(prev)); // 🔥 deep copy

      const current = updated[selectedRole][resource];

      if (current.includes(action)) {
        updated[selectedRole][resource] = current.filter(
          (a: string) => a !== action
        );
      } else {
        updated[selectedRole][resource].push(action);
      }

      return updated;
    });
  };

  // ================= SAVE =================
  const savePermissions = async () => {
    await fetch("/admin/permissions", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(permissions),
    });

    alert("Permissions saved successfully");
  };

  if (!permissions[selectedRole]) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Roles & Permissions</h1>

      {/* ROLE SELECT */}
      <select
        className="input mb-4"
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
      >
        {roles.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>

      {/* TABLE */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <table className="w-full border text-center">
          <thead>
            <tr>
              <th className="border p-2 text-left">Resource</th>
              {actions.map((a) => (
                <th key={a} className="border p-2 capitalize">
                  {a}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {resources.map((res) => (
              <tr key={res}>
                <td className="border p-2 text-left font-medium">
                  {res}
                </td>

                {actions.map((a) => (
                  <td key={a} className="border p-2">
                    <input
                      type="checkbox"
                      checked={
                        permissions?.[selectedRole]?.[res]?.includes(a) ||
                        false
                      }
                      onChange={(e) => {
                        e.stopPropagation();
                        togglePermission(res, a);
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={savePermissions}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>

      {/* STYLE */}
      <style jsx>{`
        .input {
          border: 1px solid #ccc;
          padding: 6px;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}