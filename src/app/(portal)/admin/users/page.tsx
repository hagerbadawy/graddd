"use client";
import { useEffect, useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  departmentId?: string;
  departmentName?: string;
  status: "active" | "inactive" | "suspended" | "pending";
};

type Department = {
  id: string;
  name: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

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

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    departmentId: "",
    phone: "",
  });

  // ================= GET USERS =================
  const fetchUsers = async () => {
    try {
      const query = `?search=${search}&role=${roleFilter}&status=${statusFilter}`;
      const res = await fetch(`/admin/users${query}`);
      const data = await res.json();
      setUsers(data.data || data);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= GET DEPARTMENTS =================
  const fetchDepartments = async () => {
    try {
      const res = await fetch("/admin/departments");
      const data = await res.json();
      setDepartments(data.data || data);
    } catch (err) {
      console.error(err);

      // fallback لو backend مش جاهز
      setDepartments([
        { id: "1", name: "Cardiology" },
        { id: "2", name: "Emergency" },
        { id: "3", name: "ICU" },
        { id: "4", name: "Radiology" },
        { id: "5", name: "Pharmacy" },
      ]);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchDepartments();
  }, [search, roleFilter, statusFilter]);

  // ================= CREATE / UPDATE =================
  const handleSaveUser = async () => {
    if (!newUser.firstName || !newUser.email || !newUser.role) {
      alert("Missing data");
      return;
    }

    try {
      if (editingUser) {
        await fetch(`/admin/users/${editingUser.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });

        setUsers((prev) =>
          prev.map((u) =>
            u.id === editingUser.id
              ? {
                  ...u,
                  ...newUser,
                  departmentName:
                    departments.find((d) => d.id === newUser.departmentId)
                      ?.name || "",
                }
              : u
          )
        );
      } else {
        const res = await fetch(`/admin/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });

        let createdUser: any = {};
        try {
          const data = await res.json();
          createdUser = data.data || data;
        } catch {}

        setUsers((prev) => [
          ...prev,
          {
            id: createdUser?.id || Math.random().toString(),
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            role: newUser.role,
            departmentId: newUser.departmentId,
            departmentName:
              departments.find((d) => d.id === newUser.departmentId)?.name ||
              "",
            status: "pending",
          },
        ]);
      }

      setShowForm(false);
      setEditingUser(null);

      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        departmentId: "",
        phone: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  // ================= STATUS =================
  const updateStatus = async (id: string, status: string) => {
    if (!confirm("Change status?")) return;

    await fetch(`/admin/users/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status } : u))
    );
  };

  // ================= DELETE =================
  const deleteUser = async (id: string) => {
    if (!confirm("Delete user?")) return;

    await fetch(`/admin/users/${id}`, { method: "DELETE" });

    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // ================= RESET =================
  const resetPassword = async (id: string) => {
    await fetch(`/admin/users/${id}/reset-password`, {
      method: "POST",
    });
    alert("Reset link sent");
  };

  // ================= ACTIVITY =================
  const viewActivity = async (id: string) => {
    const res = await fetch(`/admin/users/${id}/activity`);
    const data = await res.json();
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users Management</h1>

      {/* FILTERS */}
      <div className="flex gap-2 mb-4">
        <input
          placeholder="Search..."
          className="input"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select className="input" onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="">All Roles</option>
          {roles.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>

        <select
          className="input"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
          <option value="pending">Pending</option>
        </select>

        <button
          onClick={() => {
            setEditingUser(null);
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 rounded"
        >
          + Add User
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.departmentName || "-"}</td>

                <td>
                  <span className="px-2 py-1 bg-gray-200 rounded">
                    {user.status}
                  </span>
                </td>

                <td className="flex gap-2 flex-wrap">
                  {user.status !== "active" && (
                    <button onClick={() => updateStatus(user.id, "active")} className="btn-green">Activate</button>
                  )}
                  {user.status !== "suspended" && (
                    <button onClick={() => updateStatus(user.id, "suspended")} className="btn-yellow">Suspend</button>
                  )}
                  {user.status !== "inactive" && (
                    <button onClick={() => updateStatus(user.id, "inactive")} className="btn-red">Deactivate</button>
                  )}

                  <button onClick={() => resetPassword(user.id)} className="btn-blue">Reset</button>
                  <button onClick={() => viewActivity(user.id)} className="btn-gray">Activity</button>

                  <button
                    onClick={() => {
                      setEditingUser(user);
                      setNewUser({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        role: user.role,
                        departmentId: user.departmentId || "",
                        phone: "",
                      });
                      setShowForm(true);
                    }}
                    className="btn-blue"
                  >
                    Edit
                  </button>

                  <button onClick={() => deleteUser(user.id)} className="btn-red">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-[400px]">
            <h2 className="mb-4 font-bold">
              {editingUser ? "Edit User" : "Create User"}
            </h2>

            <input className="input" placeholder="First Name"
              value={newUser.firstName}
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
            />

            <input className="input" placeholder="Last Name"
              value={newUser.lastName}
              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
            />

            <input className="input" placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />

            {/* ✅ Dynamic Departments */}
            <select
              className="input"
              value={newUser.departmentId}
              onChange={(e) =>
                setNewUser({ ...newUser, departmentId: e.target.value })
              }
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            <select
              className="input"
              value={newUser.role}
              onChange={(e) =>
                setNewUser({ ...newUser, role: e.target.value })
              }
            >
              <option value="">Select Role</option>
              {roles.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>

            <input className="input" placeholder="Phone"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            />

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowForm(false)}>Cancel</button>
              <button onClick={handleSaveUser} className="btn-green">
                {editingUser ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .input { border:1px solid #ccc; padding:6px; border-radius:6px; width:100%; margin-bottom:8px;}
        .btn-green { background:#16a34a; color:white; padding:4px 8px; border-radius:4px;}
        .btn-yellow { background:#eab308; padding:4px 8px; border-radius:4px;}
        .btn-red { background:#dc2626; color:white; padding:4px 8px; border-radius:4px;}
        .btn-blue { background:#2563eb; color:white; padding:4px 8px; border-radius:4px;}
        .btn-gray { background:#6b7280; color:white; padding:4px 8px; border-radius:4px;}
      `}</style>
    </div>
  );
}