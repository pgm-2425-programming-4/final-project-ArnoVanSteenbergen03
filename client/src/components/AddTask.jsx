import React from "react";
import { useFetchData } from "./FetchData";

const AddTask = ({ isOpen, onClose, onAddTask, projectId }) => {
  const { data: stackTypes = [] } = useFetchData("stack-types");
  const { data: statusOptions = [] } = useFetchData("statuses");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const description = form.description.value;
    const title = form.title.value;
    const stack_type = form.stack_type.value;
    const status = form.status.value;
    onAddTask({ title, description, stack_type, status, project: projectId });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Task name" required />
          <input name="description" placeholder="Task description" required />
          <select name="stack_type" required>
            <option value="">Select Stack Type</option>
            {stackTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.attributes?.stack_name || type.stack_name}
              </option>
            ))}
          </select>
          <select name="status" required>
            <option value="">Select Status</option>
            {statusOptions.map((status) => (
              <option key={status.id} value={status.id}>
                {status.attributes?.name || status.name}
              </option>
            ))}
          </select>
          <button type="submit">Add Task</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
