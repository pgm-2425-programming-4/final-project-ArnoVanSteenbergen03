import React, { useState } from "react";
import { useFetchData } from "./FetchData";
import UpdateTask from "./UpdateTask";

export default function ProjectBoard({ projectId, selectedStackType }) {
  const endpoint = projectId
    ? `tasks?populate=*&filters[project]=${projectId}`
    : null;

  const { data: tasks = [], loading, refetch } = useFetchData(endpoint);

  const [editingTask, setEditingTask] = useState(null);

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
    <div className="project-board">
      {statuses.map((status) => (
        <div key={status} className="status-column">
          <h3>{status}</h3>
          {getTasksByStatus(status).map((task) => (
            <div
              key={task.id}
              className="task-card"
              onClick={() => {
                console.log("Clicked task:", task);
                setEditingTask(task);
              }}
              style={{ cursor: "pointer" }}
            >
              <strong>{task.title}</strong>
              <div className="task-stack">
                Stack: {task.stack_type?.stack_name || "No stack type"}
              </div>
              <div className="task-description">
                {task.description || <em>No description</em>}
              </div>
            </div>
          ))}
        </div>
      ))}

      {editingTask && (
        <div className="modal-overlay">
          <UpdateTask
            task={editingTask}
            onClose={() => setEditingTask(null)}
            onUpdated={refetch}
          />
        </div>
      )}
    </div>
  );
}
