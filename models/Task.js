const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  content: {type: String, required: true},
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  isCompleted: {type: Boolean},
  isPriority: {type: Boolean},
  isBacklog: {type: Boolean},
  isRecurring: {type: Boolean},
  rolledOver: {type: Boolean},
  streak: {type: Number},
  isSuggested: {type: Boolean},
  suggested: {type: Number},
  dateCreated: {type: Date},
  dateUpdated: {type: Date},
  simpleDateUpdated: {type: Number}
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
