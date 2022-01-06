const express = require('express')
const router = express.Router()
const jwtAuthenticationMiddleware=require('../middleware/jwtAuthenticationMiddleware')
const CarritoController = require('../controllers/CarritoController')

router.get('/carrito', jwtAuthenticationMiddleware,(req, res) =>
CarritoController.getInstance().getOneByEmail(req, res)
) 
router.post('/carrito/add',jwtAuthenticationMiddleware,(req,res)=> CarritoController.getInstance().addProduct(req,res))
router.post('/carrito/delete',jwtAuthenticationMiddleware,(req,res)=> CarritoController.getInstance().deleteProduct(req,res))
router.get('/carrito/:id', jwtAuthenticationMiddleware,(req, res) =>
CarritoController.getInstance().getOne(req, res)
)
router.post('/carrito',jwtAuthenticationMiddleware,(req,res)=>{CarritoController.getInstance().post(req,res)})
router.put('/carrito', jwtAuthenticationMiddleware,(req, res) => CarritoController.getInstance().put(req, res))
router.delete('/carrito/:id', jwtAuthenticationMiddleware,(req, res) =>CarritoController.getInstance().delete(req, res)
)

router.post('/carrito/submit',jwtAuthenticationMiddleware,(req,res)=>{CarritoController.getInstance().postSubmit(req,res)} )

module.exports = router