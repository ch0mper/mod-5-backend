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
    isCompleted: req.body.isCompleted,
    isPriority: req.body.isPriority,
    isBacklog: req.body.isBacklog,
    isRecurring: req.body.isRecurring,
    rolledOver: req.body.rolledOver,
    streak: req.body.streak,
    dateCreated: req.body.dateCreated,
    dateUpdated: req.body.dateUpdated,
    simpleDateUpdated: req.body.simpleDateUpdated
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

// 216e5 6 hours
// 864e5 24 hours

exports.filteredTasks = async (req, res, next) => {
  let simpleToday = parseInt((new Date(Date.now() - 216e5)).toISOString().slice(0,10).replace(/-/g,""))
  let allTasks = await Task.find({userId: req.params.id, simpleDateUpdated: simpleToday})
  let tasks = allTasks.filter(task => !task.isBacklog && !task.isRecurring && !task.rolledOver)
  res.json(tasks)
}

exports.backlogTasks = async (req, res, next) => {
  let backlogTasks = await Task.find({userId: req.params.id, isBacklog: true})
  res.json(backlogTasks)
}

exports.dailyTasks = async (req, res, next) => {
  let simpleToday = parseInt((new Date(Date.now() - 216e5)).toISOString().slice(0,10).replace(/-/g,""))
  let tasks = await Task.find({userId: req.params.id, simpleDateUpdated: simpleToday, isRecurring: true})
  res.json(tasks)
}

exports.rolledOverTasks = async (req, res, next) => {
  let simpleToday = parseInt((new Date(Date.now() - 216e5)).toISOString().slice(0,10).replace(/-/g,""))
  let rolledOverTasks = await Task.find({userId: req.params.id, simpleDateUpdated: simpleToday, rolledOver: true})
  res.json(rolledOverTasks)
}
