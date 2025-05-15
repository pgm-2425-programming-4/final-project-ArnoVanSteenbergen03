function Backlog({ tasks }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Titel</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>{task.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Backlog;
