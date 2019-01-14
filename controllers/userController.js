const User = require('../models/User.js')

let catchAsync = promise => {
  return new Promise( (resolve) => {
    promise.then( result => resolve([ null, result]))
    promise.catch( error => resolve([ error, null ]))
  })
}

exports.index = (req, res, next) => {
  User.find((err, users) => {
    if (err) {
      res.status(500).json({
        success: false,
        error: err
      })
    } else {
      res.status(200).json(users)
    }
  })
}

exports.show = async (req, res, next) => {
  let user = await User.findById(req.params.id)
  res.json(user)
}

exports.create = async (req, res, next) => {
  let user = new User({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName
  })
  await user.save()
  res.json(user)
}

exports.delete = async (req, res, next) => {
  let [err, user] = await catchAsync(User.findByIdAndDelete(req.params.id))
  if (err) {
    res.status(500).json({
      success: false,
      error: err
    })
  } else {
    res.json(user)
  }
}
