const mongoose = require('mongoose')

const ItemSchema= new mongoose.Schema({
  cantidad:Number,
  idProducto: String,
  precio: Number
  })
const ordenSchema = mongoose.Schema({
  
  email: String,    
  fechaYhora: String,
  items:[ItemSchema],
  estado:{type:String ,enum: ['Generado', 'Pagado', 'Enviando', 'Finalizado' ]},
  total:Number

  
})

const ordenModel = mongoose.model('orden', ordenSchema)

module.exports = ordenModel