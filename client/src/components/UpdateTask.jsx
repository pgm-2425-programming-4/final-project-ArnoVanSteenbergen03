import React, { useState } from "react";
import { useFetchData } from "./FetchData";

async function updateTask(task, updatedFields) {
  console.log("Updating task:", task);
  await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${task.documentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
    body: JSON.stringify({ data: updatedFields }),
  });
}

export default function UpdateTask({ task, onClose, onUpdated }) {
  const { data: statuses = [], loading: loadingStatuses } =
    useFetchData("statuses");

  const [editStatus, setEditStatus] = useState(task.task_status?.id || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await updateTask(task, { task_status: Number(editStatus) });
    setSaving(false);
    if (onUpdated) onUpdated();
    onClose();
  };

  if (loadingStatuses)
    return (
      <div className="modal">
        <p>Loading statuses...</p>
      </div>
    );

  return (
    <div className="modal">
      <h2>Edit Task</h2>
      <p>
        <strong>Title:</strong> {task.title}
      </p>
      <label>
        Status:
        <select
          value={editStatus}
          onChange={(e) => setEditStatus(e.target.value)}
        >
          {statuses.map((status) => (
            <option key={status.id} value={status.id}>
              {status.name}
            </option>
          ))}
        </select>
      </label>
      <div>
        <button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
        <button onClick={onClose} disabled={saving}>
          Cancel
        </button>
      </div>
    </div>
  );
}
