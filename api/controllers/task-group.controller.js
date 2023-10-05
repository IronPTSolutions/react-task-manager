const createError = require('http-errors');
const TaskGroup = require('../models/task-group.model');

module.exports.list = (req, res, next) => {
  const { name } = req.query;
  const criterial = {};
  if (name) {
    criterial.name = name;
  }
  
  TaskGroup.find(criterial)
    .then((group) => res.json(group))
    .catch((error) => next(error));
}

module.exports.create = (req, res, next) => {
  TaskGroup.create(req.body)
    .then((group) => res.status(201).json(group))
    .catch((error) => next(error));
}

module.exports.delete = (req, res, next) => {
  TaskGroup.findByIdAndDelete(req.params.id)
    .then((group) => {
      if (!group) {
        next(createError(404, 'TaskGroup not found'));
      } else {
        res.status(204).send()
      }
    })
    .catch((error) => next(error));
}

module.exports.detail = (req, res, next) => {
  TaskGroup.findById(req.params.id)
    .then((group) => {
      if (!group) {
        next(createError(404, 'TaskGroup not found'));
      } else {
        res.json(group);
      }
    })
    .catch((error) => next(error));
}