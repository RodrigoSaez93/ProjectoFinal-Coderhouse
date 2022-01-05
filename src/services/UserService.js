const UserModel = require('../persistence/UserModel')
/**
 * @type UserService
 */
let instance = null

class UserService {

  async insert(user) {
    return await UserModel.create(user)
  }

  async get(id) {
    return await UserModel.findOne({ _id: id })
  }

  async list() {
    return await UserModel.find()
  }

  async delete(id) {
    return await UserModel.deleteOne({ _id: id })
  }

  async update(user) {
    await UserModel.updateOne({_id: user._id}, user)
    return user
  }

  static getInstance() {
    if (instance == null) {
      instance = new UserService()
    }

    return instance
  }
}

module.exports = UserService
