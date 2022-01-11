const joi = require('joi')

const addOrDeleteSchema = joi.object({
    id:joi.string().required(),
    cantidad:joi.number().required()
})

module.exports = { addOrDeleteSchema }