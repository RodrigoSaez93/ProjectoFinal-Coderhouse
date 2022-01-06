const CarritoService = require('../services/carritoService')
const ProductoService=require('../services/productService')
const OrdenService=require('../services/ordenService')

/**
 * @type OrdenController
 */
 let instance = null

 class OrdenController {
   /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */

    async getList(req, res) {
        const orden = await OrdenService.getInstance().list()
        res.json(orden)
      }

      
   /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */

    async post(req, res) {
        const orden = await OrdenService.getInstance().get(req.body.id)
        if(orden==null){
          res.status(400).json({message:'No existe la orden'})
        }
        if(orden.estado !='Generado'){
          res.status(400).json({message:'El estado de la orden debe ser generada'})
        }
        orden.estado='Finalizado'
        OrdenService.getInstance().update(orden)
        res.json(orden)
      }


      /**
    *
    * @param {import('express').Request} req
    * @param {import('express').Response} res
    */
   async getOne(req, res) {
    const orden = await OrdenService.getInstance().get(req.params.id)
    if(orden == null) {
     res.status(404).json({message: 'ID no encontrado'})
     return
   }
    res.json(orden)
  }
  static getInstance() {
    if (instance == null) {
      instance = new OrdenController()
    }

    return instance
  }

  }
  module.exports=OrdenController