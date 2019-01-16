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
    completed: false,
    isPriority: false,
    isBacklog: false
  });
  const task2 = new Task({
    content: "another task yay, also belongs to megan",
    userId: user1._id,
    completed: false,
    isPriority: false,
    isBacklog: false
  });
  await task1.save();
  await task2.save();
  console.log("Seeded DB with 2 new tasks.");
  tasks = await Task.find({});

  eval(pry.it);
})();
