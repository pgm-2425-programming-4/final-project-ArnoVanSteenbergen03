function Backlog({ tasks }) {
  return (
    <>
      <h1>Backlog Taken</h1>
      <table>
        <thead>
          <tr>
            <th>Titel</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Backlog;
