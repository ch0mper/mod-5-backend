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

// exports.rolloverTasks = () => {
  Task.find({isCompleted: !'hi'}, (err, tasks) => {
    tasks.map(task => {
      console.log('in map 2 tasks', task.content)
    })
  });
// }

let today = new Date()
let simpleDate = parseInt(today.toISOString().slice(0,10).replace(/-/g,""));
let yesterday = simpleDate - 1

// Math.floor((new Date()) / (24*60*60*1000)) // todays date in days

// if e is the dateUpdated:
// this is truthy when it's yesterday's date
// Math.floor(e / (24*60*60*1000)) == Math.floor((new Date()) / (24*60*60*1000)) - 1
