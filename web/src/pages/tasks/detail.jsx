import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteTask, getTask } from "../../services/api-service";

function TaskDetail() {
  const [data, setData] = useState(null);
  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getTask(params.id).then((data) => {
      setData(data);
    });
  }, []);

  if (!data) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <h1>Task detail</h1>

      <p>{data.title}</p>
      <p>{data.description}</p>
      <p>{data.due_to}</p>
      <p>....</p>

      <button
        onClick={() => {
          deleteTask(data.id).then(() => {
            navigate("/tasks");
          });
        }}
        className="btn btn-danger me-3"
      >
        Delete
      </button>

      <Link to={`/tasks/${data.id}/edit`} className="btn btn-primary">
        Edit
      </Link>
    </div>
  );
}

export default TaskDetail;
