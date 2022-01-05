const UserService = require('../services/UserService')
/**
 * @type UserController
 */
let instance = null

class UserController {
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async getList(req, res) {
    const users = await UserService.getInstance().list()
    res.json(users)
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async getOne(req, res) {
    const user = await UserService.getInstance().get(req.params.id)
    res.json(user)
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async post(req, res) {
    const user = await UserService.getInstance().get(req.body)
    res.json(user)
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async put(req, res) {
    const existentUser = await UserService.getInstance().get(req.body._id)
    if (existentUser == null) {
      res.status(404).json({})
      return
    }
    const user = await UserService.getInstance().update(req.body)
    res.json(user)
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async delete(req, res) {
    const existentUser = await UserService.getInstance().get(req.params.id)
    if (existentUser == null) {
      res.status(404).json({})
      return
    }

    UserService.getInstance().delete(req.params.id)
    res.json(existentUser)
  }

  static getInstance() {
    if (instance == null) {
      instance = new UserController()
    }

    return instance
  }
}

module.exports = UserController
