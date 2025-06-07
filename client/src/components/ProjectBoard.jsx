import React, { useEffect, useState } from "react";

const STATUSES = [
  { slug: "to-do", label: "To do" },
  { slug: "in-progress", label: "In progress" },
  { slug: "ready-for-review", label: "Ready for review" },
  { slug: "done", label: "Done" },
];

export default function ProjectBoard({ projectId }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      const params = new URLSearchParams({
        populate: "task_status,stack_type",
        "filters[task_status][slug][$ne]": "backlog",
        "filters[project][id][$eq]": projectId,
      });
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tasks?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );
      const data = await res.json();
      setTasks(data.data || []);
      setLoading(false);
    }
    if (projectId) fetchTasks();
  }, [projectId]);

  function getTasksByStatus(statusSlug) {
    return tasks.filter(
      (task) => task.attributes.task_status?.data?.attributes?.slug === statusSlug
    );
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      {STATUSES.map((status) => (
        <div key={status.slug} style={{ minWidth: 220 }}>
          <h3>{status.label}</h3>
          {getTasksByStatus(status.slug).map((task) => (
            <div
              key={task.id}
              style={{
                margin: "1em 0",
                padding: 12,
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <strong>{task.attributes.title}</strong>
              {task.attributes.stack_type?.data?.attributes?.name && (
                <div style={{ marginTop: 4, fontSize: 12, color: "#555" }}>
                  {task.attributes.stack_type.data.attributes.name}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}