const mongoose = require("mongoose");
const User = require("../models/User.js");
const Task = require("../models/Task.js");

mongoose.connect(
  "mongodb://localhost/mod-5",
  { useNewUrlParser: true }
);

exports.testWithTasks = () => {
  Task.find({isRecurring: true, isCompleted: true}, (err, tasks) => {
    console.log('recurring', tasks);
    // only get the ones that are yesterday's
    // map through the tasks to create new Task with task.content etc
    // try adding .save to the new Task
  });
}

exports.test = () => {
  console.log('scheduled job test')
}

exports.rolloverTasks = () => {
  Task.find({isRecurring: true, isCompleted: false}, (err, tasks) => {
    console.log('recurring', tasks);
  });
}
