const joi = require('joi')

const messageSchema = joi.object({
    email: joi.String().required(),
  type: joi.String().required(),
  fechaYHora: joi.String().required(),
  body: joi.String().required()
})

module.exports = messageSchema