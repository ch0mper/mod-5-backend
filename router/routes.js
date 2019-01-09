const UserController = require('../controllers/userController');
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

  app.get('/api/users', UserController.readAll)
}
