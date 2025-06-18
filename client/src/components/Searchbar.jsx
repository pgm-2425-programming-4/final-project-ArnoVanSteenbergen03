import React, { useState } from "react";
import AddTask from "./AddTask";
import { useFetchData } from "./FetchData";

const Searchbar = ({
  onViewBacklog,
  onStackTypeChange,
  activeProjectName,
  currentProject,
}) => {
  const { data: stackTypes } = useFetchData("stack-types");
  const [showAddTask, setShowAddTask] = useState(false);

  const handleAddTask = async (task) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
        body: JSON.stringify({
          data: {
            title: task.title,
            description: task.description,
            stack_type: Number(task.stack_type),
            task_status: Number(task.status),
            project: Number(task.project.id),
          },
        }),
      });
      if (!res.ok) throw new Error("Failed to add task");
      window.location.reload();
    } catch (err) {
      alert("Error adding task: " + err.message);
    }
  };

  return (
    <div className="task-search-bar">
      <div className="task-search-left">
        <select
          className="task-dropdown"
          onChange={(e) => onStackTypeChange(e.target.value)}
        >
          <option value="">All stack types</option>
          {stackTypes.map((type) => (
            <option
              key={type.id}
              value={type.attributes?.stack_name || type.stack_name}
            >
              {type.attributes?.stack_name || type.stack_name}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="task-search-input"
          placeholder="Search by description"
        />
      </div>

      <div className="task-search-center">
        <span className="active-project">
          Active project: <strong>{activeProjectName}</strong>
        </span>
      </div>

      <div className="task-search-right">
        <button className="btn add-task" onClick={() => setShowAddTask(true)}>
          Add new task
        </button>
        <button className="btn view-backlog" onClick={onViewBacklog}>
          View backlog
        </button>
      </div>
      <AddTask
        isOpen={showAddTask}
        onClose={() => setShowAddTask(false)}
        onAddTask={handleAddTask}
        project={currentProject}
      />
    </div>
  );
};

export default Searchbar;
