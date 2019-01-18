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
  });
}

exports.test = () => {
  console.log('scheduled job test')
}

exports.recurringTasks = () => {
  console.log('should create daily tasks from yesterday')
  let simpleYesterday = parseInt((new Date(Date.now() - 108e6)).toISOString().slice(0,10).replace(/-/g,""))
  Task.find({simpleDateUpdated: simpleYesterday, isRecurring: true}, (err, tasks) => {
    tasks.map(task => {
      new Task({
        content: task.content,
        userId: task.userId,
        isCompleted: false,
        isPriority: false,
        isBacklog: false,
        isRecurring: true,
        dateCreated: new Date(Date.now() - 216e5), // minus 6 hours
        dateUpdated: new Date(Date.now() - 216e5), // minus 6 hours
        simpleDateUpdated: parseInt((new Date(Date.now() - 216e5)).toISOString().slice(0,10).replace(/-/g,""))
      }).save()
    })
  });
}

exports.rolledOverTasks = () => {
  console.log('should create rollover tasks from yesterday')
  let simpleYesterday = parseInt((new Date(Date.now() - 108e6)).toISOString().slice(0,10).replace(/-/g,""))
  Task.find({simpleDateUpdated: simpleYesterday, isCompleted: false, isRecurring: false, isBacklog: false}, (err, tasks) => {
    tasks.map(task => {
      new Task({
        content: task.content,
        userId: task.userId,
        isCompleted: false,
        isPriority: false,
        isBacklog: false,
        isRecurring: false,
        rolledOver: true,
        dateCreated: new Date(Date.now() - 216e5), // minus 6 hours
        dateUpdated: new Date(Date.now() - 216e5), // minus 6 hours
        simpleDateUpdated: parseInt((new Date(Date.now() - 216e5)).toISOString().slice(0,10).replace(/-/g,""))
      }).save()
    })
  });
}


// content: input.content,
// userId: userId,
// isCompleted: false,
// isPriority: false,
// isBacklog: false,
// isRecurring: `${recurringStatus}`, //true from daily, false from mainlist
// rolledOver: true, //when true rendered in rolledover container
// dateCreated: new Date(),
// dateUpdated: new Date(),
// simpleDateUpdated: parseInt((new Date()).toISOString().slice(0,10).replace(/-/g,""))
