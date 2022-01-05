const express = require('express')

const router = express.Router()
const MessageController = require('../controllers/MessageController')
router.post('/chat', (req, res) =>
  MessageController.getInstance().post(req, res)
)

router.get('/chat/:email', (req, res) =>
  MessageController.getInstance().get(req, res)
)

module.exports = router