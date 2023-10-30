import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createTask,
  editTask,
  getGroups,
  getTask,
} from "../../services/api-service";
import { useNavigate, useParams } from "react-router-dom";

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

function TaskForm() {
  const [error, setError] = useState(null);
  const [groups, setGroups] = useState([]);
  const params = useParams();
  const isEdit = params.id ? true : false;
  const [task, setTask] = useState(isEdit ? null : {});
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: task,
  });

  useEffect(() => {
    if (isEdit) {
      getTask(params.id).then((data) => {
        setTask(data);
      });
    }

    getGroups().then((data) => {
      setGroups(data);
    });
  }, []);

  function handleCreateTask(data) {
    createTask(data)
      .then((task) => {
        navigate(`/tasks/${task.id}`);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }

  function handleEditTask(data) {
    editTask(task.id, data)
      .then((task) => {
        navigate(`/tasks/${task.id}`);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }

  if (task === null || groups.length === 0) return <div>Loading...</div>;

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit(isEdit ? handleEditTask : handleCreateTask)}>
        <div className="mb-3">
          <label htmlFor="group" className="form-label">
            Group
          </label>

          <select className="form-control" id="group" {...register("group")}>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>

          <input
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            id="title"
            {...register("title", { required: true })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>

          <input
            type="text"
            className="form-control"
            id="description"
            {...register("description")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="priority" className="form-label">
            Priority
          </label>

          <select
            className="form-control"
            id="priority"
            {...register("priority")}
          >
            <option value="P1">High</option>
            <option value="P2">Medium</option>
            <option value="P3">Low</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="dueTo" className="form-label">
            Due to
          </label>

          <input
            defaultValue={tomorrow.toISOString().split("T")[0]}
            type="date"
            className="form-control"
            id="dueTo"
            {...register("dueTo")}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {isEdit ? "Edit" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
