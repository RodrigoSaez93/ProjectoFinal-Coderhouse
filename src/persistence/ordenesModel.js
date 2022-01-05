const mongoose = require('mongoose')
const ProductoSchema = mongoose.Schema({
  producto: String,
  price: Number,
  descripcion:String,
  
})
const ItemSchema= new mongoose.Schema({
    cantidad:Number,
    producto:ProductoSchema
  })
const ordenesSchema = mongoose.Schema({
  
  thumbnail: String,    
  fechaYhora: String,
  items:[ItemSchema],
  direccion:String,

  
})

const ordenesModel = mongoose.model('ordenes', ordenesSchema)

module.exports = ordenesModel