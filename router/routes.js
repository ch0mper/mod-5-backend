const UserController = require('../controllers/userController');
const TaskController = require('../controllers/taskController');
const Authentication = require('../controllers/authentication');

const passport = require('../services/passport')

const requireAuth = passport.authenticate('jwt', {session: false})
const requireSignin = passport.authenticate('local', {session: false})

module.exports = (app) => {

  app.post('/api/user/signup', Authentication.signup)
  app.post('/api/user/signin', requireSignin, Authentication.signin)

  app.get('/api/test', requireAuth, (req, res) => {
    res.send({msg: 'oh hai! this is authenticated'})
  })

  app.get('/api/users', UserController.index)
  app.get('/api/users/:id', UserController.show)
  app.post('/api/users', UserController.create)
  app.delete('/api/users/:id', UserController.delete)

  app.get('/api/tasks', TaskController.index)
  app.get('/api/tasks/:id', TaskController.show)
  app.post('/api/tasks', TaskController.create)
  app.patch('/api/tasks/:id', TaskController.update)
  app.delete('/api/tasks/:id', TaskController.delete)

  app.get('/api//users/:id/tasks', TaskController.filteredTasks)

}
