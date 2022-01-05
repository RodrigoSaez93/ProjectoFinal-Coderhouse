const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
})

userSchema.pre(
  'save',
  async function(next) {
    const user = this
    const hash = await bcrypt.hash(user.password, 10)
    this.password = hash
    next()
  }
)

userSchema.methods.isValidPassword = async function(password) {
  const user = this 
  const compare = await bcrypt.compare(password, user.password)
  return compare
}

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel
