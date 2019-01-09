const UserController = require('../controllers/userController');

module.exports = (app) => {
  app.get('/api/test', (req, res) => {
    res.send({msg: 'oh hai!'})
  })

  app.get('/api/users', UserController.readAll)
}
