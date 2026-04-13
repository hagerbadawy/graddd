"use client";
import { useEffect, useState } from "react";

type Department = {
  id: string;
  name: string;
  type: string;
  status: "active" | "inactive";
  staffCount?: number;
  bedCount?: number;
};

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Department | null>(null);

  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [form, setForm] = useState({
    name: "",
    type: "",
  });

  // ================= FETCH =================
  useEffect(() => {
    setDepartments([
      {
        id: "1",
        name: "Cardiology",
        type: "medical",
        status: "active",
        staffCount: 10,
        bedCount: 20,
      },
      {
        id: "2",
        name: "Emergency",
        type: "emergency",
        status: "active",
        staffCount: 15,
        bedCount: 10,
      },
    ]);
  }, []);

  // ================= SAVE =================
  const saveDepartment = () => {
    if (!form.name || !form.type) return alert("Missing data");

    if (editing) {
      setDepartments((prev) =>
        prev.map((d) =>
          d.id === editing.id ? { ...d, ...form } : d
        )
      );
    } else {
      setDepartments((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          name: form.name,
          type: form.type,
          status: "active",
          staffCount: 0,
          bedCount: 0,
        },
      ]);
    }

    setShowForm(false);
    setEditing(null);
    setForm({ name: "", type: "" });
  };

  // ================= STATUS =================
  const changeStatus = (id: string, status: "active" | "inactive") => {
    setDepartments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Departments</h1>

      {/* FILTERS */}
      <div className="flex gap-2 mb-4">
        <select onChange={(e) => setFilterType(e.target.value)} className="input">
          <option value="">All Types</option>
          <option value="medical">Medical</option>
          <option value="emergency">Emergency</option>
          <option value="surgical">Surgical</option>
        </select>

        <select onChange={(e) => setFilterStatus(e.target.value)} className="input">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="btn-green"
        >
          + Add Department
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th>Name</th>
              <th>Type</th>
              <th>Staff</th>
              <th>Beds</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {departments.map((d) => (
              <tr key={d.id}>
                <td>{d.name}</td>
                <td>{d.type}</td>
                <td>{d.staffCount}</td>
                <td>{d.bedCount}</td>

                {/* STATUS */}
                <td>
                  <span
                    className={
                      d.status === "active"
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {d.status}
                  </span>
                </td>

                {/* ✅ ACTIONS FIXED */}
                <td>
                  <div className="actions">
                    {d.status === "inactive" ? (
                      <button
                        onClick={() => changeStatus(d.id, "active")}
                        className="btn-green"
                      >
                        Activate
                      </button>
                    ) : (
                      <button
                        onClick={() => changeStatus(d.id, "inactive")}
                        className="btn-red"
                      >
                        Deactivate
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setEditing(d);
                        setForm({ name: d.name, type: d.type });
                        setShowForm(true);
                      }}
                      className="btn-blue"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-[350px]">
            <h2 className="mb-4 font-bold">
              {editing ? "Edit Department" : "Create Department"}
            </h2>

            <input
              placeholder="Name"
              className="input"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <select
              className="input"
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
            >
              <option value="">Select Type</option>
              <option value="medical">Medical</option>
              <option value="emergency">Emergency</option>
              <option value="surgical">Surgical</option>
            </select>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowForm(false)}>Cancel</button>
              <button onClick={saveDepartment} className="btn-green">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STYLES */}
      <style jsx>{`
        .input {
          border: 1px solid #ccc;
          padding: 6px;
          border-radius: 6px;
          width: 100%;
          margin-bottom: 8px;
        }

        /* 🔥 الحل النهائي */
        .actions {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: nowrap;
        }

        .actions button {
          display: inline-flex !important;
          width: auto !important;
          white-space: nowrap;
        }

        .btn-green {
          background: #16a34a;
          color: white;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 12px;
        }

        .btn-red {
          background: #dc2626;
          color: white;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 12px;
        }

        .btn-blue {
          background: #2563eb;
          color: white;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 12px;
        }

        .status-active {
          background: #dcfce7;
          color: #166534;
          padding: 4px 8px;
          border-radius: 999px;
          font-size: 12px;
        }

        .status-inactive {
          background: #fee2e2;
          color: #991b1b;
          padding: 4px 8px;
          border-radius: 999px;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}