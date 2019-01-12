const jwt = require('jwt-simple')
const User = require('../models/User')
const config = require('../config/keys')

const tokenForUser = (user) => {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, config.jwtSecret)
}

exports.signin = (req, res, next) => {
  const token = tokenForUser(req.user)
  res.json({token: token, userId: req.user._id, firstName: req.user.firstName})
}

exports.signup = (req, res, next) => {
  const firstName = req.body.firstName
  const email = req.body.email
  const password = req.body.password

  if (!firstName || !email || !password) {
    return res.status(422).send({ error: 'You must provide a name, email and password.' })
  }

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      return next(err)
    }
    if (existingUser) {
      return res.status(422).send({ error: 'Email is already in use.'})
    }

    const user = new User({
      firstName: firstName,
      email: email,
      password: password
    })

    user.save((err) => {
      if (err) {
        return next(err)
      }
      user.password = 'HIDDEN'
      token = tokenForUser(user)
      res.json({token: token, userId: user._id, firstName: user.firstName})
    })
  })
}
