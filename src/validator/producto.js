const joi = require('joi')
const productoSchema = joi.object({
    foto: joi.string().required(),
    price: joi.number().required(),
    descripcion: joi.string().required(),
    categoria: joi.string().required()
})

module.exports = {  productoSchema }