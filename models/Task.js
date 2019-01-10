const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  content: {type: String, required: true}
})

const Task = mongoose.model('Task', taskSchema)

Task.find({}, (err, tasks) => {
  if (err) {
    console.log(err);
  } else if (tasks.length === 0) {
    const task1 = new Task({
      content: 'this is a task1 yay'
    })
    const task2 = new Task({
      content: 'this is another, task2 yay'
    })
    task1.save()
    task2.save()
    console.log('Seeded DB with 2 new tasks.');
  }
})

module.exports = Task
