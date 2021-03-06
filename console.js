const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost/mod-5",
  { useNewUrlParser: true }
);

let User = require("./models/User.js");
let Task = require("./models/Task.js");

pry = require("pryjs");

(async function() {
  await User.deleteMany();
  const user1 = new User({
    email: "megan@example.com",
    password: "12",
    firstName: 'Megan'
  });
  const user2 = new User({
    email: "barbara@example.com",
    password: "12",
    firstName: 'Barbara'
  });
  await user1.save();
  await user2.save();
  console.log("Seeded DB with 2 new users.");
  users = await User.find({});

  await Task.deleteMany();
  const task1 = new Task({
    content: "this is the content of task1, belongs to megan",
    userId: user1._id,
    isCompleted: false,
    isPriority: false,
    isBacklog: false,
    isRecurring: false,
    dateCreated: new Date(),
    dateUpdated: new Date(),
    simpleDateUpdated: parseInt((new Date()).toISOString().slice(0,10).replace(/-/g,""))
  });
  const task2 = new Task({
    content: "a backlog task yay, also belongs to megan",
    userId: user1._id,
    isCompleted: false,
    isPriority: false,
    isBacklog: true,
    isRecurring: false,
    dateCreated: new Date(),
    dateUpdated: new Date(),
    simpleDateUpdated: parseInt((new Date()).toISOString().slice(0,10).replace(/-/g,""))
  });
  const task3 = new Task({
    content: "a daily",
    userId: user1._id,
    isCompleted: false,
    isPriority: false,
    isBacklog: false,
    isRecurring: true,
    dateCreated: new Date(),
    dateUpdated: new Date(),
    simpleDateUpdated: parseInt((new Date()).toISOString().slice(0,10).replace(/-/g,""))
  });
  await task1.save();
  await task2.save();
  await task3.save();
  console.log("Seeded DB with 3 new tasks.");
  tasks = await Task.find({});

  eval(pry.it);
})();
