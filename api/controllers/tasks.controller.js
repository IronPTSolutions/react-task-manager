const createError = require("http-errors");
const TaskGroup = require("../models/task-group.model");
const Task = require("../models/task.model");

module.exports.list = (req, res, next) => {
  // TODO: filters

  Task.find()
    .populate("group")
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  Task.findById(req.params.id)
    .then((task) => {
      if (task) {
        res.json(task);
      } else {
        next(createError(404, "Task not found"));
      }
    })
    .catch((error) => next(error));
};

module.exports.create = (req, res, next) => {
  TaskGroup.findById(req.body.group)
    .then((group) => {
      if (!group) {
        next(createError(404, "Task group not found"));
      } else {
        return Task.create(req.body);
      }
    })
    .then((task) => res.status(201).json(task))
    .catch((error) => next(error));
};

module.exports.update = (req, res, next) => {
  Task.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  })
    .then((task) => {
      if (task) {
        res.json(task);
      } else {
        next(createError(404, "Task not found"));
      }
    })
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  Task.findByIdAndDelete(req.params.id)
    .then((task) => {
      if (!task) {
        next(createError(404, "Task not found"));
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => next(error));
};
