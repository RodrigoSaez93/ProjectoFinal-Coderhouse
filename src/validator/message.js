const joi = require('joi')

const messageSchema = joi.object({
    email: joi.string().required(),
    type: joi.string().required(),
    fechaYHora: joi.string().required(),
    body: joi.string().required()
})

module.exports = {messageSchema}