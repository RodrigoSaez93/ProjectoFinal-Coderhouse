const express = require('express')
const passport = require('passport')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

router.post(
  '/api/user/signup',
  passport.authenticate('signup', { session: false }),
  (req, res) => {
    AuthController.getInstance().signup(req, res)
  }
)

router.post('/api/user/login', (req, res, next) => {
  AuthController.getInstance().login(req, res, next)
})

router.post(
  '/login',
  passport.authenticate('login', {failureRedirect: 'login-error'}),
  (req, res) => {
    AuthController.getInstance().loginFrontend(req, res)
  }
)

module.exports = router
