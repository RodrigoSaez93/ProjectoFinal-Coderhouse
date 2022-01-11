const joi = require('joi')

const ordenSchema = joi.object({
    id:joi.string().required()
})

module.exports = { ordenSchema }