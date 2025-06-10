import React from "react";
import { useFetchData } from "./FetchData";

export default function ProjectBoard({ projectId, selectedStackType }) {
  const endpoint = projectId
    ? `tasks?populate=*&filters[project]=${projectId}`
    : null;

  const { data: tasks = [], loading } = useFetchData(endpoint);

  const statusOrder = ["To Do", "In Progress", "Ready for review", "Done"];

  const allStatuses = tasks
    .map((task) => task.task_status?.name || "No status")
    .filter((status) => status !== "Backlog");

  const statuses = statusOrder.filter((status) => allStatuses.includes(status));

  const filteredTasks = selectedStackType
    ? tasks.filter((task) => task.stack_type?.stack_name === selectedStackType)
    : tasks;

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