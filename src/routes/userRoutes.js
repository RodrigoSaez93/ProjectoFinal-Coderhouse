const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const jwtAuthenticationMiddleware = require('../middleware/jwtAuthenticationMiddleware')

router.get('/user', jwtAuthenticationMiddleware, (req, res) =>
  UserController.getInstance().getList(req, res)
)
router.get('/user/:id',jwtAuthenticationMiddleware, (req, res) =>
  UserController.getInstance().getOne(req, res)
)
router.post('/user', jwtAuthenticationMiddleware, (req, res) => UserController.getInstance().post(req, res))
router.put('/user',jwtAuthenticationMiddleware, (req, res) => UserController.getInstance().put(req, res))
router.delete('/user',jwtAuthenticationMiddleware, (req, res) =>
  UserController.getInstance().delete(req, res)
)

module.exports = router