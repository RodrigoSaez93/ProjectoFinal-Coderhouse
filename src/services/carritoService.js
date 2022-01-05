const CarritoModel =require('../persistence/carritoModel')

/**
 * @type CarritoService
 */
 let instance = null

 class CarritoService {
    async insert(carrito) {
      const result = await CarritoModel.create(carrito)
      return result.toObject()
    }
  
    async get(id) {
      return await CarritoModel.findOne({ _id: id })
    }

    async getByEmail(email) {
        return await CarritoModel.findOne({email:email})
    }
  
    async list() {
      return await CarritoModel.find()
    }
  
    async delete(id) {
      return await CarritoModel.deleteOne({ _id: id })
    }
  
    async update(product) {
      await CarritoModel.updateOne({_id: product._id}, product)
      return product
    }
  
    static getInstance() {
      if (instance == null) {
        instance = new CarritoService()
      }
  
      return instance
    }
  }
 module.exports=CarritoService