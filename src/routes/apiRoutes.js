const express = require('express')

const router = express.Router()
const productRoutes = require('./productoRoutes')
const carritoRoutes =require('./carritoRoutes')
const mensajeRoutes=require('./messageRoutes')
const authRoutes=require('./authRoutes')
const configRoutes=require('./configRoutes')
const ordenRoutes=require('./ordenRoutes')
const uploadRoutes=require('./upLoadRoutes')
router.use('/', productRoutes)
router.use('/', carritoRoutes)
router.use('/', authRoutes)
router.use('/', mensajeRoutes)
router.use('/', configRoutes)
router.use('/', ordenRoutes)
router.use("/", uploadRoutes);
module.exports=router