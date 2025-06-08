import React, { useEffect, useState } from "react";

export default function ProjectBoard({ projectId, selectedStackType }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          populate: "*",
          "filters[project]": projectId,
        });
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/tasks?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
          }
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setTasks(data.data || []);
      } catch (err) {
        console.error(err);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    }
    if (projectId) fetchTasks();
  }, [projectId]);

  // Get unique statuses and stack types from tasks
  const statuses = Array.from(
    new Set(tasks.map((task) => task.task_status?.name || "No status"))
  );

  // Filter tasks by selected stack type if set
  const filteredTasks = selectedStackType
    ? tasks.filter((task) => task.stack_type?.stack_name === selectedStackType)
    : tasks;

  // Group tasks by status
  function getTasksByStatus(statusName) {
    return filteredTasks.filter(
      (task) => (task.task_status?.name || "No status") === statusName
    );
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      {statuses.map((status) => (
        <div key={status} style={{ minWidth: 220 }}>
          <h3>{status}</h3>
          {getTasksByStatus(status).map((task) => (
            <div
              key={task.id}
              style={{
                margin: "1em 0",
                padding: 12,
                background: "#fff",
                color: "#333",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <strong>{task.title}</strong>
              <div style={{ marginTop: 4, fontSize: 12, color: "#555" }}>
                Stack: {task.stack_type?.stack_name || "No stack type"}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
