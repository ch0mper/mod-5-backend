const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  content: {type: String, required: true},
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  completed: {type: Boolean},
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
