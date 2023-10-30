const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const priorities = require("../data/priorities.json");

const taskSchema = new Schema(
  {
    group: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "TaskGroup",
    },
    title: {
      type: String,
      trim: true,
      required: "Task title is required",
      minLength: [3, "Task title needs at least 3 chars"],
      maxLength: [100, "Task title needs at most 100 chars"],
    },
    description: {
      type: String,
      trim: true,
      minLength: [3, "Task description needs at least 3 chars"],
      maxLength: [500, "Task title needs at most 500 chars"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: priorities,
      default: "P3",
    },
    dueTo: {
      type: Date,
      validate: {
        validator: function (dueTo) {
          return dueTo > new Date();
        },
        message: "Due date must be in the future ",
      },
    },
    labels: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
