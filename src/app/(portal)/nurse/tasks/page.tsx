"use client";

import { useState } from "react";

export default function TasksPage() {
  const nurseId = 1;

  // 🧑‍⚕️ Patients
  const patients = [
    { id: 1, name: "Ahmed Ali" },
    { id: 2, name: "Sara Mohamed" },
    { id: 3, name: "Omar Khaled" },
  ];

  // 📝 Tasks (SPEC-COMPLIANT)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Check vitals",
      status: "pending",
      nurseId: 1,
      patientId: 1,
      completedBy: null,
      completedTime: null,
      notes: "",
    },
    {
      id: 2,
      title: "Give meds",
      status: "done",
      nurseId: 1,
      patientId: 2,
      completedBy: 1,
      completedTime: new Date().toISOString(),
      notes: "",
    },
    {
      id: 3,
      title: "Follow patient",
      status: "pending",
      nurseId: 1,
      patientId: 3,
      completedBy: null,
      completedTime: null,
      notes: "",
    },
  ]);

  // 🔍 GET /nurses/:id/tasks (mock)
  const myTasks = tasks.filter((t) => t.nurseId === nurseId);

  //  PUT /tasks/:id/complete
  const markDone = (id: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: "done",
              completedBy: nurseId,
              completedTime: new Date().toISOString(),
            }
          : t
      )
    );
  };

  //  PUT /tasks/:id/status
  const delayTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: "delayed" }
          : t
      )
    );
  };

  //  status colors
  const getStatusStyle = (status: string) => {
    if (status === "pending") return "bg-yellow-100 text-yellow-700";
    if (status === "done") return "bg-green-100 text-green-700";
    if (status === "delayed") return "bg-red-100 text-red-700";
    return "";
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tasks</h1>

      {myTasks.map((task) => {
        const patient = patients.find(
          (p) => p.id === task.patientId
        );

        return (
          <div
            key={task.id}
            className="p-4 bg-white rounded-xl shadow flex justify-between items-center"
          >
            {/* LEFT */}
            <div>
              <p className="font-medium">{task.title}</p>

              {/*  patient */}
              <p className="text-sm text-gray-500">
                Patient: {patient?.name}
              </p>

              {/* status */}
              <span
                className={`text-xs px-2 py-1 rounded-full ${getStatusStyle(
                  task.status
                )}`}
              >
                {task.status}
              </span>

              {/*  metadata */}
              {task.completedTime && (
                <div className="text-xs text-gray-400 mt-1 space-y-1">
                  <p>
                    Done at:{" "}
                    {new Date(task.completedTime).toLocaleString()}
                  </p>

                  <p>
                    Done by: Nurse {task.completedBy}
                  </p>
                </div>
              )}

              {/*  notes (ready for spec) */}
              {task.notes && (
                <p className="text-xs text-gray-500 mt-1">
                  Notes: {task.notes}
                </p>
              )}
            </div>

            {/* RIGHT BUTTONS */}
            <div className="flex gap-2">
              {task.status === "pending" && (
                <>
                  <button
                    onClick={() => markDone(task.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Done
                  </button>

                  <button
                    onClick={() => delayTask(task.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Delay
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}