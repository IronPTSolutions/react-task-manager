const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
const router = express.Router();
const groups = require("../controllers/task-group.controller");
const tasks = require("../controllers/tasks.controller");
const users = require("../controllers/users.controller");
const auth = require("../middlewares/auth.middleware");
const upload = require("../config/multer.config");

router.get("/task-groups", groups.list);
router.post("/task-groups", groups.create);
router.delete("/task-groups/:id", groups.delete);
router.patch("/task-groups/:id", groups.update);
router.get("/task-groups/:id", groups.detail);

router.get("/tasks", auth.isAuthenticated, tasks.list);
router.get("/tasks/:id", auth.isAuthenticated, tasks.detail);
router.post("/tasks", auth.isAuthenticated, tasks.create);
router.patch("/tasks/:id", auth.isAuthenticated, tasks.update);
router.delete("/tasks/:id", auth.isAuthenticated, tasks.delete);

router.post("/users", upload.single("avatar"), users.create);
router.post("/login", users.login);
router.post("/logout", users.logout);

router.use((req, res, next) => next(createError(404, "Route not found")));

router.use((error, req, res, next) => {
  if (
    error instanceof mongoose.Error.CastError &&
    error.message.includes("_id")
  ) {
    error = createError(404, "Resource not found");
  } else if (error instanceof mongoose.Error.ValidationError) {
    error = createError(400, error);
  } else if (!error.status) {
    error = createError(500, error);
  }
  console.error(error);

  let errors;
  if (error.errors) {
    errors = Object.keys(error.errors).reduce((errors, errorKey) => {
      errors[errorKey] =
        error.errors[errorKey].message || error.errors[errorKey];
      return errors;
    }, {});
  }

  const data = {
    message: error.message,
    errors,
  };
  res.status(error.status).json(data);
});

module.exports = router;
