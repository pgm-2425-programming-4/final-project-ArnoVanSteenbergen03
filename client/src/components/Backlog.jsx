function Backlog({ tasks }) {
  return (
    <div className="backlog-card">
      <h2 className="backlog-card__title">Backlog </h2>
      <ul className="backlog-card__list">
        {tasks.map((task) => (
          <li className="backlog-card__item" key={task.id}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Backlog;