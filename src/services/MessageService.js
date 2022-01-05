const MessageModel = require('../persistence/MessageModel')
/**
 * @type MessageService
 */
let instance = null

class MessageService {
  async insert(message) {
    const result = await MessageModel.create(message)
    return result.toObject()
  }

  async get(id) {
    return await MessageModel.findOne({_id: id})
  }

  async list() {
    return await MessageModel.find({})
  }

  async listByEmail(email) {
    return await MessageModel.find({email: email})
  }

  async delete(id) {
    return await MessageModel.deleteOne({_id: id})
  }

  async update(message) {
    return MessageModel.updateOne({_id: message._id}, message)
  }

  static getInstance() {
    if (instance == null) {
      instance = new MessageService()
    }

    return instance
  }
}

module.exports = MessageService