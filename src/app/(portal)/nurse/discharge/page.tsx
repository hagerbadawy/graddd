"use client";
import { useState } from "react";

type Patient = {
  id: number;
  name: string;
};

type ChecklistItem = {
  id: number;
  patientId: number;
  title: string;
  completed: boolean;
  completedBy?: string;
  notes?: string;
};

const patients: Patient[] = [
  { id: 1, name: "Ahmed Ali" },
  { id: 2, name: "Sara Mohamed" },
];

export default function DischargeChecklistPage() {
  const nurse = "Nurse 1";

  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);

  const [items, setItems] = useState<ChecklistItem[]>([]);

  const [notesMap, setNotesMap] = useState<{ [key: number]: string }>({});

  // 🟢 Generate checklist (simulate POST)
  const generateChecklist = (patientId: number) => {
    const defaultItems: ChecklistItem[] = [
      { id: 1, patientId, title: "Give discharge meds", completed: false },
      { id: 2, patientId, title: "Patient education", completed: false },
      { id: 3, patientId, title: "Remove IV", completed: false },
      { id: 4, patientId, title: "Final vitals", completed: false },
    ];

    setItems(defaultItems);
  };

  // 🟢 Complete item (simulate PUT)
  const markComplete = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: true,
              completedBy: nurse,
              notes: notesMap[id] || "",
            }
          : item
      )
    );
  };

  const currentItems = items.filter(
    (item) => item.patientId === selectedPatient
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Discharge Checklist</h1>

      {/* Patient Select */}
      <select
        onChange={(e) => {
          const id = Number(e.target.value);
          setSelectedPatient(id);
          generateChecklist(id);
        }}
        className="border p-2 rounded w-full"
      >
        <option value="">Select Patient</option>
        {patients.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      {/* Checklist */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div className="flex-1">
              <p className="font-medium">{item.title}</p>

              {item.completed && (
                <p className="text-xs text-gray-500">
                  Done by: {item.completedBy}
                </p>
              )}

              {item.notes && (
                <p className="text-xs text-gray-500">
                  Notes: {item.notes}
                </p>
              )}

              {!item.completed && (
                <input
                  placeholder="Add note (optional)"
                  className="border p-1 mt-2 w-full rounded"
                  onChange={(e) =>
                    setNotesMap({
                      ...notesMap,
                      [item.id]: e.target.value,
                    })
                  }
                />
              )}
            </div>

            {!item.completed && (
              <button
                onClick={() => markComplete(item.id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Complete
              </button>
            )}

            {item.completed && (
              <span className="text-green-600 font-bold">
                ✔ Done
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}