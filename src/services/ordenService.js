const ordenModel=require('../persistence/ordenModel')
/**
 * @type OrdenService
 */

 let instance = null

 class OrdenService {
    async get(id) {
        return await ordenModel.findOne({ _id: id })
      }

      async insert(orden) {
        const result = await ordenModel.create(orden)
        return result.toObject()
      }

      async list() {
        return await ordenModel.find({})
      }

      async update(orden) {
        await ordenModel.updateOne({_id: orden._id}, orden)
        return orden
      }
      static getInstance() {
        if (instance == null) {
          instance = new OrdenService()
        }
    
        return instance
      }

 }
 module.exports=OrdenService