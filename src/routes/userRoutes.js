const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.get('/user', (req, res) =>
  UserController.getInstance().getList(req, res)
)
router.get('/user/:id', (req, res) =>
  UserController.getInstance().getOne(req, res)
)
router.post('/user', (req, res) => UserController.getInstance().post(req, res))
router.put('/user', (req, res) => UserController.getInstance().put(req, res))
router.delete('/user', (req, res) =>
  UserController.getInstance().delete(req, res)
)

module.exports = router