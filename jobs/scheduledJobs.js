const mongoose = require("mongoose");
const User = require("../models/User.js");
const Task = require("../models/Task.js");

mongoose.connect(
  "mongodb://localhost/mod-5",
  { useNewUrlParser: true }
);

users = User.find({});
tasks = Task.find({});
// console.log(users)

exports.test = () => {
  console.log('scheduled job test')
}

exports.rolloverTasks = () => {

}
