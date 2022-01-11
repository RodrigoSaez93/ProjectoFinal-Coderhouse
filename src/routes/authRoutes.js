const express = require('express')
const passport = require('passport')
const router = express.Router()
const AuthController = require('../controllers/AuthController')
const validateBody = require('../middleware/validateBody')
const { authLoginSchema, authSignupSchema } = require('../validator/auth')

router.post(
  '/user/signup',
  validateBody(authSignupSchema),
  passport.authenticate('signup', { session: false }),
  (req, res) => {
    AuthController.getInstance().signup(req, res)
  }
)

router.post('/user/login', 
  validateBody(authLoginSchema),
(req, res, next) => {
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
