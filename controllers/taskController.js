const Task = require('../models/Task.js')

let catchAsync = promise => {
  return new Promise( (resolve) => {
    promise.then(
      result => resolve([ null, result]),
      error => {
        resolve([ error, null ])
      })
  })
}

exports.index = (req, res, next) => {
  Task.find((err, tasks) => {
    if (err) {
      res.status(500).json({
        success: false,
        error: err
      })
    } else {
      res.status(200).json(tasks)
    }
  })
}

exports.show = async (req, res, next) => {
  let task = await Task.findById(req.params.id)
  res.json(task)
}

exports.create = async (req, res, next) => {
  let task = new Task({
    content: req.body.content,
    userId: req.body.userId,
    completed: req.body.completed,
    isPriority: req.body.isPriority,
    isBacklog: req.body.isBacklog,
    isRecurring: req.body.isRecurring,
    dateCreated: req.body.dateCreated,
    dateUpdated: req.body.dateUpdated
  })
  await task.save()
  res.json(task)
}

exports.update = async (req, res, next) => {
  let [err, task] = await catchAsync(Task.findByIdAndUpdate(req.params.id, req.body, { new: true}))
  if (err) {
    res.status(500).json({
      success: false,
      error: err
    })
  } else {
    res.json(task)
  }
}

exports.delete = async (req, res, next) => {
  let [err, task] = await catchAsync(Task.findByIdAndDelete(req.params.id))
  if (err) {
    res.status(500).json({
      success: false,
      error: err
    })
  } else {
    res.json(task)
  }
}

exports.filteredTasks = async (req, res, next) => {
  let allTasks = await Task.find({userId: req.params.id})
  // filter dateCreated === today's date
  let tasks = allTasks.filter(task => !task.isBacklog)
  res.json(tasks)
}

exports.backlogTasks = async (req, res, next) => {
  let tasks = await Task.find({userId: req.params.id})
  let backlogTasks = tasks.filter(task => task.isBacklog)
  res.json(backlogTasks)
}

exports.dailyTasks = async (req, res, next) => {
  let allTasks = await Task.find({userId: req.params.id})
  // filter dateCreated === today's date
  let tasks = allTasks.filter(task => task.isRecurring)
  res.json(tasks)
}
