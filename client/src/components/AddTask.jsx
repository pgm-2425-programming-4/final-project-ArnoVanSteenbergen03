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
        <h2 className="modal__title">Add New Task</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <input
            className="modal__input"
            name="title"
            placeholder="Task name"
            required
          />
          <input
            className="modal__input"
            name="description"
            placeholder="Task description"
            required
          />
          <select className="modal__select" name="stack_type" required>
            <option value="">Select Stack Type</option>
            {stackTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.attributes?.stack_name || type.stack_name}
              </option>
            ))}
          </select>
          <select className="modal__select" name="status" required>
            <option value="">Select Status</option>
            {statusOptions.map((status) => (
              <option key={status.id} value={status.id}>
                {status.attributes?.name || status.name}
              </option>
            ))}
          </select>
          <button className="modal__button" type="submit">
            Add Task
          </button>
          <button className="modal__button" type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
