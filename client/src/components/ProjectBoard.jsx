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
        "filters[project][id][$eq]": projectId,
        "populate": "task_status,stack_type",
        "pagination[pageSize]": 100, // adjust as needed
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
            <div key={task.id} style={{ margin: "1em 0", padding: 12, background: "#fff", borderRadius: 8 }}>
              <strong>{task.attributes.title}</strong>
              {/* Render stack_type, etc. as needed */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}