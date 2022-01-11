const express = require('express')
const router = express.Router()
const OrdenController=require('../controllers/OrdenController')
const jwtAuthenticationMiddleware = require('../middleware/jwtAuthenticationMiddleware')

router.get('/orden/:id', jwtAuthenticationMiddleware, (req, res) =>OrdenController.getInstance().getOne(req, res))

router.get('/orden', jwtAuthenticationMiddleware, (req, res) => OrdenController.getInstance().getList(req, res))

router.post('/orden/complete', jwtAuthenticationMiddleware, (req, res) => OrdenController.getInstance().post(req, res))

module.exports=router