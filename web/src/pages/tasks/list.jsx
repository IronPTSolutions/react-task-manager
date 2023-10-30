import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTasks } from "../../services/api-service";

function TaskList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTasks().then((data) => {
      setData(data);
    });
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <section>
      <div>
        <h1>Task list</h1>
        <Link to="/tasks/new" className="btn btn-primary">
          New task
        </Link>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Group</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Priority</th>
            <th scope="col">Labels</th>
            <th scope="col">Due to</th>
            <th scope="col">Completed</th>
          </tr>
        </thead>
        <tbody>
          {data.map((task) => (
            <tr
              key={task.id}
              onClick={() => {
                navigate(`/tasks/${task.id}`);
              }}
            >
              <td>{task.group.name}</td>
              <td>
                <Link to={`/tasks/${task.id}`}>{task.title}</Link>
              </td>
              <td>{task.description}</td>
              <td>{task.priority}</td>
              <td>{task.labels}</td>
              <td>{task.due_to}</td>
              <td>{task.completed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TaskList;
