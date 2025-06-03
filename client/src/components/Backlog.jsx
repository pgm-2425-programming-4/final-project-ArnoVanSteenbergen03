function Backlog({ tasks }) {
  return (
    <>
      <h1>Backlog Taken</h1>
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
    </>
  );
}

export default Backlog;
