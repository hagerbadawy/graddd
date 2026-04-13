"use client";
import { useEffect, useState } from "react";

// ================= TYPES =================
type Ward = {
  id: string;
  name: string;
  departmentId: string;
  type: string;
  status: "active" | "inactive";
};

type Bed = {
  id: string;
  wardId: string;
  type: string;
  status: "available" | "occupied";
};

// ================= PAGE =================
export default function WardsPage() {
  const [wards, setWards] = useState<Ward[]>([]);
  const [beds, setBeds] = useState<Bed[]>([]);

  const [filters, setFilters] = useState({
    type: "",
    status: "",
  });

  const [showWardForm, setShowWardForm] = useState(false);
  const [showBedForm, setShowBedForm] = useState(false);

  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);

  // ================= MOCK =================
  useEffect(() => {
    setWards([
      { id: "1", name: "Ward A", departmentId: "Cardiology", type: "ICU", status: "active" },
      { id: "2", name: "Ward B", departmentId: "Emergency", type: "General", status: "inactive" },
    ]);

    setBeds([
      { id: "1", wardId: "1", type: "ICU", status: "occupied" },
      { id: "2", wardId: "2", type: "General", status: "available" },
    ]);
  }, []);

  // ================= FILTER =================
  const filteredWards = wards.filter((w) => {
    return (
      (filters.type === "" || w.type === filters.type) &&
      (filters.status === "" || w.status === filters.status)
    );
  });

  const filteredBeds = beds.filter((b) => {
    return (
      (filters.type === "" || b.type === filters.type) &&
      (filters.status === "" || b.status === filters.status)
    );
  });

  // ================= STATUS =================
  const toggleWardStatus = (ward: Ward) => {
    setWards((prev) =>
      prev.map((w) =>
        w.id === ward.id
          ? { ...w, status: w.status === "active" ? "inactive" : "active" }
          : w
      )
    );
  };

  const toggleBedStatus = (bed: Bed) => {
    setBeds((prev) =>
      prev.map((b) =>
        b.id === bed.id
          ? { ...b, status: b.status === "available" ? "occupied" : "available" }
          : b
      )
    );
  };

  const deleteBed = (id: string) => {
    setBeds((prev) => prev.filter((b) => b.id !== id));
  };

  const getWardName = (id: string) => {
    return wards.find((w) => w.id === id)?.name || id;
  };

  // ================= SAVE =================
  const saveWard = () => {
    if (selectedWard) {
      setWards((prev) =>
        prev.map((w) => (w.id === selectedWard.id ? selectedWard : w))
      );
    }
    setShowWardForm(false);
    setSelectedWard(null);
  };

  const saveBed = () => {
    if (selectedBed) {
      setBeds((prev) =>
        prev.map((b) => (b.id === selectedBed.id ? selectedBed : b))
      );
    }
    setShowBedForm(false);
    setSelectedBed(null);
  };

  // ================= UI =================
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Wards & Beds</h1>

      {/* FILTERS */}
      <div className="flex gap-3">
        <select onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
          <option value="">All Types</option>
          <option value="ICU">ICU</option>
          <option value="General">General</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
        </select>
      </div>

      {/* ================= WARDS ================= */}
      <div>
        <div className="flex justify-between mb-2">
          <h2>Wards</h2>
          <button className="btn green" onClick={() => setShowWardForm(true)}>
            + Add Ward
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredWards.map((w) => (
              <tr key={w.id}>
                <td>{w.name}</td>
                <td>{w.departmentId}</td>
                <td>{w.type}</td>
                <td>
                  <span className={`badge ${w.status}`}>{w.status}</span>
                </td>
                <td>
                  <div className="actions">
                    <button
                      className={w.status === "active" ? "btn red" : "btn green"}
                      onClick={() => toggleWardStatus(w)}
                    >
                      {w.status === "active" ? "Deactivate" : "Activate"}
                    </button>

                    <button
                      className="btn blue"
                      onClick={() => {
                        setSelectedWard(w);
                        setShowWardForm(true);
                      }}
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

      {/* ================= BEDS ================= */}
      <div>
        <div className="flex justify-between mb-2">
          <h2>Beds</h2>
          <button className="btn blue" onClick={() => setShowBedForm(true)}>
            + Add Bed
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Ward</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBeds.map((b) => (
              <tr key={b.id}>
                <td>{getWardName(b.wardId)}</td>
                <td>{b.type}</td>
                <td>
                  <span className={`badge ${b.status}`}>{b.status}</span>
                </td>
                <td>
                  <div className="actions">
                    <button
                      className="btn yellow"
                      onClick={() => toggleBedStatus(b)}
                    >
                      Toggle Status
                    </button>

                    <button
                      className="btn blue"
                      onClick={() => {
                        setSelectedBed(b);
                        setShowBedForm(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="btn red"
                      onClick={() => deleteBed(b.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= STYLES ================= */}
      <style jsx>{`
        .table {
          width: 100%;
          background: white;
          border-radius: 8px;
          padding: 10px;
        }

        .actions {
          display: flex;
          gap: 8px;
        }

        .btn {
          padding: 6px 10px;
          border-radius: 6px;
          color: white;
        }

        .green { background: #16a34a; }
        .blue { background: #2563eb; }
        .red { background: #dc2626; }
        .yellow { background: #ca8a04; }

        .badge {
          padding: 4px 8px;
          border-radius: 6px;
        }

        .active { background: #bbf7d0; }
        .inactive { background: #fecaca; }
        .available { background: #bbf7d0; }
        .occupied { background: #fde68a; }
      `}</style>
    </div>
  );
}