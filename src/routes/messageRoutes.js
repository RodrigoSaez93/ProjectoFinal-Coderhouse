const express = require('express')

const router = express.Router()
const MessageController = require('../controllers/MessageController')
const jwtAuthenticationMiddleware = require('../middleware/jwtAuthenticationMiddleware')
const validateBody = require('../middleware/validateBody')
const {messageSchema}=require('../validator/message')

router.post('/chat',validateBody(messageSchema), jwtAuthenticationMiddleware, (req, res) =>
  MessageController.getInstance().post(req, res)
)

router.get('/chat/:email', jwtAuthenticationMiddleware, (req, res) =>
  MessageController.getInstance().get(req, res)
)

module.exports = router