function Backlog({ tasks }) {
  return (
    <div className="backlog-card">
      <h2 className="backlog__title">Backlog </h2>
      <ul className="backlog__list">
        {tasks.map((task) => (
          <li className="backlog__item" key={task.id}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Backlog;