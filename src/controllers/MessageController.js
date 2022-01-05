const MessageService = require('../services/MessageService')
const WebSocketService = require('../services/WebSocketService')

/**
 * @type MessageController
 */
let instance = null

class MessageController {
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  post(req, res) {
    WebSocketService.enviarDatos(req.body)
    res.json(req.body)
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async get(req, res) {
    const mensajes = await MessageService.getInstance().listByEmail(
      req.params.email
    )
    res.json(mensajes)
  }

  static getInstance() {
    if (instance == null) {
      instance = new MessageController()
    }

    return instance
  }
}

module.exports = MessageController
