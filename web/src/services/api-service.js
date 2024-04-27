import axios from "axios";

const service = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BASE_API_URL || "http://localhost:3000/v1",
});

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (
      error.response.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      localStorage.removeItem("user");
      window.location.assign("/login");
    } else {
      return Promise.reject(error);
    }
  }
);

export function login(data) {
  return service.post("/login", data);
}

export function getGroups() {
  return service.get("/task-groups");
}

export function getTasks() {
  return service.get("/tasks");
}

export function getTask(id) {
  return service.get(`/tasks/${id}`);
}

export function deleteTask(id) {
  return service.delete(`/tasks/${id}`);
}

export function createTask(body) {
  return service.post("/tasks", body);
}

export function editTask(id, body) {
  return service.patch(`/tasks/${id}`, body);
}

export function logoutApi() {
  return service.post("/logout");
}

export function createUser(body) {
  const formData = new FormData();

  formData.append("name", body.name);
  formData.append("email", body.email);
  formData.append("password", body.password);

  if (body.avatar) {
    formData.append("avatar", body.avatar[0]);
  }

  return service.post("/users", formData);
}
