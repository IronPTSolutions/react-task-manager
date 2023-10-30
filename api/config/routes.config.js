const express = require("express");
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

module.exports = router;
