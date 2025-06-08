import React, { useEffect, useState } from "react";

const Searchbar = ({ onViewBacklog, onStackTypeChange, activeProjectName }) => {
  const [stackTypes, setStackTypes] = useState([]);

  useEffect(() => {
    async function fetchStackTypes() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/stack-types`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
          }
        );
        const data = await res.json();
        setStackTypes(data.data || []);
      } catch (err) {
        console.error(err);
        setStackTypes([]);
      }
    }
    fetchStackTypes();
  }, []);

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
        <button className="btn add-task">Add new task</button>
        <button className="btn view-backlog" onClick={onViewBacklog}>
          View backlog
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
