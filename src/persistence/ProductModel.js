const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  foto: String,
  price: Number,
  descripcion:String,
  categoria:String
})

const ProductModel = mongoose.model('products', productSchema)

module.exports = ProductModel