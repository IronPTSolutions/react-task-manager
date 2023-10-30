const createError = require("http-errors");
const TaskGroup = require("../models/task-group.model");

module.exports.list = (req, res, next) => {
  const criteria = {};
  const { name } = req.query;

  if (name) {
    criteria.name = name;
  }

  TaskGroup.find(criteria)
    .then((group) => res.json(group))
    .catch((error) => next(error));
};

module.exports.update = (req, res, next) => {
  TaskGroup.findByIdAndUpdate(req.params.id, {
    runValidators: true,
    new: true,
  })
    .then((group) => {
      if (group) {
        res.json(group);
      } else {
        next(createError(404, "Task Group not found"));
      }
    })
    .catch((error) => next(error));
};

module.exports.create = (req, res, next) => {
  TaskGroup.create(req.body)
    .then((group) => res.status(201).json(group))
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  TaskGroup.findByIdAndDelete(req.params.id)
    .then((group) => {
      if (!group) {
        next(createError(404, "TaskGroup not found"));
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  TaskGroup.findById(req.params.id)
    .populate("tasks")
    .then((group) => {
      if (!group) {
        next(createError(404, "TaskGroup not found"));
      } else {
        res.json(group);
      }
    })
    .catch((error) => next(error));
};
