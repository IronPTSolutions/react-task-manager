import { Navigate, Route, Routes } from "react-router-dom";
import TaskList from "./pages/tasks/list";
import TaskDetail from "./pages/tasks/detail";
import NavBar from "./components/navbar";
import LoginPage from "./pages/login/login";
import { Authenticated, Unauthenticated } from "./components/authenticated";
import SignupPage from "./pages/signup/signup";
import TaskForm from "./pages/tasks/form";

function App() {
  return (
    <div className="App">
      <NavBar />

      <div className="container py-5">
        <Routes>
          <Route
            path="/tasks"
            element={
              <Authenticated>
                <TaskList />
              </Authenticated>
            }
          />
          <Route
            path="/login"
            element={
              <Unauthenticated>
                <LoginPage />
              </Unauthenticated>
            }
          />
          <Route
            path="/signup"
            element={
              <Unauthenticated>
                <SignupPage />
              </Unauthenticated>
            }
          />

          <Route
            path="/tasks/new"
            element={
              <Authenticated>
                <TaskForm />
              </Authenticated>
            }
          />

          <Route
            path="/tasks/:id/edit"
            element={
              <Authenticated>
                <TaskForm />
              </Authenticated>
            }
          />

          <Route
            path="/tasks/:id"
            element={
              <Authenticated>
                <TaskDetail />
              </Authenticated>
            }
          />

          <Route path="*" element={<Navigate to="/tasks" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
