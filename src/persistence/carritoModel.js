const mongoose = require('mongoose')

const ItemSchema= new mongoose.Schema({
    cantidad:Number,
    idProducto: String,
    precio: Number
  })
const CarritoSchema = mongoose.Schema({
  
  email: {type: String, unique: true, required: true},    
  fechaYhora: String,
  items:[ItemSchema],
  direccion:String,

  
})

const carritosModel = mongoose.model('carrito', CarritoSchema)

module.exports = carritosModel