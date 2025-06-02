import React from "react";

const Searchbar = () => {
  return (
    <div className="task-search-bar">
      <div className="task-search-left">
        <select className="task-dropdown">
          <option>Back-end</option>
          <option>Front-end</option>
          <option>Design</option>
        </select>
        <input
          type="text"
          className="task-search-input"
          placeholder="Search by description"
        />
      </div>

      <div className="task-search-center">
        <span className="active-project">Active project: <strong>PGM3</strong></span>
      </div>

      <div className="task-search-right">
        <button className="btn add-task">Add new task</button>
        <button className="btn view-backlog">View backlog</button>
      </div>
    </div>
  );
};

export default Searchbar;