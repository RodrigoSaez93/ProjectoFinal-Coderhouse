const CarritoService = require('../services/carritoService')
const ProductoService=require('../services/productService')
const OrdenService=require('../services/ordenService')
const EmailService=require('../services/emailService')
/**
 * @type CarritoController
 */
let instance = null

class CarritoController {
   /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async getOneByEmail(req, res) {
    let carrito = await CarritoService.getInstance().getByEmail(req.user.email)
    if(carrito==null){
      carrito= {email:req.user.email,
                         fechaYHora: new Date().toLocaleString(),
                         items: [
                         ],
                         direccion: ""
      }
      await CarritoService.getInstance().insert(carrito)
    }
    res.json(carrito)
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async addProduct(req, res) {
    const carrito = await CarritoService.getInstance().getByEmail(req.user.email)
    if(carrito == null) {
      res.status(400).json({message:'No existe el carrito'})
      return
    }
    const producto= await ProductoService.getInstance().get(req.body.id)
    if(producto == null) {
      res.status(400).json({message:'No existe el producto'})
      return
    }
    if(req.body.cantidad ==null || req.body.cantidad < 0 ){
      res.status(400).json({message:'Ingrese una cantidad valida'})
    }
    carrito.items.push({idProducto: producto._id, precio: producto.price, cantidad: req.body.cantidad})
    CarritoService.getInstance().update(carrito)
    res.json(carrito)
  }
/**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async deleteProduct(req, res) {
    let carrito = await CarritoService.getInstance().getByEmail(req.user.email)
    if(carrito == null) {
      res.status(400).json({message:'No existe el carrito'})
      return
    }
    carrito = carrito.toObject()
    const producto= carrito.items.find(prod => prod.idProducto == req.body.id)
    if(producto == null) {
      res.status(400).json({message:'No existe el producto'})
      return
    }
    if(req.body.cantidad ==null || req.body.cantidad < 0 ){
      res.status(400).json({message:'Ingrese una cantidad valida'})
      return
    }
    if(producto.cantidad <req.body.cantidad ){
      res.status(400).json({message:'Ingrese una cantidad valida'})
      return
    }
      producto.cantidad= producto.cantidad -req.body.cantidad
      if(producto.cantidad==0){
        carrito.items = carrito.items.filter(item => item.idProducto != req.body.id)
      }
      CarritoService.getInstance().update(carrito)
      res.json(carrito)
  }
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async getList(req, res) {
    const carrito = await CarritoService.getInstance().list()
    res.json(carrito)
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async getOne(req, res) {
    const carrito = await CarritoService.getInstance().get(req.params.id)
    if(carrito == null) {
      res.status(404).json({message: 'Carrito no encontrado'})
      return
    }
    res.json(carrito)
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async post(req, res) {
    const product = await CarritoService.getInstance().insert(req.body)
    res.json(product)
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async put(req, res) {
    const existentCarrito = await CarritoService.getInstance().get(req.body._id)
    if(existentCarrito == null) {
      res.status(404).json({message: 'Carrito no encontrado'})
      return
    }
    const carrito = CarritoService.getInstance().update(req.body)
    res.json(carrito)
  }


    /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async postSubmit(req,res){
    let carrito = await CarritoService.getInstance().getByEmail(req.user.email)
    if(carrito==null || carrito.items.lenght ==0){
      res.status(400).json({message:'Carrito esta vacio'})
      return
    }
      carrito=carrito.toObject()
      let orden = { ...carrito}
      orden.estado='Generado'
      orden.fechaYHora = new Date().toLocaleString()
      let total = 0
      delete orden._id
      orden.items.forEach(item => total+= (item.precio * item.cantidad))
      orden.total=total
      orden = await OrdenService.getInstance().insert(orden)

      carrito.items= []
      await CarritoService.getInstance().update(carrito)
      EmailService.getInstance().sendOrderEmail(req.user.email,orden)
      res.json(orden)
  }


  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async delete(req, res) {
    const existentCarrito = await CarritoService.getInstance().get(req.params.id)

    if(existentCarrito == null) {
      res.status(404).json({message: 'Not found'})
    }

    await CarritoService.getInstance().delete(req.params.id)

    res.json(existentCarrito)
  }

  static getInstance() {
    if(instance == null) {
      instance = new CarritoController()
    }

    return instance
  }
}

module.exports = CarritoController
