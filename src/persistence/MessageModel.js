const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
  email: String,
  type: String,
  fechaYHora: String,
  body: String
})

const MessageModel = mongoose.model('mensajes', messageSchema)

module.exports = MessageModel