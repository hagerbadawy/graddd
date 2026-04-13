"use client";

import { useState } from "react";

type Note = {
  id: number;
  patientId: number;
  patientName: string;
  category: string;
  content: string;
  recordedBy: string;
  timestamp: string;

  editedBy?: string;
  editedAt?: string;
};

export default function NursingNotesPage() {
  const nurseName = "Nurse 1";

  const patients = [
    { id: 1, name: "Ahmed Ali" },
    { id: 2, name: "Sara Mohamed" },
  ];

  const [notes, setNotes] = useState<Note[]>([]);

  const [form, setForm] = useState({
    patientId: 0,
    category: "",
    content: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  // ⏱ edit allowed within 10 minutes
  const canEdit = (timestamp: string) => {
    const diff =
      new Date().getTime() - new Date(timestamp).getTime();
    return diff < 10 * 60 * 1000;
  };

  // ➕ Create Note
  const handleAdd = () => {
    if (!form.patientId || !form.category || !form.content) return;

    const patient = patients.find(
      (p) => p.id === form.patientId
    );

    const newNote: Note = {
      id: Date.now(),
      patientId: form.patientId,
      patientName: patient?.name || "",
      category: form.category,
      content: form.content,
      recordedBy: nurseName,
      timestamp: new Date().toISOString(),
    };

    setNotes([newNote, ...notes]);

    setForm({
      patientId: 0,
      category: "",
      content: "",
    });
  };

  // ✏ Edit Note (UPDATED)
  const handleEdit = (id: number, newContent: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              content: newContent,
              editedBy: nurseName,
              editedAt: new Date().toISOString(),
            }
          : n
      )
    );
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Nursing Notes</h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        {/* Patient */}
        <select
          value={form.patientId}
          onChange={(e) =>
            setForm({ ...form, patientId: Number(e.target.value) })
          }
          className="border p-2 w-full rounded"
        >
          <option value={0}>Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Category */}
        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          className="border p-2 w-full rounded"
        >
          <option value="">Select Category</option>
          <option value="General">General</option>
          <option value="Medication">Medication</option>
          <option value="Assessment">Assessment</option>
        </select>

        {/* Content */}
        <textarea
          placeholder="Write note..."
          value={form.content}
          onChange={(e) =>
            setForm({ ...form, content: e.target.value })
          }
          className="border p-2 w-full rounded"
        />

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Note
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="border p-4 rounded-lg space-y-2"
          >
            <div className="flex justify-between">
              <p className="font-medium">
                {note.patientName} • {note.category}
              </p>

              {canEdit(note.timestamp) && (
                <button
                  onClick={() => setEditingId(note.id)}
                  className="text-blue-500 text-sm"
                >
                  Edit
                </button>
              )}
            </div>

            {/* Content */}
            {editingId === note.id ? (
              <EditBox note={note} onSave={handleEdit} />
            ) : (
              <p>{note.content}</p>
            )}

            {/* Created Meta */}
            <p className="text-xs text-gray-400">
              {new Date(note.timestamp).toLocaleString()} •{" "}
              {note.recordedBy}
            </p>

            {/* Edited Meta */}
            {note.editedAt && (
              <p className="text-xs text-blue-500">
                Edited at{" "}
                {new Date(note.editedAt).toLocaleString()} •{" "}
                {note.editedBy}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ✏ Edit Component
function EditBox({
  note,
  onSave,
}: {
  note: any;
  onSave: (id: number, content: string) => void;
}) {
  const [value, setValue] = useState(note.content);

  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <button
        onClick={() => onSave(note.id, value)}
        className="bg-green-600 text-white px-3 py-1 rounded text-sm"
      >
        Save
      </button>
    </div>
  );
}