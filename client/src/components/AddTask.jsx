import React from "react";

const AddTask = ({ isOpen, onClose, onAddTask }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const description = form.description.value;
    // Add more fields as needed
    onAddTask({ description });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <input name="description" placeholder="Task description" required />
          {/* Add more fields here */}
          <button type="submit">Add Task</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;