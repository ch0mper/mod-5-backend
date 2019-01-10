const Task = require('../models/Task.js')

let catchAsync = promise => {
  return new Promise( (resolve) => {
    promise.then( result => resolve([ null, result]))
    promise.catch( error => resolve([ error, null ]))
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
    content: req.body.content
  })
  await task.save()
  res.json(task)
}

exports.filteredTasks = async (req, res, next) => {
  let tasks = await Task.find({userId: req.params.id})
  res.json(tasks)
}
